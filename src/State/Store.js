import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/Reducer'
import coinReducer from './coin/Reducer';
import walletReducer from './Wallet/Reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    coin:coinReducer,
   wallet:walletReducer
  }
})

export default store;
