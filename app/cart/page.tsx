'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ショッピングカート</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-6 border-b last:border-b-0"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.product.image.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    ¥{item.product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`quantity-${item.product.id}`} className="text-sm text-gray-600">
                      数量:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${item.product.id}`}
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-lg font-bold text-gray-900">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">注文概要</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>小計</span>
                <span>¥{cart.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>送料</span>
                <span>無料</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>合計</span>
                <span>¥{cart.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium mb-4"
            >
              購入手続きへ
            </button>

            <button
              onClick={() => router.push('/products')}
              className="w-full text-blue-600 hover:text-blue-700 font-medium"
            >
              買い物を続ける
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
