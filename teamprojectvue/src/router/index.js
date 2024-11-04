import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/guest/LoginView.vue'
import LoginHome from '@/views/guest/LoginHome.vue'
import LaboView from '@/views/LaboView.vue'
import VacationForm from '@/views/student/VacationForm.vue'
import JoinView from '../views/guest/JoinView.vue'
import Mypage from '@/views/MyPage.vue'
import LectureSelect from '@/views/LectureSelect.vue'
import AttendanceCheck from '@/views/AttendanceCheck.vue'
import GuestAttendance from '@/views/guest/GuestAttendance.vue'
import StudentAttendance from '@/views/student/StudentAttendance.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
import Devmenu from '@/views/dev/Devmenu.vue'
import DeskCalander from '@/views/Desk/DeskCalander.vue'


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
      path: '/stdatt',
      name: 'stdatt',
      component: StudentAttendance
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

      path: '/teachertoday',
      name: 'teachertoday',
      component: TeacherToday
    },
    { path: '/teachercalander',
      name: 'teachercalander',
      component: TeacherCalander
     },
    { path: '/devmenu',
      name: 'devmenu',
      component: Devmenu
     },
     {path: '/deskcalander',
      name: 'deskcalander',
      component: DeskCalander
     }

  ]
})

export default router
