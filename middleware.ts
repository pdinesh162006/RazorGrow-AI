import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths requiring merchant role
  if (pathname.startsWith('/api/merchant') || pathname.startsWith('/dashboard')) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || (decoded as any).role !== 'MERCHANT' && (decoded as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Paths requiring user role (any)
  if (pathname.startsWith('/api/user') || pathname.startsWith('/account')) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Rate Limit simulation (Add actual Redis-based rate limiting here in production)
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', '99');
  return response;
}

export const config = {
  matcher: ['/api/merchant/:path*', '/dashboard/:path*', '/api/user/:path*', '/account/:path*'],
};
