
import { NextResponse, NextRequest } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./lib/firebase/service";



export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')

  const protectedPages = ['/home', '/about', '/riwayat-keluar', '/riwayat-masuk', '/mutasi', '/setting']


  if (config.matcher.includes(pathname)) {
    if (!token?.value) {
      return NextResponse.redirect(new URL('/register', req.url))
    } else {
      return NextResponse.next()
    }
  }

}

export const config = {
  matcher: ['/home', '/about', '/riwayat-keluar', '/riwayat-masuk', '/mutasi', '/setting'],
}