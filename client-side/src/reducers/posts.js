import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'


// Reducer contains of the execution rule for each action 
const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL: // Update the state with all the data from this action
      return action.payload; 
    case UPDATE: // Update specific post in the state. However we need to create new state cuz state is immutable
      return state.map((post) => post._id === action.payload._id ? action.payload : post)
    case CREATE: // Since redux state is immutable, we can't simply push new data at the end of the state
      return [...state, action.payload];
    case DELETE: // Create new state without the deleted object
      return state.filter((post) => post._id !== action.payload._id)
    case LIKE: // The same as update
      return state.map((post) => post._id === action.payload._id ? action.payload : post)
    default:
      return state;
  }
};

export default reducer;
