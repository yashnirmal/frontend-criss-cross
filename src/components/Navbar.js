import React from "react";
import "./Navbar.css";
import { Link ,useNavigate} from "react-router-dom";

export default function Navbar() {

  const navigate= useNavigate()

  function logOutBtnClicked(){
    localStorage.clear()
    navigate("/login")
  }


  return (
    <div className="navbar">
      <span className="app-title" onClick={()=>{navigate("/")}}>Criss-Cross</span>
      <div className="link-container">
        { localStorage.getItem("email")!=null?(<button className="Button log-out-btn" onClick={logOutBtnClicked}>Log Out</button>):(<button className="Button log-out-btn" onClick={()=>navigate('/login')}>Log In</button>) }
      </div>
    </div>
  );
}
