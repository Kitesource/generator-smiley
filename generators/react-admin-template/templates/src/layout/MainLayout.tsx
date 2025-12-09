import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, MenuProps, Button, Switch } from 'antd'
import { UserOutlined, MenuOutlined } from '@ant-design/icons'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'
import { routerConfig } from '@/router'
import { useCommonStore } from '@/store'
import SvgIcon from '@/components/SvgIcon'

// 扩展RouteObject类型，匹配路由配置中的meta信息
interface ExtendedRouteObject {
  path?: string
  index?: boolean
  meta?: {
    label?: string
    i18nKey?: string
    icon?: React.ReactNode
  }
  children?: ExtendedRouteObject[]
}

const MainLayout: React.FC = () => {
  const { Header, Content, Sider } = Layout
  const navigate = useNavigate()
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { t } = useTranslation()

  // 从commonStore获取语言和sider状态
  const { language, toggleLanguage, siderCollapsed, toggleSider, setSiderCollapsed } = useCommonStore()

  // 初始化时同步i18n语言
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  // 将路由配置转换为菜单items，递归处理路径拼接
  const generateMenuItems = (routes: ExtendedRouteObject[], parentPath: string = ''): MenuProps['items'] => {
    return routes.flatMap(route => {
      // 跳过没有meta.label的路由
      if (!route.meta?.label) return []

      // 生成正确的绝对路径
      const currentKey = route.index ? '/' : `${parentPath}/${route.path || ''}`.replace(/\/+/g, '/')

      const item: any = {
        key: currentKey,
        label: t(route.meta.i18nKey || route.meta.label),
        icon: route.meta.icon
      }

      // 处理子路由，传递完整的当前路径作为父路径
      if (route.children && route.children.length > 0) {
        // 对于子路由，父路径应该是当前路由的完整路径
        const childParentPath = route.index ? '' : currentKey
        const children = generateMenuItems(route.children, childParentPath)
        if (children && children.length > 0) {
          item.children = children
        }
      }

      return [item]
    })
  }

  // 从路径计算需要展开的父级菜单key
  const getOpenKeysFromPath = (path: string): string[] => {
    const openKeys: string[] = []
    const pathSegments = path.split('/').filter(segment => segment)

    let currentPath = ''
    for (const segment of pathSegments) {
      currentPath += `/${segment}`
      openKeys.push(currentPath)
    }

    // 移除最后一个，因为它是当前选中的菜单项，不是父级菜单
    openKeys.pop()

    return openKeys
  }

  // 处理路径变化，更新展开菜单
  useEffect(() => {
    const calculatedOpenKeys = getOpenKeysFromPath(location.pathname)
    setOpenKeys(calculatedOpenKeys)
  }, [location.pathname])

  // 根据当前路径生成面包屑数据
  const generateBreadcrumbItems = () => {
    const breadcrumbItems = []
    const path = location.pathname

    // 添加首页面包屑
    breadcrumbItems.push({
      title: t('common.home'),
      href: '/'
    })

    if (path === '/') {
      return breadcrumbItems
    }

    // 从路由配置中查找完整路径对应的路由项
    const findRouteByPath = (routes: any[], targetPath: string, parentPath: string = ''): any => {
      for (const route of routes) {
        const currentPath = route.index ? parentPath : `${parentPath}/${route.path}`.replace(/\/+/g, '/')

        if (currentPath === targetPath) {
          return route
        }

        if (route.children) {
          const found = findRouteByPath(route.children, targetPath, currentPath)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    // 生成完整路径的所有父路径
    const getAllParentPaths = (fullPath: string): string[] => {
      const paths = []
      const segments = fullPath.split('/').filter(segment => segment)

      let currentPath = ''
      for (const segment of segments) {
        currentPath += `/${segment}`
        paths.push(currentPath)
      }

      return paths
    }

    // 获取所有父路径
    const parentPaths = getAllParentPaths(path)

    // 为每个父路径查找对应的路由标签
    for (const parentPath of parentPaths) {
      const route = findRouteByPath(routerConfig[0].children || [], parentPath)
      if (route && route.meta?.label) {
        breadcrumbItems.push({
          title: t(route.meta.i18nKey || route.meta.label),
          href: parentPath
        })
      }
    }

    return breadcrumbItems
  }

  // 从路由配置生成菜单
  const menuItems: MenuProps['items'] = generateMenuItems(routerConfig[0].children || [])

  const menuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key as string)
  }

  // 处理菜单展开/收起事件
  const handleOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys)
  }

  const headerDropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人资料'
    },
    {
      key: 'logout',
      label: '退出登录'
    }
  ]

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider
        collapsible
        collapsed={siderCollapsed}
        onCollapse={value => setSiderCollapsed(value)}
        width={200}
        className="bg-primary-600 border-r text-white"
        style={{
          backgroundColor: '#001529', // 深蓝主题色
          color: '#fff',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100
        }}
      >
        <div
          className="border-primary-700 flex h-16 items-center justify-center border-b"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-center">
            {siderCollapsed ? (
              <SvgIcon name="react" size={24} color="#61dafb" />
            ) : (
              <>
                <SvgIcon name="react" size={24} color="#61dafb" className="mr-2" />
                <span className="text-lg font-semibold text-white">{t('common.adminSystem')}</span>
              </>
            )}
          </div>
        </div>
        <div className="h-full overflow-y-auto">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            items={menuItems}
            onClick={menuClick}
            style={{
              backgroundColor: '#001529', // 与Sider背景色一致
              borderRight: 'none',
              height: '100%'
            }}
            className="h-full"
          />
        </div>
      </Sider>
      <Layout style={{ marginLeft: siderCollapsed ? 80 : 200, transition: 'margin-left 0.3s' }}>
        <Header
          className="flex h-16 items-center justify-between border-b bg-white"
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)', // 添加轻微阴影
            borderBottom: '1px solid #f0f0f0',
            position: 'fixed',
            left: siderCollapsed ? 80 : 200,
            right: 0,
            top: 0,
            zIndex: 99,
            transition: 'left 0.3s',
            padding: '0 20px' // 直接设置padding，覆盖antd默认样式
          }}
        >
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: '#1890ff' }} />}
              onClick={toggleSider}
              className="mr-2"
              style={{ color: '#1890ff' }}
            />
            <Breadcrumb items={generateBreadcrumbItems()} />
          </div>
          <div className="flex items-center gap-4">
            {/* 语言切换 */}
            <div className="flex items-center gap-2">
              <span className="text-sm">EN</span>
              <Switch
                checked={language === 'zh-CN'}
                onChange={toggleLanguage}
                checkedChildren="中"
                unCheckedChildren="EN"
              />
              <span className="text-sm">中</span>
            </div>
            <Dropdown menu={{ items: headerDropdownItems }}>
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content
          className="bg-gray-50 p-4"
          style={{
            backgroundColor: '#f0f2f5',
            marginTop: 64, // 等于Header的高度
            minHeight: 'calc(100vh - 64px)', // 减去Header的高度
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
