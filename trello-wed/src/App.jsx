import Board from './pages/Boards/_id'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
function App() {

  return (
    <Routes>
      <Route path='/' element={
        <Navigate to={'/boards/67e23e3ef43f67ae0a1d8964'} replace={true} /> // replace là xóa đi dấu vết chuyển hướng để tánh user back lại
      } />
      <Route path="/boards/:boardId" element={<Board />} />

      {/*các trường hợp route không hợp lệ nó sẽ nhảy xuống đây*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
