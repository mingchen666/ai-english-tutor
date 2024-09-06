import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import pinia from './stores/index'
import router from './router'
import '@/assets/styles/style.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// Prism
import Prism from 'prismjs'
VMdPreview.use(vuepressTheme, {
  Prism
})
const app = createApp(App)
app.use(pinia)
app.use(VMdPreview)
// app.use(createPinia())
app.use(router)

app.mount('#app')
