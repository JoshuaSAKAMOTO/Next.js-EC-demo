import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: Array<{ productId: string; quantity: number }> } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'アイテムが指定されていません' }, { status: 400 });
    }

    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
    const apiKey = process.env.MICROCMS_API_KEY;

    if (!serviceDomain || !apiKey) {
      return NextResponse.json({ error: 'MicroCMS設定が見つかりません' }, { status: 500 });
    }

    // 各商品の在庫を更新
    const updatePromises = items.map(async (item) => {
      // まず現在の商品情報を取得
      const getResponse = await fetch(
        `https://${serviceDomain}.microcms.io/api/v1/products/${item.productId}`,
        {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error(`商品ID ${item.productId} の取得に失敗しました`);
      }

      const product = await getResponse.json();
      const newStock = product.stock - item.quantity;

      if (newStock < 0) {
        throw new Error(`商品 ${product.name} の在庫が不足しています`);
      }

      // 在庫を更新
      const updateResponse = await fetch(
        `https://${serviceDomain}.microcms.io/api/v1/products/${item.productId}`,
        {
          method: 'PATCH',
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: newStock,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`商品ID ${item.productId} の在庫更新に失敗しました`);
      }

      return { productId: item.productId, oldStock: product.stock, newStock };
    });

    const results = await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: '在庫を更新しました',
      results
    });
  } catch (error) {
    console.error('Inventory update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '在庫の更新に失敗しました' },
      { status: 500 }
    );
  }
}
