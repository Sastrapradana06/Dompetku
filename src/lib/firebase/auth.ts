
import {signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { app, db } from "./service"
import { auth, provider } from "./service";
import { collection, doc, getDocs, setDoc, query, where  } from "firebase/firestore";
import { userDataRegister } from "@/type";
import { createCookies, createLocalStorage } from "@/utils";

export const signInUser = (email: string, password: string, callback:Function) => {
  signInWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken()
      const dataUserLogin = await getUserLogin(user.email)
      createCookies(token)
      createLocalStorage(dataUserLogin)
      callback(dataUserLogin)
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log({ errorCode });
      callback(false)
    });
}

export const signOutUser = (callback:Function) => {
  signOut(auth)
  .then(() => {
    document.cookie = ("token=")
    callback(true)
  }).catch((error) => {
    console.log(error.code);
    callback(false)
    
  });
}

export const signInWithGoogle = (callback:Function) => {
  signInWithPopup(auth, provider)
    .then( async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken;
      const user = result.user;
      const dataUserLogin = await getUserLogin(user.email)
      const userData = {
        user_id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        usaha: 'none',
        saldo: 0,
        provider: 'google',
        dailyLimit: 0,
      }
      // console.log({dataUserLogin});
      await setDoc(doc(db, "users", user.uid), dataUserLogin ? dataUserLogin : userData)
      localStorage.setItem("data-user", JSON.stringify(dataUserLogin ? dataUserLogin : userData));
      createCookies(token)
      callback(dataUserLogin ? dataUserLogin : userData)
    }).catch((err) => {
      const errorCode = err.code;
      console.log({errorCode});
      callback(false)
    })  
}

export const registerUser = (data:userDataRegister, callback:Function) => {
  const {email, password, name} = data
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const users = userCredential.user;
      await setDoc(doc(db, "users", users.uid), {
        user_id: users.uid,
        name: name,
        email: email,
        image: 'none',
        usaha: 'none',
        saldo: 0,
        provider: 'email',
        dailyLimit: 0,
      })
      callback(true)
    }).catch((err) => {
      const errorCode = err.code;
      console.log({errorCode});
      callback(false)
    })
}

export const getUserLogin = async (email:string | null) => {
  const userCollection = collection(db, 'users')
  const q = query(userCollection, where('email', '==', email));
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    console.log('Tidak ada pengguna dengan email ini.');
    return null; 
  } else {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return userData;
  }
}


export const getUserLoginAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user
    } else {
      return undefined
    }
  });
}