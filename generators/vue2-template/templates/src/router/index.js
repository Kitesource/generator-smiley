import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "base-table" */ '../views/BaseTableView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user-view" */ '../views/UserView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import(/* webpackChunkName: "product-view" */ '../views/ProductView.vue')
  },
  {
    path: '/hooks',
    name: 'hooks',
    component: () => import(/* webpackChunkName: "hooks-view" */ '../views/HooksView.vue')
  },
  {
    path: '/only-office',
    name: 'only-office',
    component: () => import(/* webpackChunkName: "only-office-view" */ '../views/OnlyOffice.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
