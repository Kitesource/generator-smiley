export namespace CommonNS {
  export enum Language {
    EN = 'en',
    ZH = 'zh-CN'
  }
  export enum ErrorRouter {
    FORBIDDEN = 'Forbbiden',
    NOTFOUND = 'NotFound'
  }

  export interface Option {
    label: string
    value: string
  }
}

// 为虚拟模块添加类型声明
declare module 'virtual:svg-icons-register'
