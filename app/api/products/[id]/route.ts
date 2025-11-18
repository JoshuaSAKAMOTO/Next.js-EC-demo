import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/microcms';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: '商品が見つかりません' },
      { status: 404 }
    );
  }
}
