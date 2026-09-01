import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';
import Razorpay from 'razorpay';
import { env } from '@/lib/env';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

const createOrderSchema = z.object({
  addressId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = await verifyToken(token as string) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { addressId } = createOrderSchema.parse(body);

    const cart = await db.cart.findUnique({
      where: { userId: decoded.userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let subtotal = 0;
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${item.product.name}` }, { status: 400 });
      }
      subtotal += parseFloat(item.product.price.toString()) * item.quantity;
    }

    const tax = subtotal * 0.18;
    const shipping = 50;
    const totalAmount = subtotal + tax + shipping;

    // Create Razorpay Order
    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    });

    const order = await db.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: decoded.userId,
          addressId,
          subtotal,
          tax,
          shipping,
          totalAmount,
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
              variant: item.variant ?? undefined,
            }))
          },
          payment: {
            create: {
              amount: totalAmount,
              currency: 'INR',
              razorpayOrderId: rzpOrder.id
            }
          }
        },
        include: { items: true, payment: true }
      });

      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = await verifyToken(token as string) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const orders = await db.order.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } }
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
