import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD

import LoginView from '../views/guest/LoginView.vue'
import LoginHome from '@/views/guest/LoginHome.vue'
import LaboView from '@/views/LaboView.vue'
import VacationForm from '@/views/student/VacationForm.vue'
import JoinView from '../views/guest/JoinView.vue'
=======
import LoginView from '../views/guest/LoginView.vue'
// import LoginHome from '@/views/LoginHome.vue'
import LaboView from '@/views/LaboView.vue'
import VacationForm from '@/views/student/VacationForm.vue'
import JoinView from '@/views/guest/JoinView.vue'
>>>>>>> completed
import Mypage from '@/views/MyPage.vue'
import LectureSelect from '@/views/LectureSelect.vue'
import AttendanceCheck from '@/views/AttendanceCheck.vue'
import GuestAttendance from '@/views/guest/GuestAttendance.vue'
<<<<<<< HEAD
import StudentAttendance from '@/views/student/StudentAttendance.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
import Devmenu from '@/views/dev/Devmenu.vue'
import DeskCalander from '@/views/Desk/DeskCalander.vue'
import VacationManage from '@/component/VacationManage.vue'
import VacationDesign from '@/component/VacationDesign.vue'
=======
import JoinTermsOfUse from '@/views/JoinTermsOfUse.vue'
import LectureApprovallist from '@/views/LectureApprovallist.vue'
import JoinComplete from '@/views/JoinComplete.vue'
import LectureInsert from '@/views/LectureInsert.vue'
import StudentAttendance from '@/views/student/StudentAttendance.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'

import VacationManage from '@/component/VacationManage.vue'
import DeskCalander from '@/views/Desk/DeskCalander.vue'
>>>>>>> completed


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'loginhome',
    //   component: LoginHome
    // },
    {
<<<<<<< HEAD
      path: '/vacationmanage',
=======
      path: '/loginview',
      name: 'loginview',
      component: LoginView
    },
    
    {
      path: '/TeacherToday',
      name: 'teachertoday',
      component: TeacherToday
    },
    {
      path: '/DeskCalander',
      name: 'deskcalander',
      component: DeskCalander
    },
    {
      path: '/VacationManage',
>>>>>>> completed
      name: 'vacationmanage',
      component: VacationManage
    },
    {
<<<<<<< HEAD
      path: '/',
      name: 'loginhome',
      component: LoginHome
=======
      path: '/TeacherToday',
      name: 'teachertoday',
      component: TeacherToday
>>>>>>> completed
    },
    {
      path: '/vacationdesign',
      name: 'vacationdesign',
      component: VacationDesign
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
<<<<<<< HEAD
    },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
=======
>>>>>>> completed
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
<<<<<<< HEAD
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
=======
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
    },
    // {

    //   path: '/Devmenu',
    //   name: 'devmenu',
    //   component: Devmenu
    // },
    {
      path: '/TeacherCalander',
      name: 'teachercalander',
      component: TeacherCalander
    },
>>>>>>> completed

  ]
})

export default router
