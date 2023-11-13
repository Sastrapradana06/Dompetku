import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./service";
import { generateRandomString, sortByDate, filteredItems } from "@/utils";
import { UserUpdateFinance, UserUpdateProfil } from "@/type";


export const getUser = async (user_id:string) => {
  const q = query(collection(db, "users"), where("user_id", "==", user_id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

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


export const deleteRiwayat = async (id: string, collectionName: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch(err) {
      console.log(err)
    }

}

export const searchRiwayatUser = async (valueInput:string, setState:any, user_id:string, collectionName?: string,) => {

  if(collectionName) {
    const dataRiwayat = await getRiwayatUser(user_id, collectionName);
    if(dataRiwayat) {
      setState(dataRiwayat)
      const filterRiwayat = filteredItems(dataRiwayat, valueInput)
      return filterRiwayat
    }

  } else {
    const dataAllRiwayat = await getAllRiwayat(user_id);
    if(dataAllRiwayat) {
      setState(dataAllRiwayat)
      const filterRiwayat = filteredItems(dataAllRiwayat, valueInput)
      return filterRiwayat
    }
  }
}


export const updateFinanceUser = async (data:UserUpdateFinance ,callback:Function) => {
  const { userId, saldoUser, nominalInput, type } = data
  try {
    let newSaldo;
    if(type === 'pengeluaran') {
      const reduceSaldo = saldoUser - nominalInput
      newSaldo = reduceSaldo
    } else {
      const addSaldo = saldoUser + nominalInput
      newSaldo = addSaldo
    }
    console.log({newSaldo});
    
    const dbUser = doc(db, "users", userId)
    const dataToUpdate = {
      saldo: newSaldo
    }

    await updateDoc(dbUser, dataToUpdate)
    const userData: any = await getUser(userId)
    callback(userData[0])
  } catch (err) {
    console.log({err});
    callback(false)
  }
}

export const updateProfilUser = async (data:UserUpdateProfil, callback:Function) => {
  const {userId, urlImage, username, usaha} = data
  try {
    const dbUser = doc(db, "users", userId)
    let dataToUpdate = {
      image: urlImage,
      name: username,
      usaha
    }

    await updateDoc(dbUser, dataToUpdate)
    const userData: any = await getUser(userId)
    callback(userData[0])

  } catch(err) {
    console.log({err});
    callback(false)
  }
}


//   const { userId, urlImage, username } = data;

//   try {
//     const dbUser = doc(db, "users", userId);
//     let dataToUpdate = {};

//     const newUserProfil = {};

//     if (urlImage) {
//       newUserProfil.image = urlImage;
//     }

//     if (username) {
//       newUserProfil.username = username;
//     }

//     dataToUpdate = newUserProfil;

//     await updateDoc(dbUser, { ...newUserProfil });

//     const userData: any = await getUser(userId);
//     callback(userData[0]);
//   } catch (err) {
//     console.error({ err });
//     callback(false);
//   }
// };