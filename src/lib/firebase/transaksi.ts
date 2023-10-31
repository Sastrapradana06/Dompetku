import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./service";

export const createPengeluaran = async (dataUser:any, callback:Function) => {
  const {userId, userName, nominal, deskripsi} = dataUser
  console.log({dataUser});
  
  const transactionsRef = collection(db, "pengeluaran");

  try {
    // Membuat objek transaksi
    const newTransaction = {
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      tanggal: serverTimestamp(),
      jam: new Date().toLocaleTimeString(),
      type: "pengeluaran",
    };

    // Menyimpan transaksi ke Firestore
    await addDoc(transactionsRef, newTransaction);
    callback(true)

    console.log("Transaksi berhasil disimpan!");
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan transaksi:", error);
    callback(false)
  }
}