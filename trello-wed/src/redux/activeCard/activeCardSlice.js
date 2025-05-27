import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowCardDetail: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showCardDetail: (state) => {
      state.isShowCardDetail = true
    },
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
      state.isShowCardDetail = true
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowCardDetail = false
    }
  }
})

export const { updateCurrentActiveCard, clearCurrentActiveCard, showCardDetail } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowCardDetail = (state) => {
  return state.activeCard.isShowCardDetail
}

export const activeCardReducer = activeCardSlice.reducer