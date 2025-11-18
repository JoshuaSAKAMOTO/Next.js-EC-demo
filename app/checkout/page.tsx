'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { getStripe } from '@/lib/stripe-client';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart.items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'チェックアウトに失敗しました');
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripeの初期化に失敗しました');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('チェックアウトに失敗しました。もう一度お試しください。');
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">カートは空です</p>
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            商品を見る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">お支払い</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">注文内容</h2>
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium text-gray-900">
                ¥{(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>合計</span>
            <span>¥{cart.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">お支払い方法について</h3>
        <p className="text-blue-800 text-sm">
          このデモサイトでは、Stripeのテストモードを使用しています。
          実際の決済は行われません。テストカード番号（4242 4242 4242 4242）をご使用ください。
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
          disabled={loading}
        >
          戻る
        </button>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '処理中...' : 'Stripeで支払う'}
        </button>
      </div>
    </div>
  );
}
