import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
// import { handleLogOut } from "@/lib/firebase/init";

export async function POST(request: NextRequest) {
  // const res = await request.json()
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const auth = getAuth(app)
  console.log(token);
  
  if (token) {
    try {
      await signOut(auth)
      cookieStore.delete('token');
      return NextResponse.json({
        status: 200,
        message: `Logout successful`,
      });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ status: 500, message: 'Failed SignOut'})
    }
  } else {
    return NextResponse.json({
      status: 401,
      message: 'Not authenticated',
    });
  }
}


