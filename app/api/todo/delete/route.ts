import * as schema from '@/lib/schema';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { NextResponse } from 'next/server';

const db = drizzle(sql, { schema });

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedTask = await db
      .delete(schema.dolist)
      .where(eq(schema.dolist.id, Number(id)))
      .returning();
    return NextResponse.json({
      status: 'Success',
      data: deletedTask
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      message: error
    });
  }
}
