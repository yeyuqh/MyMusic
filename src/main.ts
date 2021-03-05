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
