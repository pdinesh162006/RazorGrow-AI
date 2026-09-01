import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const productSchema = z.object({
  merchantId: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  images: z.array(z.string().url()).optional(),
  variants: z.any().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      db.product.count({ where })
    ]);

    return NextResponse.json({
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Note: Role check is handled by middleware
    const body = await req.json();
    const data = productSchema.parse(body);

    const product = await db.product.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
