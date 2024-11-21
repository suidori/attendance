import { createRouter, createWebHistory } from 'vue-router'
import StudentMyPage from '../views/StudentMyPage.vue'
import ManageMent from '../views/ManageMent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homManageMente',
      component: ManageMent,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: StudentMyPage
    }
  ],
})

export default router
