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
    meta: {
      title: 'Лиги'
    },
    component: LeaguesView
  },
  {
    path: '/commands',
    name: 'commands',
    meta: {
      title: 'Команды'
    },
    component: () => import('../views/CommandsView.vue')
  },
  {
    path: '/matches/:id',
    name: 'matches',
    meta: {
      title: 'Матчи'
    },
    component: () => import('../views/CalendarView.vue'),
    props: true
  },
  {
    path: '*',
    redirect: { name: 'leagues' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
