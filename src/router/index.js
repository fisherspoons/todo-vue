import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main'
import Secondary from '../views/Secondary'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/Secondary/:id',
    name: 'Secondary',
    component: Secondary
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
