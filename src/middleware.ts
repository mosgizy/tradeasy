import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')
  // const access = request.cookies.get('access')
  const path = request.nextUrl.pathname;

  const isValidPath = (path !== '/' && path !== "/login" && path !== '/register')
  const onOpenRoute = path === '/login' || path === '/register'

  // console.log(cookie !==undefined,isValidPath,path)

  if (cookie === undefined && isValidPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (cookie !== undefined && onOpenRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // const restrictedPaths = ['/settings','/admin','notification']

  // if (access && access.value !== '1' && restrictedPaths.includes(path)) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

   return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)',
  ]
}