import React from 'react'
import { Card, Typography, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SettingOutlined,
  LockOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph } = Typography

const Welcome: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="welcome-container">
      <Card variant="outlined" className="welcome-card mb-4">
        <Title level={2} className="welcome-title">
          {t('welcome.title')}
        </Title>
        <Paragraph className="welcome-desc">{t('welcome.description')}</Paragraph>
      </Card>

      <Row gutter={[24, 24]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card variant="outlined" className="stat-card" hoverable>
            <Statistic
              title={t('welcome.stats.users')}
              value={12345}
              prefix={<UserOutlined className="stat-icon" />}
              styles={{ content: { color: '#3f8600' } }}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="outlined" className="stat-card" hoverable>
            <Statistic
              title={t('welcome.stats.todayVisits')}
              value={6789}
              prefix={<BarChartOutlined className="stat-icon" />}
              styles={{ content: { color: '#1890ff' } }}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="outlined" className="stat-card" hoverable>
            <Statistic
              title={t('welcome.stats.sales')}
              value={1234567.89}
              prefix={<LineChartOutlined className="stat-icon" />}
              formatter={value => `¥ ${value.toLocaleString()}`}
              styles={{ content: { color: '#cf1322' } }}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="outlined" className="stat-card" hoverable>
            <Statistic
              title={t('welcome.stats.conversionRate')}
              value={23.45}
              suffix="%"
              prefix={<PieChartOutlined className="stat-icon" />}
              styles={{ content: { color: '#faad14' } }}
              className="stat-content"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="content-row">
        <Col xs={24} md={12}>
          <Card title={t('welcome.systemNotice')} variant="outlined" className="content-card">
            <div className="notice-list">
              <div className="notice-item">
                <span className="notice-dot"></span>
                <Paragraph className="notice-text">{t('welcome.notices.0')}</Paragraph>
              </div>
              <div className="notice-item">
                <span className="notice-dot"></span>
                <Paragraph className="notice-text">{t('welcome.notices.1')}</Paragraph>
              </div>
              <div className="notice-item">
                <span className="notice-dot"></span>
                <Paragraph className="notice-text">{t('welcome.notices.2')}</Paragraph>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={t('welcome.quickActions')} variant="outlined" className="content-card">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6} md={12}>
                <Card variant="outlined" className="quick-card" hoverable>
                  <div className="quick-card-content">
                    <div className="quick-card-icon">
                      <UserOutlined />
                    </div>
                    <div className="quick-card-text">
                      <Typography.Text strong>{t('welcome.quickCards.userManagement')}</Typography.Text>
                      <Paragraph className="quick-card-desc">{t('welcome.quickCards.userManagementDesc')}</Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={12}>
                <Card variant="outlined" className="quick-card" hoverable>
                  <div className="quick-card-content">
                    <div className="quick-card-icon">
                      <LockOutlined />
                    </div>
                    <div className="quick-card-text">
                      <Typography.Text strong>{t('welcome.quickCards.permissionConfig')}</Typography.Text>
                      <Paragraph className="quick-card-desc">{t('welcome.quickCards.permissionConfigDesc')}</Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={12}>
                <Card variant="outlined" className="quick-card" hoverable>
                  <div className="quick-card-content">
                    <div className="quick-card-icon">
                      <DatabaseOutlined />
                    </div>
                    <div className="quick-card-text">
                      <Typography.Text strong>{t('welcome.quickCards.dataStatistics')}</Typography.Text>
                      <Paragraph className="quick-card-desc">{t('welcome.quickCards.dataStatisticsDesc')}</Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={12}>
                <Card variant="outlined" className="quick-card" hoverable>
                  <div className="quick-card-content">
                    <div className="quick-card-icon">
                      <SettingOutlined />
                    </div>
                    <div className="quick-card-text">
                      <Typography.Text strong>{t('welcome.quickCards.systemSettings')}</Typography.Text>
                      <Paragraph className="quick-card-desc">{t('welcome.quickCards.systemSettingsDesc')}</Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Welcome
