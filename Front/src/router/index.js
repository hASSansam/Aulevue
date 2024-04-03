import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aule',
    name: 'aule',
    component: () => import( '../views/AuleView.vue')
  },
  {
    path: '/punti',
    name: 'punti',
    component: () => import( '../views/PuntiView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
