import { useState } from 'react'
import { Card, Button, Space, Typography, Divider } from 'antd'

// 导入zustand的store示例
import { useCommonStore } from '@/store/modules/common'
import { useUserStore } from '@/store/modules/users'

const { Title, Paragraph, Text } = Typography

const ZustandDemo = () => {
  // 使用commonStore中的计数器功能
  const count = useCommonStore(state => state.count)
  const increment = useCommonStore(state => state.increment)
  const decrement = useCommonStore(state => state.decrement)
  const reset = useCommonStore(state => state.reset)
  const setCount = useCommonStore(state => state.setCount)
  const [inputCount, setInputCount] = useState(0)

  // 使用user store
  const { users, loading, fetchUsers } = useUserStore()

  const handleSetCount = () => {
    setCount(inputCount)
    setInputCount(0)
  }

  return (
    <div>
      <Title level={2}>Zustand 状态管理演示</Title>
      <Paragraph>Zustand 是一个轻量级的状态管理库，提供了简单直观的 API，无需复杂的配置即可使用。</Paragraph>

      <Space vertical size="large" style={{ width: '100%' }}>
        {/* 计数器示例 */}
        <Card title="基础计数器示例" variant="outlined" hoverable>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Text strong style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>
              {count}
            </Text>
            <Space size="middle">
              <Button type="primary" onClick={decrement}>
                - 递减
              </Button>
              <Button type="default" onClick={reset}>
                重置
              </Button>
              <Button type="primary" onClick={increment}>
                递增 +
              </Button>
            </Space>
            <Divider>自定义设置</Divider>
            <Space size="middle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                type="number"
                value={inputCount}
                onChange={e => setInputCount(Number(e.target.value))}
                style={{
                  width: '100px',
                  padding: '8px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              />
              <Button type="default" onClick={handleSetCount}>
                设置数值
              </Button>
            </Space>
          </div>
        </Card>

        {/* 用户信息示例 */}
        <Card title="用户信息管理" variant="outlined" hoverable>
          <Space vertical size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>用户列表：</Text>
              {loading ? (
                <Text type="secondary">加载中...</Text>
              ) : (
                <div style={{ marginTop: '10px' }}>
                  {users.length > 0 ? (
                    <ul>
                      {users.map(user => (
                        <li key={user.id}>
                          <div>ID：{user.id}</div>
                          <div>姓名：{user.name}</div>
                          <div>邮箱：{user.email}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Text type="secondary">暂无用户数据</Text>
                  )}
                </div>
              )}
            </div>

            <Divider>操作</Divider>

            <Space size="middle" wrap>
              <Button type="primary" onClick={fetchUsers} loading={loading}>
                获取用户列表
              </Button>
            </Space>
          </Space>
        </Card>

        {/* Zustand 特性说明 */}
        <Card title="Zustand 特性" variant="outlined" hoverable>
          <Space vertical size="middle">
            <div>
              <Title level={4}>核心特性</Title>
              <ul>
                <li>轻量级：体积小，无依赖</li>
                <li>简单易用：无需 Provider，直接使用</li>
                <li>TypeScript 支持：完整的类型定义</li>
                <li>支持选择器：只订阅需要的状态</li>
                <li>支持中间件：可扩展功能</li>
                <li>支持异步操作：直接在 store 中处理异步逻辑</li>
              </ul>
            </div>

            <div>
              <Title level={4}>使用场景</Title>
              <ul>
                <li>全局状态管理</li>
                <li>组件间状态共享</li>
                <li>复杂业务逻辑状态管理</li>
                <li>替代 React Context + useReducer</li>
              </ul>
            </div>
          </Space>
        </Card>

        {/* Store 结构说明 */}
        <Card title="Store 结构示例" variant="outlined" hoverable>
          <div>
            <Title level={4}>计数器 Store 结构</Title>
            <pre
              style={{
                background: '#f0f0f0',
                padding: '16px',
                borderRadius: '4px',
                overflowX: 'auto'
              }}
            >
              {`import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (count: number) => void
}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}))`}
            </pre>
          </div>
        </Card>
      </Space>
    </div>
  )
}

export default ZustandDemo
