import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const paymentData = event.payload.payment.entity;
      
      // Update Payment and Order status in DB
      await db.payment.update({
        where: { razorpayOrderId: paymentData.order_id },
        data: {
          status: 'SUCCESS',
          razorpayPaymentId: paymentData.id,
          order: {
            update: {
              status: 'CONFIRMED'
            }
          }
        }
      });
    } else if (event.event === 'payment.failed') {
      const paymentData = event.payload.payment.entity;
      
      await db.payment.update({
        where: { razorpayOrderId: paymentData.order_id },
        data: {
          status: 'FAILED',
        }
      });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
