# EC Demo - Next.js ECサイトデモ

Next.js、TailwindCSS、MicroCMS、NextAuth.js、Stripeを使用したECサイトのデモプロジェクトです。学習目的で作成されています。

## 技術スタック

- **Next.js 16** - App Routerを使用
- **TypeScript** - 型安全な開発
- **TailwindCSS** - モダンなUIデザイン
- **MicroCMS** - ヘッドレスCMSで商品管理
- **NextAuth.js** - 認証機能（Google、GitHub、Credentials）
- **Stripe** - 決済システム統合
- **Vercel** - デプロイプラットフォーム

## 機能

- 商品一覧・詳細ページ
- ショッピングカート機能
- Stripe決済統合
- NextAuth.jsによる認証
- MicroCMSからの商品データ取得
- レスポンシブデザイン

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env.local`を作成し、必要な環境変数を設定してください。

```bash
cp .env.example .env.local
```

#### MicroCMSの設定

1. [MicroCMS](https://microcms.io/)でアカウントを作成
2. 新しいサービスを作成
3. APIスキーマ「products」を作成し、以下のフィールドを追加：
   - `name` (テキストフィールド) - 商品名
   - `description` (テキストエリア) - 商品説明
   - `price` (数値) - 価格
   - `image` (画像) - 商品画像
   - `category` (テキストフィールド) - カテゴリ
   - `stock` (数値) - 在庫数
4. サービスドメインとAPIキーを`.env.local`に設定

#### NextAuth.jsの設定

```bash
# NextAuth secretの生成
npx auth secret
```

生成された値を`.env.local`の`NEXTAUTH_SECRET`に設定してください。

#### Stripeの設定

1. [Stripe](https://stripe.com/)でアカウントを作成
2. テストモードでAPIキーを取得
3. `.env.local`に設定

#### OAuth設定（オプション）

Google OAuthやGitHub OAuthを使用する場合は、それぞれのプロバイダーでOAuthアプリを作成し、クライアントIDとシークレットを設定してください。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構成

```
ec-demo/
├── app/
│   ├── api/              # API Routes
│   │   ├── auth/         # NextAuth.js
│   │   ├── checkout/     # Stripe Checkout
│   │   ├── products/     # 商品API
│   │   └── webhooks/     # Stripe Webhooks
│   ├── cart/             # カートページ
│   ├── checkout/         # チェックアウトページ
│   ├── products/         # 商品ページ
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # ホームページ
├── components/           # Reactコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── Providers.tsx
├── lib/                  # ユーティリティ
│   ├── auth.ts           # NextAuth設定
│   ├── cart-context.tsx  # カート状態管理
│   ├── microcms.ts       # MicroCMSクライアント
│   ├── stripe.ts         # Stripeサーバー設定
│   └── stripe-client.ts  # Stripeクライアント設定
└── types/                # 型定義
    ├── product.ts
    ├── cart.ts
    └── next-auth.d.ts
```

## テスト決済

このデモではStripeのテストモードを使用しています。以下のテストカード情報を使用してください：

- カード番号: `4242 4242 4242 4242`
- 有効期限: 任意の将来の日付
- CVC: 任意の3桁の数字

## デプロイ

### Vercelへのデプロイ

1. GitHubにプロジェクトをプッシュ
2. [Vercel](https://vercel.com)でインポート
3. 環境変数を設定
4. デプロイ

### 環境変数の設定

Vercelのプロジェクト設定で、`.env.local`の内容を環境変数として設定してください。

## 注意事項

- このプロジェクトは学習目的のデモです
- 本番環境で使用する場合は、セキュリティ対策を追加してください
- Credentialsプロバイダーはデモ用です。本番環境では適切な認証システムを実装してください

## ライセンス

MIT

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MicroCMS Documentation](https://document.microcms.io/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Stripe Documentation](https://stripe.com/docs)
