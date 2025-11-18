'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

// このページは動的レンダリングが必要
export const dynamic = 'force-dynamic';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    const completeOrder = async () => {
      if (sessionId && !hasCleared.current) {
        try {
          console.log('Completing order and clearing cart');

          // 注文完了処理（在庫更新）
          const response = await fetch('/api/complete-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          });

          if (!response.ok) {
            const error = await response.json();
            console.error('Order completion failed:', error);
          } else {
            const result = await response.json();
            console.log('Order completed successfully:', result);
          }

          // カートをクリア
          clearCart();
          hasCleared.current = true;
          localStorage.removeItem('cart');
        } catch (error) {
          console.error('Error completing order:', error);
          // エラーが発生してもカートはクリアする
          clearCart();
          hasCleared.current = true;
          localStorage.removeItem('cart');
        }
      }
    };

    completeOrder();
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ご注文ありがとうございました
        </h1>

        <p className="text-gray-600 mb-8">
          ご注文が正常に完了しました。
          {sessionId && (
            <>
              <br />
              <span className="text-sm text-gray-500">
                注文ID: {sessionId.slice(0, 20)}...
              </span>
            </>
          )}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-sm">
            これはデモサイトのため、実際の商品は配送されません。
            テスト決済のみが行われました。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            商品一覧に戻る
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
