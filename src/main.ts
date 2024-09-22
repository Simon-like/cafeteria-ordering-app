import { createSSRApp } from 'vue'
import pinia from './stores'
import uviewPlus from '@/uni_modules/uview-plus'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  app.use(uviewPlus)
  return {
    app,
  }
}
