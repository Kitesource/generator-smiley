import axios from 'axios'

interface ResetPasswordReq {
  userId: string
  password: string
  confirmPassword: string
}
export const resetPassword = (data: ResetPasswordReq) =>
  axios.post('/user/update_password', data)
