import axios from 'axios'
import { API_HOST } from '~/utils/Constants'

export const fetchBoarDetailsAPI = async (board) => {
  const request = await axios.get(`${API_HOST}/v1/boards/${board}`)
  return request.data // Axios trả kết quả property của nó là data
}