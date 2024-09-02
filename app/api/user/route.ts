import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    nickname: 'John Doe',
    score: 100
  });
}