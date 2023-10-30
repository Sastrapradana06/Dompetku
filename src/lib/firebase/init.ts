
import {signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from "firebase/auth"
import { app, db } from "./service"
import { auth, provider } from "./service";
import { collection, doc, getDocs, setDoc, query, where  } from "firebase/firestore";
import { userDataRegister } from "@/type";

export const signInUser = (email: string, password: string, callback:Function) => {
  signInWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken()
      const dataUserLogin = await getUserLogin(user.email)
      localStorage.setItem("data-user", JSON.stringify(dataUserLogin));
      // console.log(dataUserLogin);
      document.cookie = (`token=${token}`)
      callback(true)
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
      const userData = {
        email: user.email,
        image: user.photoURL,
        name: user.displayName,
        usaha: 'none',
        saldo: 0,
        provider: 'google'
      }
      // console.log({userData});
      await setDoc(doc(db, "users", user.uid), userData)
      localStorage.setItem("data-user", JSON.stringify(userData));
      document.cookie = `token=${token}`
      callback(true)
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
        name: name,
        email: email,
        image: 'none',
        usaha: 'none',
        saldo: 0,
        provider: 'email'
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