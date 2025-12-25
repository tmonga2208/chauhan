import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop(); 

  try {
    // Try to get product from Redis
    const cacheKey = `product:${id}`;
    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      return NextResponse.json(cachedProduct);
    }

    // Fallback to MongoDB if not in cache
    const client = await clientPromise;
    const db = client.db();
    const product = await db.collection('products').findOne({ id });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Cache the product for 1 day (86400 seconds)
    await redis.set(cacheKey, product, { ex: 86400 });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
