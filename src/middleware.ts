import { NextRequest, NextResponse } from 'next/server';

// In-memory store — fonctionne par instance Vercel serverless
// Suffisant pour un portfolio : pas de state partagé nécessaire
const store = new Map<string, { count: number; resetAt: number }>();

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/contact':      { max: 5,  windowMs: 60_000 },   // 5 req/min
  '/api/ss-ctrl-7x9k': { max: 30, windowMs: 60_000 },   // 30 req/min
};

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const limit = LIMITS[pathname];
  if (!limit) return NextResponse.next();

  const ip = getIp(req);
  const key = `${pathname}:${ip}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + limit.windowMs });
    return NextResponse.next();
  }

  if (entry.count >= limit.max) {
    console.warn(`[RATE_LIMIT] ${ip} blocked on ${pathname}`);
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
          'X-RateLimit-Limit': String(limit.max),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/contact', '/api/ss-ctrl-7x9k'],
};
