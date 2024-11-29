import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
const Home = lazy(() => import('@/views/Home'))
const About = lazy(() => import('@/views/About'))
const NotFound = lazy(() => import('@/views/NotFound'))

// 按需引入导致报错：懒加载模式的组件写法，外面需要套一层 Loading 的提示加载组件
const withSuspenseComponent = (comp: JSX.Element) => <React.Suspense fallback={<>Loading</>}>{comp}</React.Suspense>

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home',
        element: withSuspenseComponent(<Home />)
      },
      {
        path: 'about',
        element: withSuspenseComponent(<About />)
      },
      {
        path: '*',
        element: withSuspenseComponent(<NotFound />)
      }
    ]
  }
])

export default router
