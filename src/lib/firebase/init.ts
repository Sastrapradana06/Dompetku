import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { cookies } from 'next/headers'

export const handleLogOut = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    console.log("user keluar");
    return true; // Berhasil logout
  } catch (err) {
    console.log(err);
    return false; // Gagal logout
  }
}