// eslint-disable-next-line
// src\reducers\index.js
import { combineReducers } from 'redux';
import AccountInfo from './AccountInfo'; // Ensure this import matches the default export

const rootReducer = combineReducers({
  accountInfo: AccountInfo, // Ensure the key matches the slice of state managed by this reducer
  // Add other reducers here if needed
});

export default rootReducer;
// eslint-disable-next-line