<template>
<<<<<<< HEAD
  <nav class="mx-0 shadow-md">
    <div class="bg-blue-300 h-44">
      <div>
        <div class="justify-center flex items-center">
          <img
            src="./images/LOGO.png"
            alt=""
            class="w-32 mt-5 max-md:w-28 ml-3 cursor-pointer"
            @click="logoclick"
          />
        </div>
=======

  <nav class="mx-0 bg-blue-300 shadow-md">
    <div class="">
      <div class="justify-center flex items-center ">
        <RouterLink to="/">
          <img src="./images/LOGO.png" alt="" class="w-32 max-md:w-28 ml-3">
        </RouterLink>
      </div>
      <div class="flex text-white z-10 justify-end">
       
        <div class="mr-2" v-if="logincheckpinia"><RouterLink to="/loginview">| 로그인</RouterLink></div>
        <div class="mr-2" v-if="logincheckpinia" ><RouterLink to="/jointermsofuse">| 회원가입</RouterLink></div>
        <div class="mr-2" v-else @click="logout"><RouterLink to="/loginview">| 로그아웃</RouterLink></div>
        <div class="mr-2"><RouterLink to="/vacationform">| 휴가신청</RouterLink></div>
        <div class="mr-20"><RouterLink to="/laboview">| 연구실</RouterLink></div>
      </div>
>>>>>>> origin/우혁

        <div class="  flex float-end z-10 ">
          <div class="mr-2" v-if="logincheckpinia">
            <RouterLink to="/loginview">| 로그인</RouterLink>
          </div>
          <div class="mr-2" v-if="logincheckpinia">
            <RouterLink to="/jointermsofuse">| 회원가입</RouterLink>
          </div>
          <div v-else>
            <div class="float-right mr-10 mb-10 text-2xl border-2 border-red-400 rounded hover:bg-red-400" @click="logout">
              <RouterLink to="/loginview">로그아웃</RouterLink>
            </div>
            <div class="float-right mr-10 mb-10 text-2xl">{{ username }} 님 반갑습니다.</div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="m-5">
    <div class="h-24"></div>

    <RouterView />
    <!-- 사이드배너 -->
    <div class="" id="sidebann">
      <div class="hidden">
        <SideBanner />
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBanner from './component/SideBanner.vue'
<<<<<<< HEAD
import { useloginStore } from './stores/loginpinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { userrole } from './api/loginapi'
import { userdata } from './api/loginapi'
=======
import { useloginStore } from './stores/loginpinia';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
>>>>>>> origin/우혁

const loginStore = useloginStore()

const router = useRouter()

<<<<<<< HEAD
const { logincheckpinia, username } = storeToRefs(loginStore)
const { logincheckfalse, loginchecktrue } = loginStore

const logoclick = async () => {
  if (localStorage.getItem('token') !== null) {
    const role = await userrole()

    if (role == 'ROLE_STUDENT') {
      console.log('학생계정')
      router.push({ name: 'stdatt' })
    } else if (role == 'ROLE_TEACHER') {
      console.log('선생계정')
      router.push({ name: 'teachercalander' })
    } else {
      console.log('맵핑문제')
      router.push({ name: '' })
    }
  } else {
    router.push({ name: 'loginview' })
  }
}

const logout = () => {
  localStorage.removeItem('token')

  loginchecktrue()

  console.log('로그아웃 체크' + logincheckpinia)

  router.push({ name: 'loginhome' })
}

onMounted(async () => {
  userdata()

  if (localStorage.getItem('token') !== null) {
    logincheckfalse()

    console.log('로그인 체크' + logincheckpinia)
  }

  //  else{

  //   router.push({name:'loginview'})
  //    console.log("에러"+logincheckpinia )
  //  }
})

const homelogin = () => {
  if (localStorage.getItem('token') !== null) {
    console.log('로그인 유지')
    router.push({ name: 'stdatt' })
  } else {
    console.log('로그아웃 상태')
    router.push({ name: 'loginview' })
  }
}

homelogin()
=======
const {logincheckpinia} = storeToRefs(loginStore)
const { logincheckfalse , loginchecktrue} = loginStore ;

// watchEffect (()=> {

//   if(localStorage.setItem('token')==null)
//   logincheckfalse()

// }) 

const logout =  () => {

  localStorage.removeItem('token')
  
  loginchecktrue();

  console.log("로그아웃 체크" +logincheckpinia)

  router.push({name:'loginhome'})
}

watchEffect( ()=>{
 
 if(localStorage.getItem('token')!==null){

    logincheckfalse();

   console.log("로그인 체크"+logincheckpinia ) 

 }else{

   console.log("에러"+logincheckpinia ) 
 }

 

})


>>>>>>> origin/우혁
</script>

<style lang="scss" scoped></style>
