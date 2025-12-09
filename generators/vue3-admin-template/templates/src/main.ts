import { createApp } from 'vue'

import { createPinia } from 'pinia'
import registerI18n from '@/i18n'
import registerVueECharts from '@/plugins/echarts'

import { useRouter } from './router'
import App from './App.vue'
import '@/styles/tailwind.css' // 引入tailwind
import '@/styles/index.scss' // 引入UI库样式
import 'virtual:svg-icons-register' // svg图标插件

const app = createApp(App)
useRouter(app)

app.use(createPinia())

registerI18n(app)

registerVueECharts(app)
app.mount('#app')
