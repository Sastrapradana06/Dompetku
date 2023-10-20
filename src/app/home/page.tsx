'use client'
import { app } from "@/lib/firebase/service"
import useUserStore from "@/store/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
// import { useEffect } from "react"


export default function HomePage() {
  const user = useUserStore((state:any) => state.user)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  })



  

  return (
    <main>
      <h1>Home Page</h1>
      <p>{user.email}</p>
    </main>
  )
};
