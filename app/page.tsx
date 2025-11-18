import Link from 'next/link';
import { getProducts } from '@/lib/microcms';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export default async function Home() {
  const data = await getProducts({ limit: 6 });

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">EC Demo</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Next.js、TailwindCSS、MicroCMS、NextAuth.js、Stripeを使用したECサイトのデモです
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              商品を見る
            </Link>
            <Link
              href="/cart"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              カートを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">技術スタック</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Next.js 16</h3>
            <p className="text-gray-600">
              App Routerを使用した最新のNext.jsアプリケーション
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">MicroCMS</h3>
            <p className="text-gray-600">
              ヘッドレスCMSで商品データを管理
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Stripe</h3>
            <p className="text-gray-600">
              安全で簡単な決済システムの統合
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">NextAuth.js</h3>
            <p className="text-gray-600">
              認証機能の実装（Google、GitHub、メール）
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">TailwindCSS</h3>
            <p className="text-gray-600">
              モダンなUIデザインとレスポンシブ対応
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">TypeScript</h3>
            <p className="text-gray-600">
              型安全な開発環境
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {data.contents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">注目の商品</h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              すべての商品を見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.contents.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            このデモサイトはNext.jsを学習するための完全なECサイトの実装例です
          </p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium inline-block"
          >
            商品一覧を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
