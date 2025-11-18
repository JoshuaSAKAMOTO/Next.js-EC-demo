import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/types/cart';

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'カートが空です' }, { status: 400 });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: [item.product.image.url],
        },
        unit_amount: Math.round(item.product.price),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      metadata: {
        items: JSON.stringify(items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        }))),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'チェックアウトセッションの作成に失敗しました' },
      { status: 500 }
    );
  }
}
