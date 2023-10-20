import { app } from "@/lib/firebase/service";
import { getAuth, updateEmail, onAuthStateChanged } from "firebase/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json()
  const {newEmail} = request
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const auth = getAuth(app)
  const user:any =  auth.currentUser;
  console.log({user});
  if(user) {
    try {
      await updateEmail(user, newEmail)
      cookieStore.delete('token')
      return NextResponse.json({ status: 200, message: 'Succes'})
    } catch (err:any) {
      console.log(err);
      return NextResponse.json({ status: 500, message: 'Not authenticated '})
    }
  } else {
    return NextResponse.json({ status: 401, message: 'Not authenticated '})
  }

}