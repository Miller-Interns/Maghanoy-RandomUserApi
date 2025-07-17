import { createRouter, createWebHistory } from 'vue-router'
import {RouteName} from '@/enum/router-name'
import profileDetails from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: RouteName.PROFILEDETAILS,
      component: profileDetails,
    }
  
  ],
})

export default router