export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">EC Demo</h3>
            <p className="text-gray-600 text-sm">
              Next.js、TailwindCSS、MicroCMS、NextAuth.js、Stripeを使用したECサイトのデモです。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">リンク</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/products" className="hover:text-gray-900">
                  商品一覧
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-gray-900">
                  カート
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">技術スタック</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Next.js</li>
              <li>TailwindCSS</li>
              <li>MicroCMS</li>
              <li>NextAuth.js</li>
              <li>Stripe</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; 2025 EC Demo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
