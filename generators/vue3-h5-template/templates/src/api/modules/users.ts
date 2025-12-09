import { http } from '../request'
import { UserNS } from '#/modules/users.d'

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword(data: UserNS.LoginReq): Promise<UserNS.LoginResponse> {
  // return http.post(`/login`, {
  //   data,
  // })
  console.log('loginPassword', http, data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'Abcd123456',
        userInfo: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          name: '管理员',
          nickname: 'admin',
          avatar: 'https://img2.baidu.com/it/u=3422422222,2827838422&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        },
      })
    }, 500)
  })
}
