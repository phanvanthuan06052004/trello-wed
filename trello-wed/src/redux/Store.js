//redux: State Management tool
import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

// Cấu hình redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // mặt định là localstorage

const rootPersistConfig = {
  key: 'root', // key này do chúng ta chỉ định
  storage, // lưu vào localStorage
  whitelist: ['user'] // định nghĩa các slice được phép tồn tại sau khi f5 refresh trình duyệt
  // balcklist: ['user'] // ngược lại whitelist
}

// Combine các reducer trong dự án ở đây
const reducer = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// Thực hiện persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
})