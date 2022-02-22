import { createApp } from "vue";
import router from "./router";
import App from './views/App.vue'
import TextToSpeech from './views/TextToSpeech'
import './registerServiceWorker'

createApp(TextToSpeech).use(router).mount('#app')
