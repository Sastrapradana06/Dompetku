
import { NextResponse, NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if(config.matcher.includes(pathname)) {
    const token = req.cookies.get('uid')
    console.log(token?.value);
    if(!token?.value) {
      return NextResponse.redirect(new URL('/register', req.url))
    } else {
      return NextResponse.next()
    }
  }
}

export const config = {
  matcher: ['/home', '/about']
}