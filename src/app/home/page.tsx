'use client'
import useUserStore from "@/store/store"
import Link from "next/link"


export default function HomePage() {
  const user = useUserStore((state:any) => state.user)

  return (
    <main>
      <h1>Home Page</h1>
      <p>{user.email}</p>
      <Link href={'/about'}>About</Link>
    </main>
  )
};
