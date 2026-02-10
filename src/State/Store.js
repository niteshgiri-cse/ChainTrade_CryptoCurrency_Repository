import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/Reducer'
import coinReducer from './coin/Reducer';
import walletReducer from './Wallet/Reducer';
import withdrawalReducer from './Withdrawal/Reducer';
import orderReducer from './order/Reducer';
import assetReducer from './Asset/Reducer';
import watchlistReducer from './watchList/Reducer';


const store = configureStore({
  reducer: {
    auth: authReducer,
    coin:coinReducer,
   wallet:walletReducer,
   withdrawal:withdrawalReducer,
   order:orderReducer,
   asset:assetReducer,
   watchlist:watchlistReducer
  }
})

export default store;
