import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/Apis'
function AccountVerification() {
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])

  // kiểm tra xem đã xác thực hay chưa
  const [verifield, setVerified] = useState(false)

  // Gọi API để xác thực tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])
  // Nếu url có vấn đề thì đá về trang 404
  if (!email || !token) {
    return <Navigate to="/404" />
  }
  // Nếu chưa verify thì hiển thị loading
  if (!verifield) {
    return <PageLoadingSpinner caption='Verifying your account...'/>
  }

  // Nếu verify thành công thì hiển thị thông báo thành công và chuyên hướng về trang login cùng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}
export default AccountVerification