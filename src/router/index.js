import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../modules/core/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router