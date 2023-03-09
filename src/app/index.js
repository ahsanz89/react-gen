import { combineReducers } from 'redux'
import authReducer from "./features/auth/authSlice"; 


export const rootReducer = (state, action) => {
  // if (action.type === USER_LOGOUT) {
  //     state = undefined;
  //     storage.removeItem(`persist:auth`)
  // }
  return appReducer(state, action);
}
  const appReducer  = combineReducers({
    auth:authReducer  
})
