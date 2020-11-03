import { combineReducers } from "redux";
import authReducer from "./authReducer";
import topListaReducer from "./topListaReducer";
import lokacijaReducer from "./lokacijaReducer";

export default combineReducers({
  auth: authReducer,
  top: topListaReducer,
  lokacija: lokacijaReducer,
});
