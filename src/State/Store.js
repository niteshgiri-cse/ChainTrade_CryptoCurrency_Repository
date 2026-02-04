import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/Reducer'
import coinReducer from './coin/Reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    coin:coinReducer
  }
})

export default store;
