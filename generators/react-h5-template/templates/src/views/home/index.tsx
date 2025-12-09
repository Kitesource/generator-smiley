import React from 'react'
import { Card, Grid, Swiper, NoticeBar, Space } from 'antd-mobile'
import { AntOutline, FireFill, GiftOutline, HeartOutline } from 'antd-mobile-icons'
import './index.scss'

const Home: React.FC = () => {
  // 轮播图数据
  const swiperItems = [
    {
      id: 1,
      title: '欢迎使用 React H5 模板',
      color: '#ace0ff'
    },
    {
      id: 2,
      title: '基于 antd-mobile 开发',
      color: '#bcffbd'
    },
    {
      id: 3,
      title: '支持移动端适配',
      color: '#e6beb7'
    }
  ]

  // 功能网格数据
  const gridItems = [
    {
      id: 1,
      title: '组件库',
      icon: <AntOutline />,
      color: '#1677ff'
    },
    {
      id: 2,
      title: '热门推荐',
      icon: <FireFill />,
      color: '#ff6900'
    },
    {
      id: 3,
      title: '优惠活动',
      icon: <GiftOutline />,
      color: '#ff3b30'
    },
    {
      id: 4,
      title: '我的收藏',
      icon: <HeartOutline />,
      color: '#ff9500'
    }
  ]

  return (
    <div className="home-container">
      {/* 轮播图 */}
      <div className="swiper-container">
        <Swiper autoplay loop>
          {swiperItems.map(item => (
            <Swiper.Item key={item.id}>
              <div className="swiper-item" style={{ background: item.color }}>
                {item.title}
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* 通知栏 */}
      <div className="notice-container">
        <NoticeBar content="欢迎使用 React H5 模板，这是一个基于 antd-mobile 的移动端应用模板" color="alert" />
      </div>

      {/* 功能网格 */}
      <div className="grid-container">
        <Card title="常用功能">
          <Grid columns={4} gap={12}>
            {gridItems.map(item => (
              <Grid.Item key={item.id}>
                <div className="function-item">
                  <div className="function-icon" style={{ background: `${item.color}20` }}>
                    <div style={{ color: item.color, fontSize: 24 }}>{item.icon}</div>
                  </div>
                  <span className="function-title">{item.title}</span>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </Card>
      </div>

      {/* 推荐内容 */}
      <div>
        <Card title="推荐内容">
          <Space direction="vertical" block>
            <Card>
              <div className="recommend-item">
                <div className="recommend-icon recommend-icon-blue">
                  <AntOutline style={{ color: '#1677ff', fontSize: 24 }} />
                </div>
                <div className="recommend-content">
                  <div className="recommend-title">React 开发指南</div>
                  <div className="recommend-desc">学习 React 开发的最佳实践</div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="recommend-item">
                <div className="recommend-icon recommend-icon-green">
                  <FireFill style={{ color: '#ff6900', fontSize: 24 }} />
                </div>
                <div className="recommend-content">
                  <div className="recommend-title">移动端适配方案</div>
                  <div className="recommend-desc">px 转 rem 的最佳实践</div>
                </div>
              </div>
            </Card>
          </Space>
        </Card>
      </div>
    </div>
  )
}

export default Home
