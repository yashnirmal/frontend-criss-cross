import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Link } from "react-router-dom";
import baseUrl from "../baseUrl";

export default function SignUp() {
  const navigate = useNavigate();

  function SignUpBtnClicked(){
    const name = document.getElementById('name').value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let user = {name,email,password}
    let reqOptions = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(user)
    }

    fetch(`${baseUrl}/user`,reqOptions)
    .then((res)=>res.json())
    .then(data=>{
        if(data.status=='ok'){
            navigate('/login');
        }
        else{
          console.log("The email is already registered")
        }
    })
    .catch((err)=>{
        console.log("Something went wrong!")
    });
  }

  return (    
    <div className="login-signup-div" style={{width:"80vh",height:"fit-content",display: "flex",alignItems:"center"}}>
    <div className="signup">
        
      <h5>Name</h5>
      <input type="text" id="name" placeholder="Name" />
      <br />
      <br />
      <h5>Email</h5>
      <input
        type="text"
        placeholder="Email"
        id="email"
      />      
      <br />
      <br />
      <h5>Password</h5>
      <input
        type="text"
        placeholder="Password"
        id="password"
      />      
      <br />
      <br />
      <button className="Button login-signup-btn" onClick={SignUpBtnClicked}>
        Sign Up
      </button>
      <br />
      <br />
      <p className="move-between-login-signup">
        Already a User? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
}
