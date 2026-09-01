import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  variant: z.any().optional(),
});

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = await verifyToken(token as string) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { productId, quantity, variant } = cartItemSchema.parse(body);

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    let cart = await db.cart.findUnique({ where: { userId: decoded.userId } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId: decoded.userId } });
    }

    const existingItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, productId, variant: variant ? { equals: variant } : undefined }
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return NextResponse.json({ error: 'Insufficient stock for combined quantity' }, { status: 400 });
      }
      const updatedItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
      return NextResponse.json(updatedItem);
    }

    const newItem = await db.cartItem.create({
      data: { cartId: cart.id, productId, quantity, variant }
    });

    return NextResponse.json(newItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = await verifyToken(token as string) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { itemId, quantity } = z.object({ itemId: z.string().uuid(), quantity: z.number().int().nonnegative() }).parse(body);

    const item = await db.cartItem.findUnique({ where: { id: itemId }, include: { product: true, cart: true } });
    if (!item || item.cart.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (quantity === 0) {
      await db.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ success: true, message: 'Item removed' });
    }

    if (item.product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    const updatedItem = await db.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
