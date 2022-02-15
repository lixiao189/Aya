import { createApp } from 'vue'
import App from './App.vue'
import Router from './config/Router'

const app = createApp(App)
app.use(Router)
app.mount('#app')
