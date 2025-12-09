<template>
  <div class="welcome-container">
    <el-card class="welcome-card">
      <div class="welcome-content">
        <div class="welcome-header">
          <h1 class="welcome-title">{{ t('page.text.welcomeTitle') }}</h1>
          <p class="welcome-subtitle">{{ t('page.text.welcomeSubtitle') }}</p>
        </div>

        <div class="welcome-features">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="feature-item">
                <el-icon class="feature-icon"><Setting /></el-icon>
                <h3>{{ t('page.lbl.systemManagement') }}</h3>
                <p>{{ t('page.text.systemManagementDesc') }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="feature-item">
                <el-icon class="feature-icon"><User /></el-icon>
                <h3>{{ t('page.lbl.userManagement') }}</h3>
                <p>{{ t('page.text.userManagementDesc') }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="feature-item">
                <el-icon class="feature-icon"><DataBoard /></el-icon>
                <h3>{{ t('page.lbl.dataAnalysis') }}</h3>
                <p>{{ t('page.text.dataAnalysisDesc') }}</p>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="welcome-info">
          <el-alert
            :title="t('page.text.systemAlertTitle')"
            type="info"
            :description="t('page.text.systemAlertDesc')"
            show-icon
            :closable="false"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Setting, User, DataBoard } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 20px;
}

.welcome-card {
  max-width: 1000px;
  width: 100%;
}

.welcome-content {
  padding: 20px;
}

.welcome-header {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-title {
  font-size: 32px;
  color: var(--el-text-color-primary);
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 16px;
  color: var(--el-text-color-regular);
}

.welcome-features {
  margin-bottom: 40px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  transition: all 0.3s;
}

.feature-item:hover {
  background-color: var(--el-color-primary-light-9);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  color: var(--el-color-primary);
  margin-bottom: 15px;
}

.feature-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--el-text-color-primary);
}

.feature-item p {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.welcome-info {
  margin-top: 20px;
}
</style>
