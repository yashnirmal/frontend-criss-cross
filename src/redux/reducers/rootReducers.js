import { combineReducers } from "redux";
import { joinRoomReducer } from "./index.js";
import { loginReducer } from "./login.js";

const rootReducer = combineReducers({joinRoomReducer,loginReducer});

export default rootReducer;