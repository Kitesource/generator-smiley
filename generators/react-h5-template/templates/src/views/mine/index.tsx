import React from 'react'
import { Card, List, Avatar, Button } from 'antd-mobile'
import {
  UserOutline,
  SetOutline,
  QuestionCircleOutline,
  HeartOutline,
  FileOutline,
  MessageOutline,
  BellOutline,
  CheckShieldOutline,
  RightOutline,
  GiftOutline,
  StarOutline,
  UnorderedListOutline
} from 'antd-mobile-icons'
import './index.scss'

const Mine: React.FC = () => {
  // 用户信息
  const userInfo = {
    name: '用户名',
    avatar: '',
    description: '这是一个基于 antd-mobile 的 H5 模板'
  }

  // 功能列表数据
  const functionList = [
    {
      id: 1,
      title: '我的收藏',
      icon: <HeartOutline />,
      arrow: true
    },
    {
      id: 2,
      title: '我的文件',
      icon: <FileOutline />,
      arrow: true
    },
    {
      id: 3,
      title: '消息通知',
      icon: <BellOutline />,
      arrow: true,
      badge: '3'
    },
    {
      id: 4,
      title: '意见反馈',
      icon: <MessageOutline />,
      arrow: true
    }
  ]

  // 设置列表数据
  const settingList = [
    {
      id: 1,
      title: '账号与安全',
      icon: <CheckShieldOutline />,
      arrow: true
    },
    {
      id: 2,
      title: '通用设置',
      icon: <SetOutline />,
      arrow: true
    },
    {
      id: 3,
      title: '帮助与反馈',
      icon: <QuestionCircleOutline />,
      arrow: true
    }
  ]

  return (
    <div className="mine-container">
      <div className="mine-content">
        {/* 用户信息卡片 */}
        <Card className="user-card">
          <div className="user-info">
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80"
              fit="cover"
              className="user-avatar"
            />
            <div className="user-details">
              <div className="user-name">用户昵称</div>
              <div className="user-id">ID: 123456789</div>
            </div>
            <Button color="primary" fill="outline" size="small" className="user-edit-btn">
              编辑
            </Button>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <div className="stat-value">128</div>
              <div className="stat-label">关注</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">256</div>
              <div className="stat-label">粉丝</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">32</div>
              <div className="stat-label">动态</div>
            </div>
          </div>
        </Card>

        {/* 设置列表 */}
        <Card title="设置">
          <List>
            <List.Item prefix={<UserOutline className="list-icon" />} extra={<RightOutline className="list-arrow" />}>
              账号管理
            </List.Item>
            <List.Item prefix={<SetOutline className="list-icon" />} extra={<RightOutline className="list-arrow" />}>
              系统设置
            </List.Item>
            <List.Item
              prefix={<UnorderedListOutline className="list-icon" />}
              extra={<RightOutline className="list-arrow" />}
            >
              隐私设置
            </List.Item>
            <List.Item
              prefix={<QuestionCircleOutline className="list-icon" />}
              extra={<RightOutline className="list-arrow" />}
            >
              帮助与反馈
            </List.Item>
          </List>
        </Card>

        {/* 退出登录按钮 */}
        <Button color="danger" fill="solid" block className="logout-btn">
          退出登录
        </Button>
      </div>
    </div>
  )
}

export default Mine
