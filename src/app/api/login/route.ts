import { app } from "@/lib/firebase/service";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req:NextRequest) {
  const request = await req.json()
  const {email, password} = request
  const auth = getAuth(app)
  const cookieStore = cookies()
  // console.log('current', auth.currentUser);

  if(request) {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user;
      const token = await user.getIdToken()
      cookieStore.set('token', token)
      // console.log({user});
      return NextResponse.json({ status: 200, message: 'Login Succes'})
    
    } catch (err) {
      console.log(err);
      return NextResponse.json({ status: 500, message: 'Email Is Not Ready'})
    }
  } else {
    return NextResponse.json({ status: 401, message: 'Not authenticated'})
  }

  
}