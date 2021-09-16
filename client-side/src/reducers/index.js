import { combineReducers } from "redux";
import posts from "./posts";

const reducer = combineReducers({ posts }); // Combine all reducers into one master reducer to pass into createStore function

export default reducer;

// export type RootState = ReturnType<typeof reducer>;
