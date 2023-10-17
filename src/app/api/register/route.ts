import { app } from "@/lib/firebase/service";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqUser = await req.json()
  const {email, password} = reqUser
  const auth = getAuth(app)
  // console.log({reqUser, email, password});

  if (reqUser) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      // console.log({ user });

      if (user) {
        return NextResponse.json({ status: 200, message: 'Success Register' });
      } 
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, message: 'Email Is Ready'});
    }
  } else {
    return NextResponse.json({ status: 401, message: 'Not authenticated' });
  }

};
