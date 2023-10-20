'use client'

import Link from "next/link"


export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      <button>
        <Link href={'/updateEmail'}>Update Email</Link>
      </button>
      <button>
        <Link href={'/updatePassword'}>Update Password</Link>
      </button>
    </main>
  )
};
