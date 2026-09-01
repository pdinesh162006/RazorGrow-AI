import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyToken(token) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let cart = await db.cart.findUnique({
      where: { userId: decoded.userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId: decoded.userId },
        include: { items: { include: { product: true } } },
      });
    }

    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = await verifyToken(token as string) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await db.cartItem.deleteMany({
      where: { cart: { userId: decoded.userId } }
    });

    return NextResponse.json({ success: true, message: 'Cart cleared' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
