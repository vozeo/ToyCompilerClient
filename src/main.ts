import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')

export default app;