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
    </div>
  );
}
