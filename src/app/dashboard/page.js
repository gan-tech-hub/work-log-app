"use client";

import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  // 未ログイン時はトップへリダイレクト
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('ログアウトしました');
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">メインメニュー</h1>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/report/new')}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            作業報告を入力
          </button>
          <button
            onClick={() => router.push('/report/list')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            作業報告一覧
          </button>
          <button
            onClick={() => router.push('/report/graph')}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
          >
            作業時間グラフ
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            ログアウト
          </button>
        </div>
      </div>
    </main>
  );
}
