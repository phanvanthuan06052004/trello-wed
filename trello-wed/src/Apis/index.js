import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_HOST } from '~/utils/Constants'
import { toast } from 'react-toastify'

// API board
export const updateBoardDetailsAPI = async (boardId, data) => {
  const request = await authorizeAxiosInstance.put(`${API_HOST}/v1/boards/${boardId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const inviteUserToBoardAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/invitations/board`, data)
  toast.success('User invited to board success!', { theme: 'colored' })
  return request.data
}
export const fetchBoardsAPI = async (searchBoard) => {
  const request = await authorizeAxiosInstance.get(`${API_HOST}/v1/boards${searchBoard}`)
  return request.data
}
export const createNewBoardAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/boards`, data)
  toast.success('Create new board successfully!', { theme: 'colored' })
  return request.data // Axios trả kết quả property của nó là data
}

// API column
export const createNewColumnAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/columns`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const updateColumnDetailsAPI = async (columnId, data) => {
  const request = await authorizeAxiosInstance.put(`${API_HOST}/v1/columns/${columnId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const deleteColumnDetailsAPI = async (columnId) => {
  const request = await authorizeAxiosInstance.delete(`${API_HOST}/v1/columns/${columnId}`)
  return request.data // Axios trả kết quả property của nó là data
}

// API card
export const createNewCardAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/cards`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const updateCardAPI = async (cardId, data) => {
  const request = await authorizeAxiosInstance.put(`${API_HOST}/v1/cards/${cardId}`, data)
  return request.data // Axios trả kết quả property của nó là data
}
export const moveCardDifferenceColumnAPI = async (data) => {
  const request = await authorizeAxiosInstance.put(`${API_HOST}/v1/boards/support/moveCardDifferenceColumn`, data)
  return request.data // Axios trả kết quả property của nó là data
}

// API user
export const registerUserAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/users/register`, data)
  toast.success('Register successfully! Please check and verify your email before login!', { theme: 'colored' })
  return request.data
}
export const verifyUserAPI = async (data) => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/users/verify`, data)
  toast.success('Verify successfully! Please login to continue!', { theme: 'colored' })
  return request.data // Axios trả kết quả property của nó là data
}
export const refreshTokenAPI = async () => {
  const request = await authorizeAxiosInstance.post(`${API_HOST}/v1/users/refresh-token`)
  return request.data // Axios trả kết quả property của nó là data
}
