import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";  
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
    });

    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};