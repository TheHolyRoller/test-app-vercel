

export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Client, Databases, Query } from 'node-appwrite'; // <-- server SDK




const redis = Redis.fromEnv();
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(60, '60 s'),
});

function getIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
}

async function rateLimit(req: Request, routeKey: string) {
  const ip = getIp(req);
  const { success } = await limiter.limit(`${routeKey}:${ip}`);
  return success;
}

function getDb() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_API_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); // <-- now valid
  return new Databases(client);
}

export async function GET(req: Request) {
  if (!(await rateLimit(req, 'questions'))) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  try {
    const db = getDb();
    const docs = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_QUESTION_COLLECTION_ID!,
      [Query.limit(1000), Query.orderAsc('sequence_number')]
    );

    const data = docs.documents.map((d: any) => ({
      id: d.id ?? d.$id,
      question_text: d.question_text,
      Type: d.Type,
      Section: d.Section,
      gif_url: d.gif_url,
      yes_weight: d.yes_weight,
      sometimes_weight: d.sometimes_weight,
      no_weight: d.no_weight,
      sequence_number: d.sequence_number,
    }));

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
    });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}