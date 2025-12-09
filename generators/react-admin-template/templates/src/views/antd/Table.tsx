import React from 'react'
import { Card, Typography, Table, Button, Space, Tag, Modal, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

// 模拟表格数据
const generateRandomData = (count: number) => {
  const data: any[] = []
  const statuses = ['active', 'inactive', 'pending', 'disabled']
  const types = ['user', 'admin', 'guest', 'editor']

  for (let i = 0; i < count; i++) {
    data.push({
      key: i + 1,
      name: `用户${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: `user${i + 1}@example.com`,
      phone: `138${Math.floor(Math.random() * 100000000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      createdAt: new Date(Date.now() - Math.random() * 31536000000).toLocaleDateString()
    })
  }

  return data
}

const TableComponents = () => {
  const [dataSource] = React.useState(generateRandomData(100))
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('SelectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0

  // 状态标签映射
  const statusTagMap: Record<string, { color: string; text: string }> = {
    active: { color: 'green', text: '激活' },
    inactive: { color: 'red', text: '停用' },
    pending: { color: 'orange', text: '待审核' },
    disabled: { color: 'gray', text: '已禁用' }
  }

  // 类型标签映射
  const typeTagMap: Record<string, { color: string; text: string }> = {
    user: { color: 'blue', text: '普通用户' },
    admin: { color: 'red', text: '管理员' },
    guest: { color: 'gray', text: '访客' },
    editor: { color: 'purple', text: '编辑' }
  }

  const columns: any[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      ellipsis: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: any, b: any) => a.age - b.age,
      width: 100,
      align: 'center' as const
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      align: 'center' as const
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center' as const,
      filters: [
        { text: '激活', value: 'active' },
        { text: '停用', value: 'inactive' },
        { text: '待审核', value: 'pending' },
        { text: '已禁用', value: 'disabled' }
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => {
        const tagInfo = statusTagMap[status] || { color: 'gray', text: status }
        return <Tag color={tagInfo.color}>{tagInfo.text}</Tag>
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center' as const,
      filters: [
        { text: '普通用户', value: 'user' },
        { text: '管理员', value: 'admin' },
        { text: '访客', value: 'guest' },
        { text: '编辑', value: 'editor' }
      ],
      onFilter: (value: any, record: any) => record.type === value,
      render: (type: string) => {
        const tagInfo = typeTagMap[type] || { color: 'gray', text: type }
        return <Tag color={tagInfo.color}>{tagInfo.text}</Tag>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      align: 'center' as const
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => console.log('Delete', record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  // 分页配置
  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: number, range: [number, number]) => {
      return `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
    },
    pageSizeOptions: ['10', '20', '50', '100']
  }

  return (
    <div>
      <Title level={2}>表格组件测试</Title>
      <Paragraph>这是一个测试页面，用于验证Ant Design表格组件是否能正常工作。</Paragraph>

      <Card title="基础表格" className="mb-4">
        <Space className="mb-4">
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            添加用户
          </Button>
          <Space>
            <span>{hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}</span>
            {hasSelected && <Button onClick={() => setSelectedRowKeys([])}>取消选择</Button>}
          </Space>
        </Space>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={paginationConfig}
          scroll={{ x: 1200 }}
          bordered
          size="middle"
        />
      </Card>

      <Card title="表格功能演示">
        <Space vertical size="large" style={{ width: '100%' }}>
          <div>
            <Paragraph strong>表格功能说明：</Paragraph>
            <ul>
              <li>支持行选择（多选）</li>
              <li>支持排序（点击列标题）</li>
              <li>支持筛选（点击筛选图标）</li>
              <li>支持分页（可调整每页显示数量）</li>
              <li>支持水平滚动（当列数较多时）</li>
              <li>支持行操作（查看、编辑、删除）</li>
              <li>支持数据状态标签显示</li>
            </ul>
          </div>

          <div>
            <Paragraph strong>表格特性：</Paragraph>
            <ul>
              <li>自适应宽度</li>
              <li>响应式设计</li>
              <li>支持自定义列</li>
              <li>支持自定义渲染</li>
              <li>支持行展开</li>
              <li>支持树形数据</li>
            </ul>
          </div>
        </Space>
      </Card>

      <Modal title="添加用户" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <p>这是一个添加用户的模态框，实际项目中会包含表单组件。</p>
        <Space className="mt-4" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" onClick={handleCancel}>
            确定
          </Button>
        </Space>
      </Modal>
    </div>
  )
}

export default TableComponents
