import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Row from './components/row'
import Col from './components/col'
import './styles/style.scss'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Row)
Vue.use(Col)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
