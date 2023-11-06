import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./service";
import { generateRandomString, sortByDate, sortByNominal } from "@/utils";

export const createTransaksiUser = async (dataUser: any, collectionName:string , callback: Function) => {
  const { userId, userName, nominal, deskripsi } = dataUser

  // const transactionsRef = collection(db, collectionName);
  const id = generateRandomString()
  const date = new Date()
  const transactionsRef = doc(db, collectionName, id);

  try {
    const newTransaction = {
      id,
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      date: date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      tanggal: date.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', }),
      jam: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: collectionName,
    };

    await setDoc(transactionsRef, newTransaction);
    callback(true)

    console.log("Transaksi berhasil disimpan!");
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan transaksi:", error);
    callback(false)
  }
}


export const getRiwayatUser = async (user_id: string, collectionName:string) => {

  const q = query(collection(db, collectionName), where("user_id", "==", user_id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if(data) {
    const sortData = data.sort(sortByDate)
    return sortData
  }
  return data
} 

export const monitorRiwayatUser = (user_id: string, collectionName: string, callback: Function) => {
  const q = query(collection(db, collectionName), where("user_id", "==", user_id), orderBy("user_id"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    if (data) {
      const sortData = data.sort(sortByDate);
      callback(sortData); 
    }

  });
  return unsubscribe
}


export const getAllRiwayat = async (id:string,) => {
  const pengeluaranUser = await getRiwayatUser(id, 'pengeluaran')
  const pemasukkanUser = await getRiwayatUser(id, 'pemasukkan')
  let riwayatTerbaru;

  if(pengeluaranUser || pemasukkanUser) {
    const allRiwayat = [...pengeluaranUser, ...pemasukkanUser]
    const sortedRiwayat = allRiwayat.sort(sortByDate)
    riwayatTerbaru = sortedRiwayat
    return riwayatTerbaru
  }

}


export const deleteRiwayat = async (user_id:string ,id: string, collectionName: string) => {

    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch(err) {
      console.log(err)
    }

}