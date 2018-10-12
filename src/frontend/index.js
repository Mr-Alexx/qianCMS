import Vue from 'vue'
import App from './App'
import store from './store'
import { router } from './router'
import Row from './components/row'
import Col from './components/col'
import Icon from '@/components/icon'
import '../../static/fonts/iconfont.css' // 全局使用iconfont
import './styles/style.scss'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)

/* eslint-disable no-new */
new Vue({
  el: '#qian',
  router,
  store,
  components: { App },
  template: '<App/>'
})
