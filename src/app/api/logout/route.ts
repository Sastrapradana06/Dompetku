import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { handleLogOut } from "@/lib/firebase/init";

export async function POST(request: NextRequest) {
  // const res = await request.json()
  const cookieStore = cookies()
  const uid = cookieStore.get('uid')

  
  if (!uid) {
    return NextResponse.json({
      status: 401,
      message: 'Not authenticated',
    });
  } else {
    cookieStore.delete('uid');
    return NextResponse.json({
      status: 200,
      message: `Logout successful`,
    });
  }
}


