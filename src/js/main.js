import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router.js'
import TheApp from '../components/TheApp.vue'

const pinia = createPinia()
const app = createApp(TheApp)

app.use(pinia)
app.use(router)

app.mount('#app')
