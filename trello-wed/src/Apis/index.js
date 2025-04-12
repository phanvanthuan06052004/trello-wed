import axios from 'axios'
import { API_HOST } from '~/utils/Constants'

// API board
// export const fetchBoarDetailsAPI = async (board) => {
//   const request = await axios.get(`${API_HOST}/v1/boards/${board}`)
//   return request.data // Axios trả kết quả property của nó là data
// }
export const updateBoardDetailsAPI = async (boardId, data) => {
  const request = await axios.put(`${API_HOST}/v1/boards/${boardId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}

// API column
export const createNewColumnAPI = async (data) => {
  const request = await axios.post(`${API_HOST}/v1/columns`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const updateColumnDetailsAPI = async (columnId, data) => {
  const request = await axios.put(`${API_HOST}/v1/columns/${columnId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const deleteColumnDetailsAPI = async (columnId) => {
  const request = await axios.delete(`${API_HOST}/v1/columns/${columnId}`)
  return request.data // Axios trả kết quả property của nó là data
}

// API card
export const createNewCardAPI = async (data) => {
  const request = await axios.post(`${API_HOST}/v1/cards`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const moveCardDifferenceColumnAPI = async (data) => {
  const request = await axios.put(`${API_HOST}/v1/boards/support/moveCardDifferenceColumn`, data)
  return request.data // Axios trả kết quả property của nó là data
}