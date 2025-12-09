import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import log from './utils/log'
import './styles/index.scss'
import vConsole from 'vconsole'
const vconsole = new vConsole()
Vue.use(vconsole)

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import { table, tableColumn, pagination } from 'element-ui'
// Vue.use(table)
// Vue.use(tableColumn)
// Vue.use(pagination)

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// import { Button, Cell, CellGroup, Popup, Radio, RadioGroup, Overlay } from 'vant'
// Vue.use(Button)
// Vue.use(Cell)
// Vue.use(CellGroup)
// Vue.use(Popup)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Overlay)

// 引入 gwell-ui
// import GwellUI from 'gwell-ui'
// import 'gwell-ui/lib/es/style.css'
// Vue.use(GwellUI)

import { NoDevice, DevicePicker, AutoManger, Loading } from 'gwell-ui'
import { LoadingPlugin } from 'gwell-ui/lib/es/Loading'
Vue.use(NoDevice).use(AutoManger).use(DevicePicker)
Vue.use(Loading).use(LoadingPlugin)

Vue.config.productionTip = false

window.log = log
log.danger('danger msg')
log.info('info msg')
log.success('success msg')

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
