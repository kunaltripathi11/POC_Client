import { createApp } from 'vue'
import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)

import App from './App.vue'
import router from './Route'


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
