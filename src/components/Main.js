import { Button, TextField } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import CCBlock from './CCBlock';
import "./Main.css";
import mSocket from './MySocket.js';
import {useSelector,useDispatch} from "react-redux";
import { joinRoom } from '../redux/action/action';
import ScoreBoard from "./ScoreBoard";
import baseUrl from "../baseUrl";


export default function Main() {
  
  const [playerId,setPlayerId]= useState('');
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [name, setName] = useState("")
  const mState = useSelector(state=>state);
  console.log(mState.joinRoomReducer);
  const dispatch= useDispatch();
  

  function enterARoom(){
    let roomCode = document.querySelector('.room-code-input').value;
    dispatch(joinRoom(roomCode));
    mSocket.emit("join-room",roomCode);
  }
  
  function getScore(){
  if(localStorage.getItem("email")!=null)
    fetch(`${baseUrl}/score?email=${localStorage.getItem("email")}`)
    .then(res=>res.json())
    .then(data=>{
      if (data.status=='ok'){
        console.log(data)
        setWins(data.data.wins)
        setLosses(data.data.losses)
        setName(data.data.name)
        localStorage.setItem("wins",data.data.wins)
        localStorage.setItem("losses",data.data.losses)
        localStorage.setItem("name",data.data.name)
      }
    })
    .catch(err=>console.log(err))
  }

  mSocket.on("connect",()=>{
    mSocket.emit("join-room",mSocket.id);
    dispatch(joinRoom(mSocket.id))
    setPlayerId(mSocket.id);
    localStorage.setItem("playerId", mSocket.id);
  });

  useEffect(()=>{
    setPlayerId(mSocket.id);
  })
  
  useEffect(()=>{
    getScore()
  },[])

  


  return (
    <div className="main-div">
      <div className="new-game-div">
        <input
          className="room-code-input"
          type="text"
          placeholder="Enter room code"
        />
        <br />
        <button className="Button" onClick={enterARoom}>
          Enter the room
        </button>
        <span style={{ marginTop: 20 }}>Your Room Id : {playerId}</span>
      </div>
      <div className="game-block">
        <CCBlock wins={wins} losses={losses} setWins={setWins} setLosses={setLosses} />
      </div>
      <div>
        <ScoreBoard wins={wins} losses={losses} setWins={setWins} setLosses={setLosses} name={name} />
      </div>
    </div>
  );
}
