import React from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="body-class" style={{width:"100vw",height:"100vh",backgroundColor:"brown"}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
