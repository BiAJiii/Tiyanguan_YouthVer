import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
// import './api/mock/mock.js'
import store from './store'
import '@/assets/icon_font/iconfont.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 判断token存不存在
  // token不存在，说明当前用户是未登录，应该跳转至登录页

  let userName = sessionStorage.getItem('username')
  
  if (!userName && to.name !== 'login' ) {
    next({ name: 'login' })
  } else if (userName && to.name === 'login'){ 
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
  }
}).$mount('#app')
 