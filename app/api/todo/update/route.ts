import * as schema from '@/lib/schema';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { NextResponse } from 'next/server';

const db = drizzle(sql, { schema });

const { dolist } = schema;

export async function PUT(req: Request) {
  try {
    const { id, title, description } = await req.json();
    const updatedTask = await db
      .update(dolist)
      .set({ title, description })
      .where(eq(dolist.id, Number(id)))
      .returning();
    return NextResponse.json({
      status: 'Success',
      data: updatedTask
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      message: error
    });
  }
}
