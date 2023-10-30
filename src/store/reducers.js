import { combineReducers } from "redux";
import { listdataSlice } from "./dataSlice";
const reducers = combineReducers({
  listData: listdataSlice,
});
export default reducers;
