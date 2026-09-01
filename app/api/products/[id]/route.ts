import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const updateProductSchema = z.object({
  categoryId: z.string().uuid().optional(),
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  images: z.array(z.string().url()).optional(),
  variants: z.any().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
      include: { category: true, reviews: true },
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = updateProductSchema.parse(body);

    const product = await db.product.update({
      where: { id: params.id },
      data,
    });
    
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
