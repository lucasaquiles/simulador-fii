// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueAnalytics from 'vue-analytics'

Vue.use(VueMaterial)
Vue.use(VueAnalytics, {
  id: 'UA-173157941-1',
  router
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// eslint-disable-next-line
String.prototype.toCurrencyFormat = function () {
  return this.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
// eslint-disable-next-line
Number.prototype.toCurrencyFormat = function () {
  return this.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
