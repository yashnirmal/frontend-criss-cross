import React,{useState} from 'react';
import { useEffect } from 'react';
import "./CCBlock.css";
import mSocket from './MySocket';
import {useSelector} from "react-redux";
import baseUrl from "../baseUrl";


export default function CCBlock(props) {
  const [nextMoveSymbol,setNextMoveSymbol] = useState('X');
  const [gameFinished,setGameFinished] = useState(false);
  const [chanceToPlay,setChanceToPlay]=useState(false);
  let chancetoplay=false;
  const [arr,setArr] = useState(Array(9).fill(""))
  const mState = useSelector((state) => state.joinRoomReducer);
  
  function updateScore(w,l){

    let reqOptions = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({wins:w,losses:l})
    }
  
    fetch(`${baseUrl}/score?email=${localStorage.getItem("email")}`)
    .then(res=>res.json())
    .then(data=>{
      if (data.status=='ok'){
        console.log("update successful")
        props.setWins(w)
        props.setLosses(l)
        localStorage.setItem("wins",w)
        localStorage.setItem("losses",l)
      }
    })
    .catch(err=>console.log(err))
  }


  
  useEffect(()=>{

    mSocket.on("chance-to-play",(data)=>{
      console.log("chance",data);
      setChanceToPlay(data);
    })
  
    mSocket.on("move-played-from-backend", (data) => {
      console.log(data);
      console.log("move-played", data.arr);
      setArr(data.arr);
      setNextMoveSymbol(data.nextMove);
      setChanceToPlay(data.chance);
      chancetoplay=data.chance;
    });

    mSocket.on("game-won",data=>{
      let w = parseInt(localStorage.getItem("wins"))
      let l = parseInt(localStorage.getItem("losses"))
      if(data==localStorage.getItem("name")){
        alert(`${localStorage.getItem("name")} you have won the game!!!`);
        //localStorage.setItem("wins", parseInt(localStorage.getItem("wins"))+1);
        updateScore(w+1,l)
        //props.setWins(props.wins+1);
        // setChanceToPlay(false);
      }
      else{
        alert(`Sorry ${localStorage.getItem("name")} you have lost the game`);
        //localStorage.setItem("losses", parseInt(localStorage.getItem("losses")) + 1);
        updateScore(w,l+1)
        //props.setLosses(props.losses+1);
      }
      setArr(Array(9).fill(""))
      mSocket.emit("clear-array");
      setGameFinished(true);
    })

  },[mSocket]);



  function blockClicked(e){
  console.log(props.wins,props.losses)
    if (gameFinished) return;
    if (chanceToPlay===false) return;
    const clickedBlock = e.target;
    let num;
    if(clickedBlock.classList.contains('block') && clickedBlock.children[0].innerText==""){
      clickedBlock.children[0].innerText = nextMoveSymbol;
      num = clickedBlock.classList[1].substring(1);
      arr[num-1] = nextMoveSymbol;
    }
    else if (
      clickedBlock.parentNode.classList.contains("block") &&
      clickedBlock.innerText=="") {
      clickedBlock.innerText = nextMoveSymbol;
      num = clickedBlock.classList[1].substring(1);
      arr[num - 1] = nextMoveSymbol;
      num = clickedBlock.parentNode.classList[1].substring(1);
    }

    setChanceToPlay(false);
    chancetoplay=false
    mSocket.emit("move-played-to-backend",{num,room:mState,nextMove:(nextMoveSymbol=="X")?"O":"X",name:localStorage.getItem("name")});

    // setNextMoveSymbol(nextMoveSymbol=='X'?'O':'X')
  }


  function startNewGame(e){
    setGameFinished(false);
    mSocket.emit("clear-array");
    setArr(Array(9).fill(""));
  }


  return (
    <>
      <div className="CC-div">
        <div className="row-3">
          <div className="column-3">
            <div
              className="block b1"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[0]}</h1>
            </div>
            <div
              className="block b2"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[1]}</h1>
            </div>
            <div
              className="block b3"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[2]}</h1>
            </div>
          </div>
          <div className="column-3">
            <div
              className="block b4"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[3]}</h1>
            </div>
            <div
              className="block b5"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[4]}</h1>
            </div>
            <div
              className="block b6"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[5]}</h1>
            </div>
          </div>
          <div className="column-3">
            <div
              className="block b7"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[6]}</h1>
            </div>
            <div
              className="block b8"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[7]}</h1>
            </div>
            <div
              className="block b9"
              onClick={(e) => {
                blockClicked(e);
              }}
            >
              <h1 style={{ fontWeight: "bold", fontSize: "4rem" }}>{arr[8]}</h1>
            </div>
          </div>
        </div>

        {
        gameFinished?
        <button
        className="Button"
        style={{marginTop:100}} onClick={startNewGame}>Start New Game</button>
        :
        <button
        className="Btn-disabled"
        style={{marginTop:100}}>Start New Game</button>
        }
      </div>
    </>
  );
}
