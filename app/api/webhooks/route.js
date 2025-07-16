
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
      const payload = await request.json();
      console.log(payload);
      
    //   return Response.json({ message: 'Webhook received' }, { status: 200 });
    return NextResponse.json({ received: true });
    } catch (error) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }
  }
  

  export async function GET() {
    return NextResponse.json({ message: "Webhook GET route is working!" });
  }