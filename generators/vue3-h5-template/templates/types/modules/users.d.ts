export namespace UserNS {
  export interface UserInfo {
    username: string
    email: string
    avatar: string
    name: string
    nickname: string
    id: number
  }
  export interface LoginReq {
    username: string
    password: string
  }
  export interface LoginResponse {
    token: string
    userInfo: UserInfo
  }
}
