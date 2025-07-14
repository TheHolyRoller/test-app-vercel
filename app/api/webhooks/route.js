export async function POST(request) {
    try {
      const payload = await request.json();
      console.log(payload);
      
      return Response.json({ message: 'Webhook received' }, { status: 200 });
    } catch (error) {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }
  }