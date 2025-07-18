"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import BackToDashboardButton from '@/components/BackToDashboardButton';

export default function ReportListPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('データ取得失敗:', error.message);
      setReports([]);
    } else {
      setReports(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('本当に削除しますか？')) return;

    const { error } = await supabase.from('reports').delete().eq('id', id);

    if (error) {
      console.error('削除失敗:', error.message);
    } else {
      fetchReports();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('ログアウトしました');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          作業報告一覧（削除機能付き）
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">読み込み中...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500">作業報告がまだありません</p>
        ) : (
          <ul className="space-y-4">
            {reports.map((report) => (
              <li key={report.id} className="border p-4 rounded-lg bg-gray-50 relative">
                <p><strong>日付：</strong>{report.date}</p>
                <p><strong>作業内容：</strong>{report.task}</p>
                <p><strong>作業時間：</strong>{report.hours} 時間</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    削除
                  </button>
                  <Link
                    href={`/report/edit/${report.id}`}
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded inline-block text-center"
                  >
                    編集
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ✅ 作業報告を入力ボタンを追加 */}
        <div className="mt-6 flex justify-center">
          <Link
            href={user ? "/report/new" : "#"}
            className={`px-4 py-2 rounded text-center block ${
              user
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                alert("ログイン後にご利用いただけます");
              }
            }}
          >
            作業報告を入力
          </Link>
        </div>

        {/* ログアウトボタン */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            ログアウト
          </button>
        </div>
        <BackToDashboardButton />
      </div>
    </main>
  );
}