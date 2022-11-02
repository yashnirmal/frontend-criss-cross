import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Link } from "react-router-dom";
import baseUrl from "../baseUrl";

export default function Login() {
  const navigate = useNavigate();
  

  function LoginBtnClicked(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch(`${baseUrl}/user?email=${email}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          localStorage.setItem("email",data.data.email)
          localStorage.setItem("name",data.data.name)
          localStorage.setItem("wins",data.data.wins)
          localStorage.setItem("losses",data.data.losses)
          navigate("/");
        } else {
          console.log("Wrong email or password");
        }
      })
      .catch((err) => {
        console.log("Something went wrong!");
      });
  }

  return (
    <div className="login-signup-div">
      <div className="signup">
        <h5>Email</h5>
        <input type="text" id="email" placeholder="Email" />
        <br />
        <br />
        <h5>Password</h5>
        <input type="text" id='password' placeholder="Password" />
        <br />
        <br />
        <button className="Button login-signup-btn" onClick={LoginBtnClicked}>Login</button>
        <br />
        <br />
        <p className="move-between-login-signup">
          New User? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}
