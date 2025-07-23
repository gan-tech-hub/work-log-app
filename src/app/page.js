"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-2 text-blue-600">勤怠管理アプリ</h1>
         <p className="text-gray-700 mt-2 mb-4">ログインしてください。</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          ログイン
        </button>
      </div>
    </main>
  );
}
