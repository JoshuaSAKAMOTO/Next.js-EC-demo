import { getProducts } from '@/lib/microcms';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60; // 60秒ごとに再検証

export default async function ProductsPage() {
  const data = await getProducts({ limit: 100 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">商品一覧</h1>

      {data.contents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">商品がまだありません。</p>
          <p className="text-gray-500 mt-2">
            MicroCMSで商品を追加してください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.contents.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
