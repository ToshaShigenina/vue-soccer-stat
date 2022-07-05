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
    path: '/command-matches/:id',
    name: 'command-matches',
    meta: {
      title: 'Матчи команды'
    },
    component: () => import('../views/CommandMatchesView.vue'),
    props: true
  },
  {
    path: '/league-matches/:id',
    name: 'league-matches',
    meta: {
      title: 'Матчи лиги'
    },
    component: () => import('../views/LeagueMatchesView.vue'),
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
