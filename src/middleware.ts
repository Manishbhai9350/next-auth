import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname 
   const token = request.cookies.get('token')?.value || ''
   console.log(path , token.length) 
   const isPublic = path == '/login' || path == '/signup' || path == '/' || path == '/verifyemail' 

   if (isPublic && token.length > 0) {
    
       return NextResponse.redirect(new URL('/profile', request.url))
   } 

   if (!token && !isPublic) {
    
       return NextResponse.redirect(new URL('/login', request.url))
    
   }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
  ],
}