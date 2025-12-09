import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Content } = Layout

const Dashboard: React.FC = () => {
  return (
    <Content>
      <Outlet />
    </Content>
  )
}

export default Dashboard
