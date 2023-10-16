'use client'
import { handleLogOut } from "@/lib/firebase/init";

export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      <button onClick={async () => handleLogOut()}>log out</button>
    </main>
  )
};
