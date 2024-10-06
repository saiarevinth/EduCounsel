import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_VwX3s_rwVH4URRsR-GcN8GP2BIVDj1E",
  authDomain: "educounsel-1915f.firebaseapp.com",
  projectId: "educounsel-1915f",
  storageBucket: "educounsel-1915f.appspot.com",
  messagingSenderId: "1053204579865",
  appId: "1:1053204579865:web:c1db3296b337ded47dcc88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;