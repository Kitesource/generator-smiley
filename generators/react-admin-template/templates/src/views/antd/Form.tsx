import {
  Card,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Checkbox,
  Radio,
  Slider,
  Switch,
  Space,
  Divider
} from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { Option } = Select
const { RangePicker, TimePicker } = DatePicker
const { TextArea } = Input

const FormComponents = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <div>
      <Title level={2}>表单组件测试</Title>
      <Paragraph>这是一个测试页面，用于验证Ant Design表单组件是否能正常工作。</Paragraph>

      <Card title="基础表单" className="mb-4">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!', type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号!', pattern: /^1[3-9]\d{9}$/ }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item label="记住密码" name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="高级表单" className="mb-4">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ size: 'default' }}>
          <Form.Item label="选择器">
            <Select placeholder="请选择" style={{ width: 200 }}>
              <Option value="option1">选项1</Option>
              <Option value="option2">选项2</Option>
              <Option value="option3">选项3</Option>
            </Select>
          </Form.Item>

          <Form.Item label="多选框">
            <Select mode="multiple" placeholder="请选择" style={{ width: 200 }}>
              <Option value="option1">选项1</Option>
              <Option value="option2">选项2</Option>
              <Option value="option3">选项3</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期选择器">
            <Space>
              <DatePicker placeholder="选择日期" prefix={<CalendarOutlined />} />
              <RangePicker placeholder={['开始日期', '结束日期']} />
              <TimePicker placeholder="选择时间" />
            </Space>
          </Form.Item>

          <Form.Item label="文本域">
            <TextArea rows={4} placeholder="请输入内容" />
          </Form.Item>

          <Form.Item label="上传">
            <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card">
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="滑块">
            <Slider defaultValue={30} />
          </Form.Item>

          <Form.Item label="开关">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="单选框组">
            <Radio.Group defaultValue="A">
              <Space>
                <Radio value="A">选项 A</Radio>
                <Radio value="B">选项 B</Radio>
                <Radio value="C">选项 C</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="复选框组">
            <Checkbox.Group defaultValue={['A', 'B']}>
              <Space>
                <Checkbox value="A">选项 A</Checkbox>
                <Checkbox value="B">选项 B</Checkbox>
                <Checkbox value="C">选项 C</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>

      <Card title="表单布局">
        <Divider>水平布局</Divider>
        <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="年龄">
            <Input placeholder="请输入年龄" />
          </Form.Item>
        </Form>

        <Divider>垂直布局</Divider>
        <Form layout="vertical">
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="年龄">
            <Input placeholder="请输入年龄" />
          </Form.Item>
        </Form>

        <Divider>紧凑布局</Divider>
        <Form layout="inline">
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="年龄">
            <Input placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default FormComponents
