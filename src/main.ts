import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // 全局样式

const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')

// Icon
import '@/icons/iconfont'
import Icon from '@/components/base/Icon/index.vue'
app.component('Icon', Icon)

// Divider
import Divider from '@/components/Divider/index.vue'
app.component('Divider', Divider)

// element-plus 按需引入
import '@/element+/el-custom.scss'
import { components } from '@/element+'
components.forEach((component) => {
  app.component(component.name, component)
})
