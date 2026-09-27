import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();

  try {
    const client = await clientPromise;
    const db = client.db();
    const product = await db.collection('products').findOne({ id });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
