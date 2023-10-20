import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "./service"

const auth = getAuth(app);

export const logIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken()
      console.log(token);
      document.cookie = (`token=${token}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log({ errorCode });
    });
}