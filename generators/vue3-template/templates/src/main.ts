import { createApp } from 'vue'

import Router from '@/router'
import Pinia from '@/store'
import app from '@/App.vue'
import I18n from '@/plugins/i18n'
import VChart from '@/plugins/echarts'
import '@/plugins/day'
import '@/styles/tailwind.css'
import 'virtual:svg-icons-register'

const root = createApp(app)
root.use(Router)
root.use(I18n)
root.use(Pinia)
root.component('VChart', VChart)
root.mount('#app')
