import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./service";

export const createPengeluaran = async (dataUser: any, callback: Function) => {
  const { userId, userName, nominal, deskripsi } = dataUser
  // console.log({ dataUser });

  const transactionsRef = collection(db, "pengeluaran");
  const date = new Date()

  try {
    // Membuat objek transaksi
    const newTransaction = {
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      tanggal: date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }),
      jam: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
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

export const createPemasukkan = async (dataUser: any, callback: Function) => {
  const { userId, userName, nominal, deskripsi } = dataUser
  // console.log({ dataUser });
  const transactionsRef = collection(db, "pemasukkan");
  const date = new Date()

  try {
    // Membuat objek transaksi
    const newTransaction = {
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      tanggal: date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', }),
      jam: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: "pemasukkan",
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

export const getRiwayatUser = async (id: string, collectionName:string) => {

  const q = query(collection(db, collectionName), where("user_id", "==", id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  return data
} 