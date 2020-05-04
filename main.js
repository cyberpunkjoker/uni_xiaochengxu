import Vue from 'vue'
import App from './App'

import "./static/css/global.css"

Vue.prototype.$http = require('./utils/api.js');

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
