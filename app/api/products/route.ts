import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  let products;

  try {
      const client = await clientPromise;
      const db = client.db();
      products = await db.collection('products').find({}).toArray();
      return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
