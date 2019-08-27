import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import StudentManage from './views/studentManage'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue'),
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
        path: 'orderManage',
        name: 'orderManage',
        component: () => import('./views/orderManage')
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
      }],
      redirect: '/home/studentManage'
    }
  ]
})
