'use client'
import useUserStore from "@/store/store"
import { getAuth } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function HomePage() {
  const user = useUserStore((state:any) => state.user)
  // console.log(user);
  // const auth = getAuth()

  // useEffect(() => {
  //   const user = auth.currentUser
  //   console.log('dari home', user?.uid);
    
  // }, [auth])

  return (
    <main>
      <h1>Home Page</h1>
      <p>{user.email}</p>
    </main>
  )
};

// export default ProtectedComponent(HomePage)