<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">
        <h2>欢迎登录</h2>
        <p>请输入您的账号信息</p>
      </div>
      <van-form ref="formRef" class="login-form" @submit="submit">
        <van-cell-group inset class="login-cell-group">
          <van-field
            v-model="formData.username"
            name="用户名"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            class="login-field"
          />
          <van-field
            v-model="formData.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            class="login-field"
          />
        </van-cell-group>
        <div class="login-button-wrapper">
          <van-button round block type="primary" native-type="submit" class="login-button"> 登录 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import router from '@/router'
  import { reactive, ref } from 'vue'
  import type { FormInstance } from 'vant'
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()
  const formData = reactive({
    username: '',
    password: '',
  })
  const formRef = ref<FormInstance>()
  const submit = () => {
    formRef.value?.validate().then(async () => {
      try {
        const userInfo = await userStore.login(formData)
        if (userInfo) {
          router.push({ name: 'Home' })
        }
      } catch (error) {
        console.error(error)
      }
    })
  }
</script>

<style scoped lang="scss">


  // 动画效果
  @keyframes fade-in-up {
    from {
      transform: translateY(30px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }  // 登录页容器
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  // 登录卡片
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 32px;
    animation: fade-in-up 0.6s ease-out;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
  }

  // 登录标题
  .login-title {
    margin-bottom: 32px;
    text-align: center;

    h2 {
      margin: 0 0 8px;
      color: #333;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  }

  // 登录表单
  .login-form {
    width: 100%;
  }

  // 单元格组
  .login-cell-group {
    margin-bottom: 24px;
    overflow: hidden;
    border: none;
    border-radius: 12px;
    background: #f8f9fa;
  }

  // 输入字段
  .login-field {
    border-bottom: 1px solid #e9ecef;
    background: #fff;
    font-size: 15px;

    &:last-child {
      border-bottom: none;
    }

    :deep(.van-field__label) {
      color: #555;
      font-weight: 500;
    }

    :deep(.van-field__control) {
      color: #333;
      font-size: 15px;
    }

    :deep(.van-field__placeholder) {
      color: #aaa;
    }
  }

  // 按钮容器
  .login-button-wrapper {
    margin: 0;
  }

  // 登录按钮
  .login-button {
    width: 100%;
    height: 48px;
    transition: all 0.3s ease;
    border: none;
    border-radius: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-size: 16px;
    font-weight: 600;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgb(102 126 234 / 40%);
    }

    &:active {
      transform: translateY(0);
    }
  }
</style>
