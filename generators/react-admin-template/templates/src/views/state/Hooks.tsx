import { useState, useCallback } from 'react'
import { Card, Button, Space, Typography, Input } from 'antd'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useThrottle } from '@/hooks/useThrottle'

const { Title, Paragraph, Text } = Typography

const HooksDemo = () => {
  // 防抖hook示例
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)

  // 本地存储hook示例
  const [savedValue, setSavedValue] = useLocalStorage('zustand-demo-saved-value', '初始值')

  return (
    <div>
      <Title level={2}>自定义 Hooks 示例</Title>
      <Paragraph>展示常用自定义 Hooks 的使用方法，包括防抖、本地存储和节流。</Paragraph>

      <Space vertical size="large" style={{ width: '100%' }}>
        {/* 防抖 Hook 示例 */}
        <Card title="useDebounce - 防抖 Hook" variant="outlined" hoverable>
          <Paragraph>输入内容后 500ms 才会更新防抖后的值，常用于搜索输入等场景</Paragraph>
          <Space vertical size="middle" style={{ width: '100%', marginTop: '16px' }}>
            <div>
              <Text strong>搜索输入：</Text>
              <Input
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="输入搜索内容"
                style={{ marginTop: '8px', width: '100%' }}
              />
            </div>
            <div style={{ background: '#f0f0f0', padding: '16px', borderRadius: '4px' }}>
              <Text strong>防抖后的值：</Text>
              <Text style={{ marginLeft: '8px' }}>{debouncedSearchText}</Text>
            </div>
          </Space>
        </Card>

        {/* 本地存储 Hook 示例 */}
        <Card title="useLocalStorage - 本地存储 Hook" variant="outlined" hoverable>
          <Paragraph>将值持久化到浏览器本地存储，页面刷新后依然保留</Paragraph>
          <Space vertical size="middle" style={{ width: '100%', marginTop: '16px' }}>
            <div>
              <Text strong>本地存储值：</Text>
              <Input
                value={savedValue}
                onChange={e => setSavedValue(e.target.value)}
                placeholder="输入要保存的值"
                style={{ marginTop: '8px', width: '100%' }}
              />
            </div>
            <div style={{ background: '#f0f0f0', padding: '16px', borderRadius: '4px' }}>
              <Text strong>当前存储的值：</Text>
              <Text style={{ marginLeft: '8px' }}>{savedValue}</Text>
              <Button danger style={{ marginLeft: '16px' }} onClick={() => setSavedValue('初始值')}>
                重置
              </Button>
            </div>
            <div>
              <Text type="secondary">提示：刷新页面后，该值依然会保留</Text>
            </div>
          </Space>
        </Card>

        {/* 节流 Hook 示例 */}
        <Card title="useThrottle - 节流 Hook" variant="outlined" hoverable>
          <ThrottleDemo />
        </Card>
      </Space>
    </div>
  )
}

// 节流 Hook 示例组件
const ThrottleDemo = () => {
  // 计数器状态
  const [count, setCount] = useState(0)

  // 使用节流hook，限制每秒最多执行一次
  const throttledCount = useThrottle(count, 1000)

  // 点击增加计数
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  // 连续点击次数统计
  const [clickCount, setClickCount] = useState(0)

  const handleClick = useCallback(() => {
    setClickCount(prev => prev + 1)
    handleIncrement()
  }, [handleIncrement])

  return (
    <Space vertical size="middle" style={{ width: '100%' }}>
      <Paragraph>节流 Hook 用于限制函数的执行频率，确保在指定时间内最多执行一次。</Paragraph>
      <div style={{ textAlign: 'center' }}>
        <Text strong style={{ fontSize: 24 }}>
          点击次数：{clickCount}
        </Text>
        <br />
        <Text type="secondary">节流后的值：{throttledCount}</Text>
        <p style={{ marginTop: 8, fontSize: 14, color: '#666' }}>实际点击次数不受限制，但节流后的值每秒最多更新一次</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={handleClick} size="large" style={{ marginRight: 8 }}>
          快速点击我
        </Button>
        <Button
          danger
          onClick={() => {
            setCount(0)
            setClickCount(0)
          }}
          size="large"
        >
          重置
        </Button>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', padding: 16, borderRadius: 4 }}>
        <Title level={5}>使用场景</Title>
        <ul>
          <li>按钮点击防抖</li>
          <li>窗口 resize 事件</li>
          <li>滚动事件</li>
          <li>鼠标移动事件</li>
        </ul>
      </div>
    </Space>
  )
}

export default HooksDemo
