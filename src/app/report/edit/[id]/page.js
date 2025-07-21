'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditReportPage({ params }) {
  const resolvedParams = use(params);  // Promiseをunwrap
  const id = resolvedParams.id;
  const router = useRouter();

  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 初期データ取得
  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('取得失敗:', error.message);
      } else {
        setDate(data.date);
        setTask(data.task);
        setHours(data.hours);
      }
      setLoading(false);
    };

    fetchReport();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('reports')
      .update({ date, task, hours: parseFloat(hours) })
      .eq('id', id);

    if (error) {
      console.error('更新失敗:', error.message);
      setMessage('更新に失敗しました');
    } else {
      setMessage('更新しました！');
      // 少し待ってから一覧へ戻る
      setTimeout(() => {
        router.push('/report/list');
      }, 1000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          作業報告の編集
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">日付</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">作業内容</label>
            <textarea
              rows="3"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">作業時間（h）</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            更新する
          </button>

          {message && (
            <p className="text-center text-green-600 mt-4">{message}</p>
          )}
        </form>
      </div>
    </main>
  );
}
