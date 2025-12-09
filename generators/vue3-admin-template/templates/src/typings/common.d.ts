export namespace CommonNS {
  export enum Language {
    EN = 'en',
    ZH = 'zh-CN',
  }

  export enum ErrorRouter {
    FORBIDDEN = 'Forbbiden',
    NOTFOUND = 'NotFound',
  }

  // 菜单项接口
  export interface MenuItem {
    id: string
    name: string
    path?: string
    icon?: string
    children?: MenuItem[]
    meta?: {
      title?: string
      requireAuth?: boolean
      hidden?: boolean
    }
  }

  // 用户信息接口
  export interface UserInfo {
    id: string
    username: string
    avatar?: string
    email?: string
    role?: string
  }
}
