import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            getAuth } from "firebase/auth";
import { addDoc, 
            collection, 
            getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";            

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user data to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });

    console.log("User signed up successfully:", user);
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.code.split('/')[1].replace(/-/g, ' ')); // Display error message
  }
};


const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User logged in successfully:", user);
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.code.split('/')[1].replace(/-/g, ' '));
    }
};

const logout = async () => {
    try {
        await auth.signOut();
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error(error.code.split('/')[1].replace(/-/g, ' '));
    }
};

export { auth, db, signup, login, logout };
