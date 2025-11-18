import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { sessionId }: { sessionId: string } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'セッションIDが必要です' }, { status: 400 });
    }

    // Stripeセッション情報を取得
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: '決済が完了していません' }, { status: 400 });
    }

    // metadataから商品情報を取得
    const items = JSON.parse(session.metadata?.items || '[]');

    if (items.length === 0) {
      return NextResponse.json({ error: '商品情報が見つかりません' }, { status: 400 });
    }

    // 在庫更新APIを呼び出す
    const inventoryResponse = await fetch(`${req.nextUrl.origin}/api/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!inventoryResponse.ok) {
      const error = await inventoryResponse.json();
      throw new Error(error.error || '在庫の更新に失敗しました');
    }

    const inventoryResult = await inventoryResponse.json();

    return NextResponse.json({
      success: true,
      message: '注文が完了しました',
      sessionId,
      items,
      inventoryResult,
    });
  } catch (error) {
    console.error('Complete order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '注文の完了処理に失敗しました' },
      { status: 500 }
    );
  }
}
