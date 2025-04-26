/* eslint-disable no-unused-vars */
import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { refreshTokenAPI } from '~/Apis'
import { logoutUserAPI } from '~/redux/user/userSlice'
// không thể import { store } frorm '~/redux/store'theo cách thông thường ở đây
// Giải pháp: Inject store:là kỹ thuật khi cần biến store ở các file ngoài phạm vi
// khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên sau đó chúng ta gọi injectStore để gán biên
//axiosReduxStore cục bộ vào file này
let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

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

// khỏi tạo một cái promise để lưu trữ promise của api refresh token
// Mục đích tạo promise này để khi nào gọi api refresh_-token xong xuôi thì mới retry lại nhiều api lỗi trước đó.
let refreshTokenPromise = null


// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {

  // Kỹ thuật chặn spam click
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Mọi  mã http status nằm ngoài vùng 200-299 sẽ là err và rơi vào đây
  // Xử lý lỗi tập trung ở đây, clean code, lỗi của các req sau khi gọi sẽ tụ ở đây
  // console.log(error)
  interceptorLoadingElements(false)

  // Xử lý refresh token
  // TH1: nếu nhận mã 401 từ BE thì gọi api đăng xuất luôn
  if (error.response?.status === 401) {
    // Gọi api đăng xuất
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }
  // TH2: nếu nhận mã 410 từ BE thì gọi api refresh token
  const originalRequest = error.config
  if (error.response?.status === 410 && !originalRequest._retry) {
    // gắn originalRequest._retry = true trong khoản thời gian chờ, đảm bảo refresh token chỉ chạy 1 lần tại 1 thời điểm
    originalRequest._retry = true

    // kiểm tra xem nếu chưa có refreshtokenPromise thì gọi api refresh token đồng thời gắn cho cái refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // đồng thời acctoken đã nằm trong httpOnly cookie của trình duyệt
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận lỗi nào từ refreshToken thì cứ logout
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          // dù có lỗi hay không cũng phải set lại lại refreshTokenPromise về null
          refreshTokenPromise = null
        })
    }

    // gọi lại các api lỗi trước đó
    return refreshTokenPromise.then((accessToken) => {
      // Đối với TH nếu muốn lưu access token vào localStorage thì làm ở chổ này
      return authorizeAxiosInstance(originalRequest)
    })
  }


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