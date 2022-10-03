import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import VueNativeSock from "vue-native-websocket-vue3";
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from "./store";

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

export default app;