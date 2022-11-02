export const joinRoom = (room)=>{
    return {
        type:"JOIN ROOM",
        payload: room
    }
}

export const login = (email)=>{
    return {
        type:"LOGIN",
        payload:email
    }
}

export const logout = ()=>{
    return {
        type:"LOGIN"
    }
}