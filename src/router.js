import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from '@/views/Profile.vue'
import $store from '@/store/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!$store.state.loggedIn) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
