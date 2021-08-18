import { createRouter, createWebHistory } from 'vue-router'
import KickForm from "../components/pages/Kick form/KickForm";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: KickForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
