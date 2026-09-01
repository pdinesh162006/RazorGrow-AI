import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Note: Role check is handled by middleware
    const body = await req.json();
    const data = categorySchema.parse(body);

    const category = await db.category.create({ data });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
