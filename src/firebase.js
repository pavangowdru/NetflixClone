import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            getAuth } from "firebase/auth";
import { addDoc, 
            collection, 
            getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";            

const firebaseConfig = {
  apiKey: "AIzaSyBqS4XuNKojTDeO9phAF3INTnPeE5aIxmM",
  authDomain: "netflix-clone-28c54.firebaseapp.com",
  projectId: "netflix-clone-28c54",
  storageBucket: "netflix-clone-28c54.firebasestorage.app",
  messagingSenderId: "600085450839",
  appId: "1:600085450839:web:8360dabc1908e4da939312"
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
