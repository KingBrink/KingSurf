import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vueCookies from 'vue-cookies'
import {  Chart, registerables } from 'chart.js'
import 'bootstrap/dist/css/bootstrap.min.css';
Chart.register(...registerables)

createApp(App).use(store).use(router).use(vueCookies).mount('#app')
