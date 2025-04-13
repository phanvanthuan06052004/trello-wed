import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
// Khởi tạo một đối tượng Axios (authorizeAxiosInstance) mục đích là để cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 req: 10m
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredential: sẽ tự động gửi Cookie lên req xuống BE (xử lí cho JWT) vào trong httpOnly Cookie của trình duyệt
authorizeAxiosInstance.defaults.withCredentials = true

// Cấu hình Interceptors (Bộ đánh chặn giữa req và res)
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Mọi  mã http status nằm ngoài vùng 200-299 sẽ là err và rơi vào đây
  // Xử lý lỗi tập trung ở đây, clean code, lỗi của các req sau khi gọi sẽ tụ ở đây
  // console.log(error)
  interceptorLoadingElements(false)
  let errMessage = error?.message
  if (error.response?.data?.message) {
    errMessage = error.response?.data?.message
  }
  // Dùng toastify hiển thị tất cả các lỗi trừ lỗi 410 - GONE phục vụ việc tự động refresh lại token
  if (error.response?.status !== 410) {
    toast.error(errMessage)
  }
  return Promise.reject(error)
})

export default authorizeAxiosInstance