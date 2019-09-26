import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'
import LazyLoad from './components/lazy_load/LazyLoad.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: LazyLoad,
      props: {
        url: '@/pages/home/Home.vue'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/Login.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('./pages/edit_ad/EditAd.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./pages/create_ad/CreateAd.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  //TODO: Add is user logged handling
  next()
})

export default router