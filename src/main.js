import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import BaiduMap from 'vue-baidu-map'

// Vue.use(BaiduMap, {
//   ak: 'b4mdPLtZ0RgdvSk7DxhCbWXS6OgzCkO9'
// })
// Vue.config.productionTip = false
require('./assets/css/reset.css')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
