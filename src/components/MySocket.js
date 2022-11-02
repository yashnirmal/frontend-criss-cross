import { io } from "socket.io-client";
import baseUrl from "../baseUrl";

const mSocket = io(baseUrl);

mSocket.on("connect",()=>{
    console.log(mSocket.id);
})

export default mSocket;
