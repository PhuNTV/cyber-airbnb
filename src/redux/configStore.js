import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/Search';
import roomByLocationReducer from './slices/RoomByLocation'
import AuthReducer from './slices/Authentication'
const store = configureStore({
  reducer: {
    searchReducer,
    roomByLocationReducer,
    AuthReducer,
  },
});

export default store;
