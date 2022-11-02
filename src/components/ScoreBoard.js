import React,{useState,useEffect} from 'react';
import baseUrl from "../baseUrl.js";

export default function ScoreBoard(props) {

console.log(props)

  return (
    <div
      className="score-div"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      <div>Hi {props.name}, Your score</div>
      <div>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Wins : {props.wins}</p>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Losses : {props.losses}</p>
      </div>
    </div>
  );
}
