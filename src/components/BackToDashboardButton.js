'use client';

import { useRouter } from 'next/navigation';

export default function BackToDashboardButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <button
      onClick={handleBack}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-6"
    >
      トップに戻る
    </button>
  );
}
