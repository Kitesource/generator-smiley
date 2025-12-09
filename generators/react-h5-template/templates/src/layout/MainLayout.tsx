import React from 'react'
import { Outlet } from 'react-router-dom'
import TabBarNavigation from './components/TabBarNavigation'
import './MainLayout.scss'

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <div className="main-content">
        <Outlet />
      </div>
      <div className="main-tabbar">
        <TabBarNavigation />
      </div>
    </div>
  )
}

export default MainLayout
