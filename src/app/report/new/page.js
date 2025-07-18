'use client';

import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import BackToDashboardButton from '@/components/BackToDashboardButton';

export default function WorkReportForm() {
  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [message, setMessage] = useState('');
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !task || !hours) {
      alert('すべての項目を入力してください');
      return;
    }

    const newReport = {
      date,
      task,
      hours: parseFloat(hours),
    };

    const { data, error } = await supabase.from('reports').insert([
     {
      date,
      task,
      hours: Number(hours),
      user_id: user?.id, // ✅ 追加
     },
    ]);

    if (error) {
      console.error('保存失敗:', error.message);
      setMessage('保存に失敗しました');
    } else {
      console.log('保存成功:', data);
      setMessage('作業報告を保存しました！');
      setDate('');
      setTask('');
      setHours('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            作業報告入力（Supabase保存）
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">日付</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">作業内容</label>
              <textarea
                rows="3"
                placeholder="例）バグ修正、レビュー対応"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-gray-700">作業時間（h）</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              登録
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              {message}
            </p>
          )}
          <BackToDashboardButton />
        </div>
      </div>
    </main>
  );
}
