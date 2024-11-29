import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Layout } from 'antd'

const MainLayout: React.FC = () => {
  const { Header, Content, Footer } = Layout
  const navigate = useNavigate()
  const location = useLocation()

  const go404 = () => {
    navigate('/404')
  }

  return (
    <Layout className="flex flex-col overflow-auto h-screen">
      <Header className="flex items-center justify-between h-16 px-4 text-white">
        <div>
          <Link to="/home" className={`px-4 ${location.pathname === '/home' ? 'text-blue-700' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`px-4 ${location.pathname === '/about' ? 'text-blue-700' : ''}`}>
            About
          </Link>
        </div>
        <Button onClick={go404}>go 404</Button>
      </Header>
      <Content className="flex-1">
        <Outlet />
      </Content>
      <Footer className="h-16 px-4">Footer</Footer>
    </Layout>
  )
}

export default MainLayout
