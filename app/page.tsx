'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Arab-Brazil Business Hub</h1>
        <p className="mt-4 text-gray-600">Redirecting to the appropriate page...</p>
      </div>
    </div>
  );
}