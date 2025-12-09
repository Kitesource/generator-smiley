import React, { useState } from 'react'
import { Card, List, Button, Input, Checkbox, Space, Tag, Empty } from 'antd-mobile'
import { AddOutline, DeleteOutline } from 'antd-mobile-icons'
import './index.scss'

interface TodoItem {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  createdAt: string
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      title: '学习 React 开发',
      completed: false,
      priority: 'high',
      createdAt: '2023-12-01'
    },
    {
      id: 2,
      title: '完成项目文档',
      completed: false,
      priority: 'medium',
      createdAt: '2023-12-02'
    },
    {
      id: 3,
      title: '代码审查',
      completed: true,
      priority: 'low',
      createdAt: '2023-12-03'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // 添加待办事项
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: inputValue,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTodos([newTodo, ...todos])
      setInputValue('')
    }
  }

  // 切换待办事项状态
  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // 删除待办事项
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 获取优先级标签颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      case 'low':
        return 'default'
      default:
        return 'default'
    }
  }

  // 获取优先度文本
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高'
      case 'medium':
        return '中'
      case 'low':
        return '低'
      default:
        return '中'
    }
  }

  // 过滤待办事项
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // 统计待办事项
  const activeTodoCount = todos.filter(todo => !todo.completed).length
  const completedTodoCount = todos.filter(todo => todo.completed).length

  return (
    <div className="todo-container">
      <Card title="待办事项" className="todo-card">
        {/* 添加待办事项 */}
        <div className="todo-input-container">
          <Input
            placeholder="添加新的待办事项"
            value={inputValue}
            onChange={value => setInputValue(value)}
            className="todo-input"
          />
          <Button color="primary" fill="solid" size="small" onClick={handleAddTodo} className="todo-add-btn">
            <AddOutline />
            添加
          </Button>
        </div>

        {/* 过滤器 */}
        <div className="todo-filters">
          <Button
            color={filter === 'all' ? 'primary' : 'default'}
            fill={filter === 'all' ? 'solid' : 'outline'}
            size="small"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            全部 ({todos.length})
          </Button>
          <Button
            color={filter === 'active' ? 'primary' : 'default'}
            fill={filter === 'active' ? 'solid' : 'outline'}
            size="small"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            待完成 ({activeTodoCount})
          </Button>
          <Button
            color={filter === 'completed' ? 'primary' : 'default'}
            fill={filter === 'completed' ? 'solid' : 'outline'}
            size="small"
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            已完成 ({completedTodoCount})
          </Button>
        </div>

        {/* 待办事项列表 */}
        {filteredTodos.length > 0 ? (
          <List>
            {filteredTodos.map(todo => (
              <List.Item
                key={todo.id}
                prefix={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                }
                extra={
                  <Button
                    color="danger"
                    fill="none"
                    size="small"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="todo-delete-btn"
                  >
                    <DeleteOutline />
                  </Button>
                }
                className={todo.completed ? 'todo-item completed' : 'todo-item'}
              >
                <div className={todo.completed ? 'todo-content completed' : 'todo-content'}>
                  <div className="todo-title">{todo.title}</div>
                  <Space>
                    <Tag color={getPriorityColor(todo.priority)} className="todo-tag">
                      {getPriorityText(todo.priority)}
                    </Tag>
                    <span className="todo-date">{todo.createdAt}</span>
                  </Space>
                </div>
              </List.Item>
            ))}
          </List>
        ) : (
          <Empty description="暂无待办事项" />
        )}
      </Card>
    </div>
  )
}

export default Todo
