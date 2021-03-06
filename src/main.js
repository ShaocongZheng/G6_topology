import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import Vuex from 'vuex'
import 'view-design/dist/styles/iview.css'
import './plugins/element.js'
import './assets/iconfont/iconfont.css'

Vue.use(ViewUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
