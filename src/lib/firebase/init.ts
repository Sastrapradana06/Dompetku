import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";

// export const handleLogOut = () => {
//   const auth = getAuth(app);
//   signOut(auth)
//   .then(() => {
//     const user = auth.currentUser
//     console.log(user?.uid);
    
//     console.log("user keluar");
//     return false
//   })
//   .catch((err) => {
//     console.log(err);
//     return false
//   });
// }
export const handleLogOut = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    const user = auth.currentUser
    console.log(user?.uid);
    console.log("user keluar");
    return true; // Berhasil logout
  } catch (err) {
    console.log(err);
    return false; // Gagal logout
  }
}