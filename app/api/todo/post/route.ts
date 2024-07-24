import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dolist } from '@/lib/schema';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log('heere--------------------------s');
    try {
      const { title, description } = await req.json();

      const newTask = await db
        .insert(dolist)
        .values({ title, description })
        .returning();
      console.log(title, newTask);
      return NextResponse.json({
        status: 'Success',
        data: newTask
      });
    } catch (error) {
      return NextResponse.json({
        status: 'Error',
        message: error
      });
    }
  } else {
  }
}
