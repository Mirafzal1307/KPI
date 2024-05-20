import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createVuetify } from 'vuetify'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

// Create vue app
const app = createApp(App)

// Create vuetify
const vuetify = createVuetify()
app.use(vuetify)

app.use(Vue3Toasity, { autoClose: 3000 })

// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
