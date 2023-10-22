'use client'
import { app, db } from "@/lib/firebase/service"
import useUserStore from "@/store/store"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link"
// import { useEffect } from "react"


export default function HomePage() {
  const user = useUserStore((state:any) => state.user)
  const auth = getAuth(app)

  onAuthStateChanged(auth, async (user) => {
    const uid = user?.uid
    // console.log(uid);
    if(uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('Data Pengguna:', userData);
      } else {
        console.log('Dokumen tidak ditemukan.');
      }
    }
  })
  

  return (
    <main>
      <h1>Home Page</h1>
      <p>{user.email}</p>
    </main>
  )
};
