import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, deleteDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./service";
import { generateRandomString, sortByDate, filteredItems, formatDate, formatTime, createLocalStorage } from "@/utils";
import { UserUpdateFinance, UserUpdateProfil } from "@/type";
import { storage } from "@/lib/firebase/service";
import {  ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


export const getUser = async (user_id: string) => {
  const q = query(collection(db, "users"), where("user_id", "==", user_id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

export const createTransaksiUser = async (dataUser: any, collectionName: string, callback: Function) => {
  const { userId, userName, nominal, deskripsi, dailyLimit } = dataUser
  try {
    console.log({dailyLimit})
    const date = new Date()
    // cek limit user
    if(collectionName === 'pengeluaran' && dailyLimit != 0) {
      const currentDate = formatDate(date)

      const riwayatUser = await getRiwayatUser(userId, collectionName)
      let totalExpense:number = parseFloat(nominal)
      if(riwayatUser) {
        const filterUserWithDate = riwayatUser.filter((item:any) => item.tanggal == currentDate)
        filterUserWithDate.map((item:any) => totalExpense += item.nominal)
      }

      if( totalExpense >= dailyLimit){
        console.log('Mencapai Batas Limit Harian Anda')
        callback('Failed Limit')
        return false
      }
    }
    
    const id = generateRandomString()
    const transactionsRef = doc(db, collectionName, id);
    const newTransaction = {
      id,
      user_id: userId,
      user_name: userName,
      nominal: parseFloat(nominal),
      deskripsi,
      // date: date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      date: serverTimestamp(),
      tanggal: formatDate(date),
      jam: formatTime(date),
      type: collectionName,
    };

    await setDoc(transactionsRef, newTransaction);
    callback('Succes')

    console.log("Transaksi berhasil disimpan!");
  } catch (error) {
    console.error("Terjadi kesalahan saat menyimpan transaksi:", error);
    callback('Failed Create')
  }
}


export const getRiwayatUser = async (user_id: string, collectionName: string) => {
  const q = query(collection(db, collectionName), where("user_id", "==", user_id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if (data) {
    const sortData = data.sort(sortByDate)
    // console.log('data di sort', {data, sortData})
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


export const getAllRiwayat = async (id: string,) => {
  const pengeluaranUser = await getRiwayatUser(id, 'pengeluaran')
  const pemasukkanUser = await getRiwayatUser(id, 'pemasukkan')
  let riwayatTerbaru;

  if (pengeluaranUser || pemasukkanUser) {
    const allRiwayat = [...pengeluaranUser, ...pemasukkanUser]
    const sortedRiwayat = allRiwayat.sort(sortByDate)
    // console.log('data all di sort', {allRiwayat, sortedRiwayat})
    riwayatTerbaru = sortedRiwayat
    return riwayatTerbaru
  }

}


export const deleteRiwayat = async (id: string, collectionName: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id))
  } catch (err) {
    console.log(err)
  }

}

export const searchRiwayatUser = async (valueInput: string, setState: any, user_id: string, collectionName?: string,) => {

  if (collectionName) {
    const dataRiwayat = await getRiwayatUser(user_id, collectionName);
    if (dataRiwayat) {
      setState(dataRiwayat)
      const filterRiwayat = filteredItems(dataRiwayat, valueInput)
      return filterRiwayat
    }

  } else {
    const dataAllRiwayat = await getAllRiwayat(user_id);
    if (dataAllRiwayat) {
      setState(dataAllRiwayat)
      const filterRiwayat = filteredItems(dataAllRiwayat, valueInput)
      return filterRiwayat
    }
  }
}


export const updateFinanceUser = async (data: UserUpdateFinance, callback: Function) => {
  const { userId, saldoUser, nominalInput, type } = data
  try {
    let newSaldo;
    if (type === 'pengeluaran') {
      const reduceSaldo = saldoUser - nominalInput
      newSaldo = reduceSaldo
    } else {
      const addSaldo = saldoUser + nominalInput
      newSaldo = addSaldo
    }
    console.log({ newSaldo });

    const dbUser = doc(db, "users", userId)
    const dataToUpdate = {
      saldo: newSaldo
    }

    await updateDoc(dbUser, dataToUpdate)
    const userData: any = await getUser(userId)
    createLocalStorage(userData[0])
    callback(userData[0])
  } catch (err) {
    console.log({ err });
    callback(false)
  }
}

export const sinkronUserSaldo = async (user_id:string, callback:Function) => {
  try {
    const riwayatKeluar = await getRiwayatUser(user_id, 'pengeluaran')
    const riwayatMasuk = await getRiwayatUser(user_id, 'pemasukkan')

    let uangKeluar = 0;
    let uangMasuk = 0;

    if(riwayatKeluar) {
      riwayatKeluar.map((item:any) => uangKeluar += item.nominal)
    }

    if(riwayatMasuk) {
      riwayatMasuk.map((item:any) => uangMasuk += item.nominal)
    }

    const totalSaldo = uangMasuk - uangKeluar
    // console.log({uangKeluar, uangMasuk, totalSaldo});

    const dbUser = doc(db, "users", user_id)
    const dataToUpdate = {
      saldo: totalSaldo
    }

    await updateDoc(dbUser, dataToUpdate)
    const userData: any = await getUser(user_id)
    createLocalStorage(userData[0])
    callback(userData[0])
  } catch(err) {
    console.log({ err });
    callback(false)
  }
}

export const updateProfilUser = async (data: UserUpdateProfil, callback: Function) => {
  const { userId, newUrlImage, username, usaha } = data
  try {
    const dbUser = doc(db, "users", userId)
    let dataToUpdate = {
      image: newUrlImage,
      name: username,
      usaha
    }

    await updateDoc(dbUser, dataToUpdate)
    const userData: any = await getUser(userId)
    callback(userData[0])

  } catch (err) {
    console.log({ err });
    callback(false)
  }
}


export const uploadImages = async (file: any, user_id: string, image:string) => {

  try {
    const storagePath = `image-user/${user_id}/`;
    const storageRef = ref(storage, storagePath + "user-profil");
    // console.log({image})
    let urlImage;
    
    if(image.includes("user-profil")) {
      console.log('masuk includes')
      await deleteObject(storageRef)
    }
    await uploadBytes(storageRef, file)
    await getDownloadURL(storageRef)
      .then((url) => urlImage = url)
      .catch((err) => { throw err })
  
    return urlImage

  } catch (err) {
    console.log({err});
    return false
    
  }

}

export const userDailyLimit = async (user_id:string, limit:string) => {
  // console.log({limit});
  
  try {
    const dbUser = doc(db, "users", user_id)
    const updateLimit = {
      dailyLimit: parseFloat(limit)
    }

    updateDoc(dbUser, updateLimit)
    const userNewUpdate = await getUser(user_id)
    createLocalStorage(userNewUpdate[0])

  } catch (err) {
    console.log({ err });
  }
}