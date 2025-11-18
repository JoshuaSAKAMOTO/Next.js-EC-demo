'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/lib/cart-context';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('商品が見つかりません');
        }
        const data = await response.json();
        console.log('Fetched product data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('商品の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.name}をカートに追加しました`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">商品が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 md:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          {product.image?.url ? (
            <Image
              src={product.image.url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              画像なし
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="text-4xl font-bold text-gray-900 mb-6">
            ¥{typeof product.price === 'number' ? product.price.toLocaleString() : product.price || '価格未設定'}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <span className="text-sm text-gray-500">カテゴリ: </span>
            <span className="text-sm font-medium text-gray-900">{product.category}</span>
          </div>

          {typeof product.stock === 'number' && product.stock > 0 ? (
            <>
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  数量
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <span className="ml-4 text-sm text-gray-500">在庫: {product.stock}</span>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  カートに追加
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium shadow-sm"
                >
                  今すぐ購入
                </button>
              </div>
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-600 font-medium">この商品は現在在庫切れです</p>
            </div>
          )}

          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 商品一覧に戻る
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
