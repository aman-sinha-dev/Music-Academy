import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BACKEND_URL}/purchase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(
            { error: data.message || 'Failed to fetch purchases' },
            { status: response.status }
        );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Admin Purchases API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
