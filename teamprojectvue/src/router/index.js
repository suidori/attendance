import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/guest/LoginView.vue'
<<<<<<< HEAD
// import LoginHome from '@/views/LoginHome.vue'
=======
import LoginHome from '@/views/LoginHome.vue'
>>>>>>> origin/우혁
import LaboView from '@/views/LaboView.vue'
import VacationForm from '@/views/student/VacationForm.vue'
import JoinView from '@/views/guest/JoinView.vue'
import Mypage from '@/views/MyPage.vue'
import LectureSelect from '@/views/LectureSelect.vue'
import AttendanceCheck from '@/views/AttendanceCheck.vue'
import GuestAttendance from '@/views/guest/GuestAttendance.vue'
import JoinTermsOfUse from '@/views/JoinTermsOfUse.vue'
import LectureApprovallist from '@/views/LectureApprovallist.vue'
import JoinComplete from '@/views/JoinComplete.vue'
import LectureInsert from '@/views/LectureInsert.vue'
import StudentAttendance from '@/views/student/StudentAttendance.vue'
<<<<<<< HEAD
import Devmenu from '@/views/dev/Devmenu.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
=======
import DevMenu from '@/views/dev/Devmenu.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'

>>>>>>> origin/우혁

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'loginhome',
    //   component: LoginHome
    // },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
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
=======
    },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
>>>>>>> origin/우혁
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
    },
    {
<<<<<<< HEAD
      path: '/Devmenu',
      name: 'devmenu',
      component: Devmenu
    },
    {
      path: '/TeacherCalander',
      name: 'teachercalander',
      component: TeacherCalander
    },
=======
      path: '/devmenu',
      name: 'devmenu',
      component: DevMenu
    },
    {
      path: '/teachercalander',
      name: 'teachercalander',
      component: TeacherCalander
    },
    {
      path: '/teachertoday',
      name: 'teachertoday',
      component: TeacherToday
    },
>>>>>>> origin/우혁
  ]
})

export default router
