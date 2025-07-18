'use client';

import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import BackToDashboardButton from '@/components/BackToDashboardButton';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import notoSansJP from '@/lib/fonts/noto-sans-jp-normal';

export default function ReportGraphPage() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReports = async () => {
    if (!user) {
      console.error('ログインユーザーが取得できません');
      return;
    }

    let query = supabase
      .from('reports')
      .select('date, hours, task, created_at, user_id')
      .eq('user_id', user.id) // ログインユーザーのみ絞り込み
      .order('date', { ascending: true });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('データ取得失敗:', error.message);
    } else {
      // 日付ごとに集計
      const grouped = data.reduce((acc, cur) => {
        const existing = acc.find((item) => item.date === cur.date);
        if (existing) {
          existing.hours += cur.hours;
          existing.task += `, ${cur.task}`; // 同日の task をカンマ区切りで追加
        } else {
          acc.push({
            date: cur.date,
            hours: cur.hours,
            task: cur.task,
            created_at: cur.created_at,
            user_id: cur.user_id,
          });
        }
        return acc;
      }, []);
      setData(grouped);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  // CSVエクスポート関数
  const exportCSV = () => {
    if (data.length === 0) {
      alert('エクスポートするデータがありません');
      return;
    }

    const csv = '\ufeff' + Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'work_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDFエクスポート関数
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // 日本語フォント登録
    doc.addFileToVFS('NotoSansJP-Regular.ttf', notoSansJP);
    doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
    doc.setFont('NotoSansJP');

    doc.text('作業時間レポート', 14, 16);

    // 表示用データ作成
    const tableData = data.map(item => [
      item.date,
      item.hours,
      item.task || '',
      item.created_at ? new Date(item.created_at).toLocaleString() : '',
      item.user_id || ''
    ]);

    // 英字ヘッダ
    autoTable(doc, {
      head: [['Date', 'Hours', 'Task', 'Created At', 'User ID']], // 文字化けする為英字
      body: tableData,
      startY: 20, // ヘッダの下から開始
      theme: 'grid',
      styles: {
        font: 'NotoSansJP',
        fontSize: 10,
        lineWidth: 0.1, // デフォルトは0.1
        lineColor: [0, 0, 0],    // ← 黒に固定
      },
      headStyles: {
        font: 'helvetica',   // ★ ヘッダは埋め込み不要の英字フォント
        fontStyle: 'bold',
        fontSize: 11,
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        lineWidth: 0.1,          // ← 太めに
        lineColor: [0, 0, 0],    // ← 黒に固定        
      },      
    });

    doc.save('report_data.pdf');
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          作業時間グラフ
        </h2>

        {/* フィルタ部分 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
          />
          <span className="self-center">〜</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={fetchReports}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            適用
          </button>
        </div>

        {data.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">データがありません</p>
        ) : (
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <button
          onClick={exportCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          CSVエクスポート
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          PDFエクスポート
        </button>
        <BackToDashboardButton />
      </div>
    </main>
  );
}
