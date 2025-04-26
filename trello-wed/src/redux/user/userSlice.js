import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_HOST } from '~/utils/Constants'

const initialState = {
  currentUser: null
}

// các hành động gọi api (bất đồng bộ ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/users/login`, data)
    return request.data // Axios trả kết quả property của nó là data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload // action lấy từ fetAPI data ở trên trả về
    })
  }
})

// Action creators are generated for each case reducer function
// Action: là nơi dành cho các component bên dưới gọi dispatch() tới nó để cập nhật dữ liệu thông qua reducer (chạy đồng bộ)
// Không có thằng action ở trên bởi vì những action này được đơn giản hóa bởi redux toolkit rồi
// export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selector: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ kho redux store ra
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer