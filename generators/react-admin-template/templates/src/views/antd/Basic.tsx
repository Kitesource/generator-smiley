import {
  Card,
  Typography,
  Button,
  Space,
  Divider,
  Tag,
  Alert,
  Avatar,
  Badge,
  Progress,
  Switch,
  Slider,
  Radio,
  Checkbox
} from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { Group: RadioGroup } = Radio
const { Group: CheckboxGroup } = Checkbox

const BasicComponents = () => {
  return (
    <div>
      <Title level={2}>基础组件测试</Title>
      <Paragraph>这是一个测试页面，用于验证Ant Design基础组件是否能正常工作。</Paragraph>

      <Card title="按钮组件" className="mb-4">
        <Space wrap>
          <Button type="primary">主按钮</Button>
          <Button type="default">默认按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="text">文本按钮</Button>
          <Button type="link">链接按钮</Button>
        </Space>
        <Divider />
        <Space wrap>
          <Button type="primary" danger>
            危险按钮
          </Button>
          <Button type="primary" loading>
            加载中按钮
          </Button>
          <Button type="primary" disabled>
            禁用按钮
          </Button>
          <Button type="primary" size="large">
            大号按钮
          </Button>
          <Button type="primary" size="small">
            小号按钮
          </Button>
        </Space>
      </Card>

      <Card title="状态组件" className="mb-4">
        <Space vertical style={{ width: '100%' }}>
          <Alert title="成功提示" type="success" />
          <Alert title="信息提示" type="info" />
          <Alert title="警告提示" type="warning" />
          <Alert title="错误提示" type="error" />
        </Space>
      </Card>

      <Card title="数据展示" className="mb-4">
        <Space wrap>
          <Avatar size={64} icon={<UserOutlined />} />
          <Avatar size={48} icon={<UserOutlined />} />
          <Avatar size={32} icon={<UserOutlined />} />
          <Avatar size={24} icon={<UserOutlined />} />
          <Badge count={5}>
            <Avatar icon={<UserOutlined />} />
          </Badge>
          <Badge dot>
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </Space>
        <Divider />
        <Space wrap>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} type="circle" />
          <Progress percent={50} type="dashboard" />
        </Space>
      </Card>

      <Card title="输入组件" className="mb-4">
        <Space vertical style={{ width: '100%' }}>
          <div>
            <Tag color="blue">开关组件</Tag>
            <Space wrap>
              <Switch defaultChecked />
              <Switch disabled />
            </Space>
          </div>
          <div>
            <Tag color="blue">滑块组件</Tag>
            <Slider defaultValue={30} />
            <Slider range defaultValue={[20, 50]} />
          </div>
          <div>
            <Tag color="blue">单选框</Tag>
            <RadioGroup defaultValue="A">
              <Radio value="A">选项 A</Radio>
              <Radio value="B">选项 B</Radio>
              <Radio value="C">选项 C</Radio>
              <Radio value="D">选项 D</Radio>
            </RadioGroup>
          </div>
          <div>
            <Tag color="blue">复选框</Tag>
            <CheckboxGroup defaultValue={['A', 'B']}>
              <Checkbox value="A">选项 A</Checkbox>
              <Checkbox value="B">选项 B</Checkbox>
              <Checkbox value="C">选项 C</Checkbox>
              <Checkbox value="D">选项 D</Checkbox>
            </CheckboxGroup>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default BasicComponents
