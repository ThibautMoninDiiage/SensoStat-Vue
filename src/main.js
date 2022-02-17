import { createApp } from 'vue'
import StartPage from './views/StartPage.vue'
import './registerServiceWorker'
import router from './router'

createApp(StartPage).use(router).mount('#app')
