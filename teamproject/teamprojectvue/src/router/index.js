import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/guest/LoginView.vue'
// import LoginHome from '@/views/LoginHome.vue'
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
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'

import VacationManage from '@/component/VacationManage.vue'
import DeskCalander from '@/views/Desk/DeskCalander.vue'
import StudentVacation from '@/views/student/StudentVacation.vue'
import DeskAnnouncewrite from '@/views/Desk/DeskAnnouncewrite.vue'
import DeskAnnounceList from '@/views/Desk/DeskAnnounceList.vue'
import AnnounceView from '@/views/AnnounceView.vue'


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
      path: '/announceview/:idx',
      name: 'announceview',
      component: AnnounceView
    },
    {
      path: '/deskannouncewrite',
      name: 'deskannouncewrite',
      component: DeskAnnouncewrite
    },
    {
      path: '/deskannouncelist',
      name: 'deskannouncelist',
      component: DeskAnnounceList
    },
    {
      path: '/studentvacation',
      name: 'studentvacation',
      component: StudentVacation
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
      name: 'vacationmanage',
      component: VacationManage
    },
    {
      path: '/TeacherToday',
      name: 'teachertoday',
      component: TeacherToday
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

  ]
})

export default router