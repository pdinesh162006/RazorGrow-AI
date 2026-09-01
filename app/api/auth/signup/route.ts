import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['CUSTOMER', 'MERCHANT']).default('CUSTOMER'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = signupSchema.parse(body);

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        role,
      },
    });

    const token = await signToken({ userId: user.id, role: user.role }, '15m');
    const refreshToken = await signToken({ userId: user.id }, '7d');

    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
