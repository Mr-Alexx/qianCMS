import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getter'
import app from './modules/app.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app
  },
  getters,
  strict: debug
})
