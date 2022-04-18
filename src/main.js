import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import moment from 'moment'
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')||to.path.startsWith('/register')) {
    window.localStorage.removeItem('access-admin')
    next()
  } else {
    let admin=JSON.parse(window.localStorage.getItem('access-admin'))
    if (!admin) {
      next({path:'/login'})
    } else {
      axios({
        url:'http://106.14.37.85:8181/user/checkToken',
        method:'get',
        headers:{
          token:admin.token
        }
      }).then((resp) => {
        // console.log(resp.data)
        if(!resp.data){
          alert("身份已过期")
          next({path:'/login'})

        }
      })
      next()
    }
  }
})
