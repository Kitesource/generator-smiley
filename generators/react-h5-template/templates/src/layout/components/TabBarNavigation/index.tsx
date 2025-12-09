import React, { useState } from 'react'
import { TabBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import './TabBarNavigation.scss'

const TabBarNavigation: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('')
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路径设置激活的标签
  React.useEffect(() => {
    const path = location.pathname
    if (path === '/' || path.includes('/home')) {
      setActiveKey('home')
    } else if (path.includes('/todo')) {
      setActiveKey('todo')
    } else if (path.includes('/mine')) {
      setActiveKey('mine')
    }
  }, [location.pathname])

  // 处理标签切换
  const handleTabChange = (key: string) => {
    setActiveKey(key)
    switch (key) {
      case 'home':
        navigate('/')
        break
      case 'todo':
        navigate('/todo')
        break
      case 'mine':
        navigate('/mine')
        break
      default:
        navigate('/')
    }
  }

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />
    },
    {
      key: 'todo',
      title: '待办',
      icon: <UnorderedListOutline />
    },
    {
      key: 'mine',
      title: '我的',
      icon: <UserOutline />
    }
  ]

  return (
    <div className="tabbar-navigation">
      <TabBar activeKey={activeKey} onChange={handleTabChange}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}></TabBar.Item>
        ))}
      </TabBar>
    </div>
  )
}

export default TabBarNavigation
