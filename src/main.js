import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import VButton from "./components/ui/VButton";

createApp(App).component('VButton', VButton).use(store).use(router).mount('#app')
