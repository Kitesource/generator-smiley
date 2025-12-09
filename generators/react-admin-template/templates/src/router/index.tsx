import React, { JSX, lazy } from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import {
  DatabaseOutlined,
  HomeOutlined,
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  ToolOutlined,
  FormOutlined,
  TableOutlined,
  AreaChartOutlined,
  CodeOutlined,
  StopOutlined,
  ExceptionOutlined
} from '@ant-design/icons'

import MainLayout from '@/layout/MainLayout'
const Welcome = lazy(() => import('@/views/Welcome'))
const Dashboard = lazy(() => import('@/views/dashboard'))
const Overview = lazy(() => import('@/views/dashboard/Overview'))
const Analytics = lazy(() => import('@/views/dashboard/Analytics'))
const TestAntdLayout = lazy(() => import('@/views/antd'))
const BasicComponents = lazy(() => import('@/views/antd/Basic'))
const FormComponents = lazy(() => import('@/views/antd/Form'))
const TableComponents = lazy(() => import('@/views/antd/Table'))
const ChartComponents = lazy(() => import('@/views/antd/Chart'))
const StateLayout = lazy(() => import('@/views/state/layout'))
const StateHooks = lazy(() => import('@/views/state/Hooks'))
const StateZustand = lazy(() => import('@/views/state/Zustand'))
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
        element: withSuspenseComponent(<Welcome />),
        meta: {
          label: '欢迎页',
          i18nKey: 'common.welcome',
          icon: <HomeOutlined />
        }
      },
      {
        path: 'dashboard',
        element: withSuspenseComponent(<Dashboard />),
        meta: {
          label: '仪表盘',
          i18nKey: 'common.dashboard',
          icon: <DashboardOutlined />
        },
        children: [
          // 默认重定向到概览页
          {
            index: true,
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: withSuspenseComponent(<Overview />),
            meta: {
              label: '概览',
              i18nKey: 'common.overview',
              icon: <BarChartOutlined />
            }
          },
          {
            path: 'analytics',
            element: withSuspenseComponent(<Analytics />),
            meta: {
              label: '数据分析',
              i18nKey: 'common.analytics',
              icon: <LineChartOutlined />
            }
          }
        ]
      },
      {
        path: 'antd',
        element: withSuspenseComponent(<TestAntdLayout />),
        meta: {
          label: 'Antd',
          i18nKey: 'common.antd',
          icon: <AppstoreOutlined />
        },
        children: [
          {
            index: true,
            element: <Navigate to="basic" replace />
          },
          {
            path: 'basic',
            element: withSuspenseComponent(<BasicComponents />),
            meta: {
              label: '基础组件',
              i18nKey: 'common.basic',
              icon: <ToolOutlined />
            }
          },
          {
            path: 'form',
            element: withSuspenseComponent(<FormComponents />),
            meta: {
              label: '表单组件',
              i18nKey: 'common.form',
              icon: <FormOutlined />
            }
          },
          {
            path: 'table',
            element: withSuspenseComponent(<TableComponents />),
            meta: {
              label: '表格组件',
              i18nKey: 'common.table',
              icon: <TableOutlined />
            }
          },
          {
            path: 'chart',
            element: withSuspenseComponent(<ChartComponents />),
            meta: {
              label: '图表组件',
              i18nKey: 'common.chart',
              icon: <AreaChartOutlined />
            }
          }
        ]
      },
      {
        path: 'state',
        element: withSuspenseComponent(<StateLayout />),
        meta: {
          label: '状态管理',
          i18nKey: 'common.state',
          icon: <DatabaseOutlined />
        },
        children: [
          {
            index: true,
            element: <Navigate to="zustand" replace />
          },
          {
            path: 'zustand',
            element: withSuspenseComponent(<StateZustand />),
            meta: {
              label: 'zustand',
              i18nKey: 'common.zustand',
              icon: <CodeOutlined />
            }
          },
          {
            path: 'hooks',
            element: withSuspenseComponent(<StateHooks />),
            meta: {
              label: 'hooks demo',
              i18nKey: 'common.hooksDemo',
              icon: <CodeOutlined />
            }
          }
        ]
      },
      {
        path: '403',
        element: withSuspenseComponent(<Forbidden />),
        meta: {
          label: '403页面',
          i18nKey: 'common.forbidden',
          icon: <StopOutlined />
        }
      },
      {
        path: '*',
        element: withSuspenseComponent(<NotFound />),
        meta: {
          label: '404页面',
          i18nKey: 'common.notFound',
          icon: <ExceptionOutlined />
        }
      }
    ]
  }
]

const router = createBrowserRouter(routerConfig as RouteObject[])

export default router
export { routerConfig }
