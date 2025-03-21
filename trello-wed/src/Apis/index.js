import axios from 'axios'
import { API_HOST } from '~/utils/Constants'

// API lấy data của board
export const fetchBoarDetailsAPI = async (board) => {
  const request = await axios.get(`${API_HOST}/v1/boards/${board}`)
  return request.data // Axios trả kết quả property của nó là data
}

// API xử lý update column sau xắp xếp
export const updateBoarDetailsAPI = async (boardId, data) => {
  const request = await axios.put(`${API_HOST}/v1/boards/${boardId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}

// API tạo column
export const createNewColumnAPI = async (data) => {
  const request = await axios.post(`${API_HOST}/v1/columns`, data)
  return request.data // Axios trả kết quả property của nó là data
}

// API tạo card
export const createNewCardAPI = async (data) => {
  const request = await axios.post(`${API_HOST}/v1/cards`, data)
  return request.data // Axios trả kết quả property của nó là data
}