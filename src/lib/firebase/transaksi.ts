import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./service";
import { sortByDate, sortByNominal } from "@/utils";

export const createTransaksiUser = async (dataUser: any, collectionName:string , callback: Function) => {
  const { userId, userName, nominal, deskripsi } = dataUser
  // console.log({ dataUser });

  const transactionsRef = collection(db, collectionName);
  const date = new Date()

  try {
    const newTransaction = {
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      tanggal: date.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', }),
      jam: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: collectionName,
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

  const q = query(collection(db, collectionName), where("user_id", "==", id), orderBy("user_id"));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if(data) {
    const sortData = data.sort(sortByDate).sort(sortByNominal)
    return sortData
  }
  return data
} 


export const getAllRiwayat = async (id:string,) => {
  const pengeluaranUser = await getRiwayatUser(id, 'pengeluaran')
  const pemasukkanUser = await getRiwayatUser(id, 'pemasukkan')
  let riwayatTerbaru;

  if(pengeluaranUser || pemasukkanUser) {
    const allRiwayat = [...pengeluaranUser, ...pemasukkanUser]
    const sortedRiwayat = allRiwayat.sort(sortByDate).sort(sortByNominal)
    riwayatTerbaru = sortedRiwayat
    return riwayatTerbaru
  }

}