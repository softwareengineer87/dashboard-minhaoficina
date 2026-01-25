import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: '/sign-in', whenAthenticated: 'redirect' },
  { path: '/webdesign/signup', whenAthenticated: 'next' },
] as const;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('minhaoficina-token');

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    return NextResponse.redirect(new URL('sign-in', request.url));
  }

  if (authToken && publicRoute && publicRoute.whenAthenticated === 'redirect') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  if (authToken && publicRoute?.whenAthenticated === 'next') {
    return NextResponse.next();
  }

}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}


