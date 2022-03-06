import Vue from 'vue'
import VueRouter from 'vue-router'
import LeaguesView from '../views/LeaguesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'leagues' }
  },
  {
    path: '/leagues',
    name: 'leagues',
    component: LeaguesView
  },
  {
    path: '/leagues/:id',
    props: true,
    component: () => import('../views/LeaguesCalendarView.vue')
  },
  {
    path: '/commands',
    name: 'commands',
    component: () => import('../views/CommandsView.vue')
  },
  {
    path: '/commands/:id',
    props: true,
    component: () => import('../views/CommandsCalendarView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
