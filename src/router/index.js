import { createRouter, createWebHistory } from 'vue-router'

// Importação dos componentes de página
import Search from '../views/SearchView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: (route) => ({ query: route.query.q })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
