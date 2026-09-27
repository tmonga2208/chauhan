import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const searchQuery = searchParams.get('q');

        if (!searchQuery) {
            return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('chauhan');

        const products = await db
            .collection('products')
            .find({
                $text: {
                    $search: searchQuery,
                },
            })
            .toArray();

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
    }
}
