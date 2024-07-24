import * as schema from '@/lib/schema';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { NextResponse } from 'next/server';

const db = drizzle(sql, { schema });

const { dolist } = schema;

export async function GET() {
  try {
    const todos = await db.select().from(dolist);
    return NextResponse.json({
      status: 'Success',
      data: todos
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      message: error
    });
  }
}
