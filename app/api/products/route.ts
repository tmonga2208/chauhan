import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  let products;

  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const client = await clientPromise;
    const db = client.db();

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;
      products = await db.collection('products')
        .find({})
        .skip(skip)
        .limit(limitNum)
        .toArray();
    } else {
      // Fallback to fetch all if no pagination params (maintain backward compatibility)
      products = await db.collection('products').find({}).toArray();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
