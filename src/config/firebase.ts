import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtsJyOEF2Gu4tUGSJ9nCaT9_pQu_sAV-k",
  authDomain: "rama-4721d.firebaseapp.com",
  projectId: "rama-4721d",
  storageBucket: "rama-4721d.firebasestorage.app",
  messagingSenderId: "592138019806",
  appId: "1:592138019806:web:c083968434a2ae2393f34f",
  measurementId: "G-1Y1539NQ31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);