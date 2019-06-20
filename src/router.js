import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: () => import('./views/Root/Root.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home/Home.vue')
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   let personType = Cookies.get('personType')
//   if (!Cookies.get('token')) {
//     if (to['name'] !== 'login') {
//       Cookies.set('redirect', window.location.href)
//       next({
//         name: 'login'
//       })
//     } else {
//       next()
//     }
//   } else {
//     if (to['name'] === 'login') {
//       next()
//     } else {
//       if (personType === 'admin') {
//         if (
//           ['login', 'home', 'grouping', 'statistics'].indexOf(to['name']) > -1
//         ) {
//           next()
//         } else {
//           next({
//             name: 'home'
//           })
//         }
//       } else {
//         if (['login', 'ordinaryPersonnel'].indexOf(to['name']) > -1) {
//           next()
//         } else {
//           next({
//             name: 'ordinaryPersonnel'
//           })
//         }
//       }
//       getUserByToken().then(response => {
//         if (response.data) {
//           if (typeof response.data == 'object' && response.data['success']) {
//             let data = response.data.obj
//             router.app.$options.store.commit(
//               'setQuestionState',
//               data.questionState
//             )
//             Cookies.set('user', data)
//           } else {
//             Cookies.remove('token')
//             next({
//               name: 'login'
//             })
//           }
//         } else {
//           Vue.prototype.$message.error('获取登录用户信息失败')
//         }
//       })
//     }
//   }
// })
export default router
