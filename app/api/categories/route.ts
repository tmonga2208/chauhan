import { NextResponse } from 'next/server';
import { items } from '@/data/data';

export async function GET() {
  return NextResponse.json(items);
} 