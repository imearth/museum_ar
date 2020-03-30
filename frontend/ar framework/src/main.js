import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VModal)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
