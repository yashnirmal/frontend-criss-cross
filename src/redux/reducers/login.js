const loggeduser = null;

export const loginReducer = (state=loggeduser,action)=>{
    switch(action.type){
        case "LOGIN":
            return state = action.payload;
        case "LOGOUT":
            return state=null;
        default:
            return state;
    }
}