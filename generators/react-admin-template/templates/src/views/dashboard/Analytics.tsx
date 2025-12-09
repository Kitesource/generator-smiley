import React from 'react'
import { Card, Button, Typography, Row, Col, Table, Select } from 'antd'
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, FilterOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select

const Analytics: React.FC = () => {
  // 模拟数据
  const tableData = [
    { key: '1', name: '用户注册', value: 12345, trend: '+12.5%', status: '上升' },
    { key: '2', name: '页面访问', value: 67890, trend: '+8.3%', status: '上升' },
    { key: '3', name: '订单生成', value: 3456, trend: '-2.1%', status: '下降' },
    { key: '4', name: '支付成功', value: 2987, trend: '+5.6%', status: '上升' },
    { key: '5', name: '退货申请', value: 123, trend: '-1.8%', status: '下降' }
  ]

  const columns = [
    { title: '指标名称', dataIndex: 'name', key: 'name' },
    { title: '数值', dataIndex: 'value', key: 'value' },
    { title: '趋势', dataIndex: 'trend', key: 'trend' },
    { title: '状态', dataIndex: 'status', key: 'status' }
  ]

  return (
    <div className="dashboard-analytics">
      <div className="mb-4 flex items-center justify-between">
        <Title level={2}>数据分析</Title>
        <div className="flex gap-2">
          <Select defaultValue="month" style={{ width: 120 }}>
            <Option value="day">今日</Option>
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
            <Option value="year">本年</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">全部数据</Option>
            <Option value="user">用户数据</Option>
            <Option value="order">订单数据</Option>
            <Option value="sales">销售数据</Option>
          </Select>
          <Button type="primary" icon={<FilterOutlined />}>
            筛选
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <Card title="用户增长趋势" variant="outlined" extra={<a href="#">查看详情</a>}>
            <div
              className="chart-placeholder"
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <LineChartOutlined style={{ fontSize: '48px', color: '#1890ff', opacity: 0.5 }} />
              <Typography.Text type="secondary" className="ml-2">
                用户增长趋势图
              </Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="销售数据分析" variant="outlined" extra={<a href="#">查看详情</a>}>
            <div
              className="chart-placeholder"
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a', opacity: 0.5 }} />
              <Typography.Text type="secondary" className="ml-2">
                销售数据分析图
              </Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col span={8}>
          <Card title="用户分布" variant="outlined" extra={<a href="#">查看详情</a>}>
            <div
              className="chart-placeholder"
              style={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <PieChartOutlined style={{ fontSize: '40px', color: '#faad14', opacity: 0.5 }} />
              <Typography.Text type="secondary" className="ml-2">
                用户分布图
              </Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="设备类型占比" variant="outlined" extra={<a href="#">查看详情</a>}>
            <div
              className="chart-placeholder"
              style={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <PieChartOutlined style={{ fontSize: '40px', color: '#f5222d', opacity: 0.5 }} />
              <Typography.Text type="secondary" className="ml-2">
                设备类型占比图
              </Typography.Text>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="渠道来源分析" variant="outlined" extra={<a href="#">查看详情</a>}>
            <div
              className="chart-placeholder"
              style={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <PieChartOutlined style={{ fontSize: '40px', color: '#722ed1', opacity: 0.5 }} />
              <Typography.Text type="secondary" className="ml-2">
                渠道来源分析图
              </Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="详细数据列表" variant="outlined" extra={<a href="#">导出数据</a>}>
        <Table columns={columns} dataSource={tableData} pagination={false} />
      </Card>
    </div>
  )
}

export default Analytics
