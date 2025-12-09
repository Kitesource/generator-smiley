import React from 'react'
import { Card, Typography, Row, Col, Statistic, Progress } from 'antd'
import {
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'

const { Title } = Typography

const Overview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <Title level={2}>仪表盘概览</Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="总用户数"
              value={12345}
              styles={{ content: { color: '#3f8600' } }}
              prefix={<UserOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#3f8600' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="今日新增"
              value={234}
              styles={{ content: { color: '#1890ff' } }}
              prefix={<BarChartOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="活跃用户"
              value={5678}
              styles={{ content: { color: '#cf1322' } }}
              prefix={<LineChartOutlined />}
              suffix={<ArrowDownOutlined style={{ color: '#cf1322' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined">
            <Statistic
              title="转化率"
              value={23.45}
              styles={{ content: { color: '#faad14' } }}
              prefix={<PieChartOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <Card title="用户增长趋势" variant="outlined">
            <div
              className="chart-placeholder"
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
              }}
            >
              <Typography.Text type="secondary">用户增长趋势图表</Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="用户分布" variant="outlined">
            <div
              className="chart-placeholder"
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
              }}
            >
              <Typography.Text type="secondary">用户分布图表</Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="业务完成度" variant="outlined">
            <div className="mb-4">
              <div className="mb-1 flex justify-between">
                <Typography.Text>用户注册</Typography.Text>
                <Typography.Text strong>85%</Typography.Text>
              </div>
              <Progress percent={85} strokeColor="#1890ff" />
            </div>
            <div className="mb-4">
              <div className="mb-1 flex justify-between">
                <Typography.Text>订单处理</Typography.Text>
                <Typography.Text strong>67%</Typography.Text>
              </div>
              <Progress percent={67} strokeColor="#52c41a" />
            </div>
            <div className="mb-4">
              <div className="mb-1 flex justify-between">
                <Typography.Text>数据分析</Typography.Text>
                <Typography.Text strong>92%</Typography.Text>
              </div>
              <Progress percent={92} strokeColor="#faad14" />
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <Typography.Text>系统维护</Typography.Text>
                <Typography.Text strong>45%</Typography.Text>
              </div>
              <Progress percent={45} strokeColor="#f5222d" />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="热门功能" variant="outlined">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div
                  className="feature-item"
                  style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Typography.Text strong className="mb-1 block">
                    用户管理
                  </Typography.Text>
                  <Progress percent={95} strokeColor="#1890ff" size="small" />
                </div>
              </Col>
              <Col span={12}>
                <div
                  className="feature-item"
                  style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Typography.Text strong className="mb-1 block">
                    数据分析
                  </Typography.Text>
                  <Progress percent={88} strokeColor="#52c41a" size="small" />
                </div>
              </Col>
              <Col span={12}>
                <div
                  className="feature-item"
                  style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Typography.Text strong className="mb-1 block">
                    报表生成
                  </Typography.Text>
                  <Progress percent={76} strokeColor="#faad14" size="small" />
                </div>
              </Col>
              <Col span={12}>
                <div
                  className="feature-item"
                  style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
                >
                  <Typography.Text strong className="mb-1 block">
                    系统设置
                  </Typography.Text>
                  <Progress percent={62} strokeColor="#f5222d" size="small" />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Overview
