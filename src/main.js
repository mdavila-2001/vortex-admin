import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/css/global.css'
import './assets/css/variables.css'
import './services/firebase'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
