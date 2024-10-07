import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json(); 
    const response = await fetch('http://192.168.88.39:7000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), 
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error en la solicitud' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
