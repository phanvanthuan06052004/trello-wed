import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty, update } from 'lodash'
import { API_HOST } from '~/utils/Constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/Sort'

const initialState = {
  currentNotifications: null
}

// các hành động gọi api (bất đồng bộ ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchInvitationAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_HOST}/v1/invitations`)
    return response.data // Axios trả kết quả property của nó là data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ notificationId, status }) => {
    const response = await authorizeAxiosInstance.put(`${API_HOST}/v1/invitations/board/${notificationId}`, { status })
    return response.data // Axios trả kết quả property của nó là data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },

    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },

    addNotifications: (state, action) => {
      const data = action.payload
      state.currentNotifications.unshift(data) // Thêm notification mới vào đầu mảng
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationAPI.fulfilled, (state, action) => {
      let data = action.payload // action lấy từ fetAPI data ở trên trả về

      state.currentNotifications = Array.isArray(data) ? data.reverse() : []
    })

    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      let data = action.payload // action lấy từ fetAPI data ở trên trả về

      /// cập nhật lại dữ liệu boardInvitaion bên trong nó sẽ có status mới sau khi update
      const getInvitation = state.currentNotifications.find(invitation => invitation._id === data._id)
      getInvitation.boardInvitation = data.boardInvitation
    })
  }
})

export const { clearCurrentNotifications, updateCurrentNotifications, addNotifications } = notificationsSlice.actions

// Selector: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ kho redux store ra
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationReducer = notificationsSlice.reducer