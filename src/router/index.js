import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../modules/core/DashboardView.vue'
import SeedView from '../modules/core/Seed.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/seed',
    name: 'Seed',
    component: SeedView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router