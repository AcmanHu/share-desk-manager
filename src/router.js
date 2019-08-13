import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import StudentManage from './views/studentManage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
        path: 'studentManage',
        name: 'studentManage',
        component: () => import('./views/studentManage')
      },
      {
        path: 'approveManage',
        name: 'approveManage',
        component: () => import('./views/approveManage')
      },
      {
        path: 'couponManage',
        name: 'couponManage',
        component: () => import('./views/couponManage')
      },
      {
        path: 'businessManage',
        name: 'businessManage',
        component: () => import('./views/businessManage')
      },
      {
        path: 'messageNotice',
        name: 'messageNotice',
        component: () => import('./views/messageNotice')
      }]
    }
  ]
})
