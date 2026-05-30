import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
// import '../polyfills'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

import VueApexCharts from 'vue3-apexcharts' // <-- Add this

// create a pinia instance
let pinia = createPinia()

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(pinia)
app.use(router)
app.use(resourcesPlugin)
app.use(VueApexCharts) // <-- Add this

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)
app.component('apexchart', VueApexCharts) // <-- Add this

router.isReady().then(() => {
	app.mount("#app")
})