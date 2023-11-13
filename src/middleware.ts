
import { NextResponse, NextRequest } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./lib/firebase/service";



export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')

  const protectedPages = ['/home', '/about', '/riwayat-keluar', '/riwayat-masuk', '/mutasi', '/setting']
  const notProtectedPages = ['/', '/login', '/register']


  if (protectedPages.includes(pathname)) {
    if (!token?.value) {
      return NextResponse.redirect(new URL('/register', req.url))
    } else {
      return NextResponse.next()
    }
  }

  // if(notProtectedPages.includes(pathname)) {
  //   console.log('masuk halaman login');
  //   if(token) {
  //     req.cookies.delete('token')
  //     console.log('token ada', token);
  //     return NextResponse.redirect(new URL('/home', req.url))
  //   } else {
  //     return NextResponse.next()
  //   }
  // }

}

