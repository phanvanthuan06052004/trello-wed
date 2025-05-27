import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty, update } from 'lodash'
import { API_HOST } from '~/utils/Constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/Sort'

const initialState = {
  currentActiveBoard: null
}

// các hành động gọi api (bất đồng bộ ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (board) => {
    const request = await authorizeAxiosInstance.get(`${API_HOST}/v1/boards/${board}`)
    return request.data // Axios trả kết quả property của nó là data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý luôn cần dấu ngoặc nhọn ngay cả khi có 1 dòng code vì đây là nguyên tắc trong redux
    updateCurrentActiveBoard: (state, action) => {
      state.currentActiveBoard = action.payload
    },

    updateCardInBoard: (state, action) => {
      const carData = action.payload // lấy dữ liệu card từ action.payload
      // https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
      const column = state.currentActiveBoard.columns.find(column => column._id === carData.columnId)
      if (column) {
        const card = column.cards.find(card => card._id === carData._id)
        if (card) {
          Object.keys(carData).forEach(key => {
            card[key] = carData[key] // cập nhật từng key trong card
          })
        }
      }
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload // action lấy từ fetAPI data ở trên trả về
      // xử lý gộp tất cả member phía FE
      board.FE_allMembers = board.members.concat(board.owners)
      // kiểm tra các column nào vừa tạo mà không có card thì đặt card place holder
      // Dành cho khi nhấn f5 trang nó mới load và kiểm tra
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // sắp xếp thứ tự các card luôn ở đây trước khi đưa xuống component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
// Action: là nơi dành cho các component bên dưới gọi dispatch() tới nó để cập nhật dữ liệu thông qua reducer (chạy đồng bộ)
// Không có thằng action ở trên bởi vì những action này được đơn giản hóa bởi redux toolkit rồi
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

// Selector: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ kho redux store ra
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeBoardSlice.reducer