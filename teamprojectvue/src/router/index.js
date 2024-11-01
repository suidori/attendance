import { createRouter, createWebHistory } from 'vue-router'
import LaboView from '@/views/LaboView.vue'
import VacationForm from '@/views/VacationForm.vue'
import JoinView from '@/views/JoinView.vue'
import Mypage from '@/views/MyPage.vue'
import LectureSelect from '@/views/LectureSelect.vue'
import AttendanceCheck from '@/views/AttendanceCheck.vue'
import GuestAttendance from '@/views/GuestAttendance.vue'
import JoinTermsOfUse from '@/views/JoinTermsOfUse.vue'
import LectureApprovallist from '@/views/LectureApprovallist.vue'
import JoinComplete from '@/views/JoinComplete.vue'
import LectureInsert from '@/views/LectureInsert.vue'
import LoginView from '@/views/LoginView.vue'
import LoginHome from '@/views/LoginHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginhome',
      component: LoginHome
    },
    {
      path: '/guestattendance',
      name: 'guestattendance',
      component: GuestAttendance
    },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/joinview',
      name: 'joinview',
      component: JoinView
    },
    {
      path: '/laboview',
      name: 'laboview',
      component: LaboView
    },
    {
      path: '/vacationform',
      name: 'vacationform',
      component: VacationForm
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/joinview',
      name: 'joinview',
      component: JoinView
    },
    {
      path: '/lectureselect',
      name: 'lectureselect',
      component: LectureSelect
    },
    {
      path: '/attendancecheck',
      name: 'attendancecheck',
      component: AttendanceCheck
    },
    {
      path: '/jointermsofuse',
      name: 'jointermsofuse',
      component: JoinTermsOfUse
    },
    {
      path: '/LectureApprovallist',
      name: 'lectureapprovallist',
      component: LectureApprovallist
    },
    {
      path: '/joincomplete',
      name: 'joincomplete',
      component: JoinComplete
    },
    {
      path: '/lectureinsert',
      name: 'lectureinsert',
      component: LectureInsert
    }
  ]
})

export default router
