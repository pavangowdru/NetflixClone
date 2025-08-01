import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        navigate("/"); // Redirect to home page if user is signed in
      } else {
        // User is signed out
        console.log("User is signed out");
        navigate("/login"); // Redirect to login page if user is signed out
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
    </div>
    
  );
}

export default App;
