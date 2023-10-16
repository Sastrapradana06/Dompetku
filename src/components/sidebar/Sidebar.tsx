"use client"
import { handleLogOut } from "@/lib/firebase/init";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const auth = getAuth()
  
  const handleSignOut = async () => {
    const res = await fetch('api/logout', {
      method: 'POST',
    })

    const response = await res.json()
    console.log(response);
    if(response.status === 200) {
      await handleLogOut()
      // const user = auth.currentUser
      // console.log('dari sidebar', user?.uid);
      router.push('/login')
    } else {
      console.log('failed logout');
    }
  }

  return (
    <nav>
      <div className="">
        <div className="">
          <h1>Sidebar</h1>
        </div>
        <div className="">
          <Link href={'/about'}>About</Link>
        </div>
        <div className="">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  )
};
