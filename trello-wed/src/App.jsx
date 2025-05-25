import Board from './pages/Boards/_id'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import Boards from './pages/Boards'
// Giải pháp clean Code trong việc xác định toute nào cần đăng nhập xác thực 
// Sử dụng Outlet để hiển thị các Child Route
const ProtectRoutes = ({ user }) => {
  if (!user) return <Navigate to={'/login'} replace={true}/>
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (

    <Routes>
      <Route path='/' element={
        <Navigate to={'/boards/67e23e3ef43f67ae0a1d8964'} replace={true} /> // replace là xóa đi dấu vết chuyển hướng để tánh user back lại
      } />
      <Route element={<ProtectRoutes user={currentUser}/>}>
        {/* outlet sẽ chạy vài đây */}
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path='/boards' element={<Boards />} />

        {/*Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>
      {/*Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />


      

      {/*Account verification*/}
      <Route path='/account/verification' element={<AccountVerification />} />

      {/*Board*/}

      {/*các trường hợp route không hợp lệ nó sẽ nhảy xuống đây*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
