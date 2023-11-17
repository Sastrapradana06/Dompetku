import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./service";
import { generateRandomString, sortByDate, filteredItems } from "@/utils";
import { UserUpdateFinance, UserUpdateProfil } from "@/type";
import { storage } from "@/lib/firebase/service";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


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
  const { userId, userName, nominal, deskripsi } = dataUser

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
      tanggal: date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', }),
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


export const getRiwayatUser = async (user_id: string, collectionName: string) => {
  const q = query(collection(db, collectionName), where("user_id", "==", user_id));
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if (data) {
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


export const getAllRiwayat = async (id: string,) => {
  const pengeluaranUser = await getRiwayatUser(id, 'pengeluaran')
  const pemasukkanUser = await getRiwayatUser(id, 'pemasukkan')
  let riwayatTerbaru;

  if (pengeluaranUser || pemasukkanUser) {
    const allRiwayat = [...pengeluaranUser, ...pemasukkanUser]
    const sortedRiwayat = allRiwayat.sort(sortByDate)
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
    callback(userData[0])
  } catch (err) {
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
    console.log({image})
    let urlImage;
    
    if(image != 'none') {
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
  console.log({limit});
  
  try {
    const dbUser = doc(db, "users", user_id)
    const updateLimit = {
      dailyLimit: parseFloat(limit)
    }

    updateDoc(dbUser, updateLimit)
    const userNewUpdate = await getUser(user_id)
    localStorage.setItem("data-user", JSON.stringify(userNewUpdate));

  } catch (err) {
    console.log({ err });
  }
}