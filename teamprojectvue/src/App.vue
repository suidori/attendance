<template>

<div class="bg-[#eee] h-[50vw]">

  <nav class="mx-0 shadow-md ">
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


        <StudentSideBar  class="" v-if="sidecheck"/>


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
            <div  class="float-right mr-10 mb-10 text-2xl">{{ username }} 님 반갑습니다.</div>
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
        
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import StudentSideBar from './layout/StudentSideBar.vue'

import { useloginStore } from './stores/loginpinia'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { userrole } from './api/loginapi'
import { userdata } from './api/loginapi'
import { ref } from 'vue'
// import { useRoute } from 'vue-router'

const usernameinput = ref(false);

const loginStore = useloginStore()

const router = useRouter()
// const route = useRoute()

const { logincheckpinia, username, userrl } = storeToRefs(loginStore)
const { logincheckfalse, loginchecktrue } = loginStore

// watch(
//   () => route.fullPath, // 라우트 경로가 변경될 때 감지
//   () => {
//     usernameinput.value = false;
//     setTimeout(() => {
//       usernameinput.value = true;
//     }, 500);
//   }
// );

const sidecheck = ref(false)

// watch(
//   () => route.fullPath, // 라우트 경로가 변경될 때 감지
//   () => {
//     usernameinput.value = false;
//     setTimeout(() => {
//       usernameinput.value = true;
//     }, 500);
//   }
// );

const rolecheck = async() => {

  await userrole()

  if ( userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정')
      router.push({ name: 'stdatt' })
    } else if ( userrl.value == 'ROLE_TEACHER') {
      console.log('선생계정')
      router.push({ name: 'teachercalander' })
    }
    
    else if ( userrl.value == 'ROLE_MANAGER') {
      console.log('매니저계정')
      router.push({ name: 'deskcalander' })
      
    }
    
    else {
      console.log('맵핑문제')
      
    }
 
  
}

const logoclick = async () => {

  console.log("로고클릭")

  if (localStorage.getItem('token') !== null) {

      rolecheck()
      

  } else {
    console.log("서버연결 오류")
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

    //토큰 체크
    logincheckfalse()
    //권한 체크
    

    if ( userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정')
      router.push({ name: 'stdatt' })
    } else if ( userrl.value == 'ROLE_TEACHER') {
      console.log('선생계정')
      router.push({ name: 'teachercalander' })
      
    }
   else if ( userrl.value == 'ROLE_MANAGER') {
      console.log('매니저계정')
      router.push({ name: 'deskcalander' })
      
    }
    
    else {
      console.log('맵핑문제')
      
    }



    console.log('로그인 체크' + logincheckpinia)
  }

  //  else{

  //   router.push({name:'loginview'})
  //    console.log("에러"+logincheckpinia )
  //  }
  homelogin()
})


const homelogin = () => {
  if (localStorage.getItem('token') !== null) {
    console.log('로그인 유지')

    
    if ( userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정')
      router.push({ name: 'stdatt' })
    } else if ( userrl.value == 'ROLE_TEACHER') {
      console.log('선생계정')
      router.push({ name: 'teachercalander' })

      
    }
   else if ( userrl.value == 'ROLE_MANAGER') {
      console.log('매니저계정')
      router.push({ name: 'deskcalander' })
      
    }
    
    else {

      console.log('맵핑문제')
      
    }

    
  } else {
    console.log('로그아웃 상태')
    router.push({ name: 'loginview' })
  }
}

homelogin()

</script>

<style lang="scss" scoped></style>
