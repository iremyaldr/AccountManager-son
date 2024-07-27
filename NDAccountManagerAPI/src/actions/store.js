// src/actions/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { AccountInfo } from '../reducers/AccountInfo'; // Named import

const rootReducer = combineReducers({
  AccountInfo
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
