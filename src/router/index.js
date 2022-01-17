import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/acount/Login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
