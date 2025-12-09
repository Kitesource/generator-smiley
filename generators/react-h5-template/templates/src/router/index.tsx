import React, { JSX, lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import MainLayout from '@/layout/MainLayout'
const Home = lazy(() => import('@/views/home'))
const Todo = lazy(() => import('@/views/todo'))
const Mine = lazy(() => import('@/views/mine'))
const NotFound = lazy(() => import('@/views/auth/NotFound'))
const Forbidden = lazy(() => import('@/views/auth/Forbidden'))

// 按需引入导致报错：懒加载模式的组件写法，外面需要套一层 Loading 的提示加载组件
const withSuspenseComponent = (comp: JSX.Element) => <React.Suspense fallback={<>Loading</>}>{comp}</React.Suspense>

// 扩展RouteObject类型，添加meta信息，使用递归方式
interface RouteConfig extends Omit<RouteObject, 'children'> {
  meta?: {
    label?: string
    i18nKey?: string
    icon?: React.ReactNode
  }
  children?: RouteConfig[]
}

const routerConfig: RouteConfig[] = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspenseComponent(<Home />),
        meta: {
          label: '首页',
          i18nKey: 'common.home'
        }
      },
      {
        path: 'todo',
        element: withSuspenseComponent(<Todo />),
        meta: {
          label: '待办',
          i18nKey: 'common.todo'
        }
      },
      {
        path: 'mine',
        element: withSuspenseComponent(<Mine />),
        meta: {
          label: '我的',
          i18nKey: 'common.mine'
        }
      },
      {
        path: '403',
        element: withSuspenseComponent(<Forbidden />),
        meta: {
          label: '403页面',
          i18nKey: 'common.forbidden'
        }
      },
      {
        path: '*',
        element: withSuspenseComponent(<NotFound />),
        meta: {
          label: '404页面',
          i18nKey: 'common.notFound'
        }
      }
    ]
  }
]

const router = createBrowserRouter(routerConfig as RouteObject[])

export default router
export { routerConfig }
