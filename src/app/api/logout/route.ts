import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { handleLogOut } from "@/lib/firebase/init";

export async function POST(request: NextRequest) {
  // const res = await request.json()
  const cookieStore = cookies()
  const uid = cookieStore.get('uid')
  // console.log(uid?.value);

  
  if (!uid) {
    return NextResponse.json({
      status: 401,
      message: 'Not authenticated',
    });
  } else {
    const logoutSuccess = await handleLogOut()
    console.log(logoutSuccess);
    if(logoutSuccess) {
      cookieStore.delete('uid')
      return NextResponse.json({
        status: 200,
        message: `Succes  ${uid?.value}`,
      })
    } else {
      return NextResponse.json({status: 500, message: 'Sign Out Failed'})
    }
    
  }
}


