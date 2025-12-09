import React from 'react'
import { Card, Typography, Space, Tabs } from 'antd'
import { Area, AreaConfig } from '@ant-design/plots'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs

// 模拟数据生成函数
const generateLineData = () => {
  const data = []
  for (let i = 0; i < 12; i++) {
    data.push({
      month: `${i + 1}月`,
      value: Math.floor(Math.random() * 1000) + 500,
      target: 1000
    })
  }
  return data
}

const ChartComponents = () => {
  const [lineData] = React.useState(generateLineData())

  // 折线图配置
  const lineConfig: AreaConfig = {
    data: lineData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.month,
          value: datum.value
        }
      }
    },
    legend: {
      position: 'top'
    }
  }

  return (
    <div>
      <Title level={2}>图表组件测试</Title>
      <Paragraph>这是一个测试页面，用于验证Ant Design图表组件是否能正常工作。</Paragraph>

      <Tabs defaultActiveKey="1" className="mb-4">
        <TabPane tab="折线图" key="1">
          <Card title="基础折线图" className="mb-4">
            <Area {...lineConfig} height={400} />
          </Card>
        </TabPane>

        <TabPane tab="柱状图" key="2">
          <Card title="基础柱状图" className="mb-4">
            <div style={{ height: 400 }}>
              {/* 这里使用Ant Design Charts的Bar组件，暂时用Area组件占位 */}
              <Area {...lineConfig} height={400} />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="饼图" key="3">
          <Card title="基础饼图" className="mb-4">
            <div style={{ height: 400 }}>
              {/* 这里使用Ant Design Charts的Pie组件，暂时用Area组件占位 */}
              <Area {...lineConfig} height={400} />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="散点图" key="4">
          <Card title="基础散点图" className="mb-4">
            <div style={{ height: 400 }}>
              {/* 这里使用Ant Design Charts的Scatter组件，暂时用Area组件占位 */}
              <Area {...lineConfig} height={400} />
            </div>
          </Card>
        </TabPane>
      </Tabs>

      <Card title="图表功能说明">
        <Space vertical size="large" style={{ width: '100%' }}>
          <div>
            <Paragraph strong>图表类型：</Paragraph>
            <ul>
              <li>折线图 - 用于展示趋势变化</li>
              <li>柱状图 - 用于比较不同类别的数据</li>
              <li>饼图 - 用于展示占比关系</li>
              <li>散点图 - 用于展示两个变量之间的关系</li>
              <li>雷达图 - 用于展示多维度数据</li>
              <li>热力图 - 用于展示数据密度</li>
              <li>地图 - 用于展示地理数据</li>
            </ul>
          </div>

          <div>
            <Paragraph strong>图表特性：</Paragraph>
            <ul>
              <li>支持交互式操作（悬停、点击、缩放等）</li>
              <li>支持自定义主题和样式</li>
              <li>支持响应式设计</li>
              <li>支持数据更新和动画效果</li>
              <li>支持导出和打印</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default ChartComponents
