<template>
<div class="text-center">
    <div class="flex justify-center -m-5">
      <h1 class="font-mono font-black italic text-3xl tracking-tight flex flex-col">GREENART COMPUTER ARCADEMY</h1>

    </div>
    <div class="mx-auto mt-20 w-[40rem] p-4 transform bg-white shadow-md flex flex-col justify-center items-center">
      <div class=" my-3 mt-10 space-y-3 justify-between">
          <p class="ml-7">ID<input
              class="ml-5 p-3 mb-5 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
              type="text"
              name="userid"
              id="userid"
              v-model="userid"
            />
          </p>
          <p class="mr-10">PASSWORD<input
              class="ml-5 p-3 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
              type="password"
              name="password"
              id="password"
              v-model="password"
              @keydown.enter="LoginSequence"
            />
          </p>
        </div>
      <div class="m-2 my-5">
        <p class="pb-2 font-bold text-rose-600" v-if="loginError">{{ loginError }}</p>
        <input
          @click="LoginSequence"
          class="bg-blue-500 text-white font-bold py-2 px-16 rounded-lg shadow-md hover:bg-blue-300 transition duration-200 ease-in-out transform hover:scale-x-105"
          type="button"
          value="로그인"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logincontrol } from '@/api/loginapi';
import { useloginStore } from '@/stores/loginpinia';
import { userrole } from '@/api/loginapi';
import { storeToRefs } from 'pinia';
import { userdata } from '@/api/loginapi';

const loginpinia = useloginStore()

const {userrl} = storeToRefs(loginpinia)

const userid = ref('')
const password = ref('')

const loginError = ref('')
const router = useRouter()

// const errorMessage = ref('') // 에러 메시지를 저장할 변수

const LoginSequence = async () => {

  const data = {
    "userid": userid.value,
    "password": password.value
  }
  
    // 백엔드로 보낼 데이터

    try{

      if(localStorage.getItem('token')!==null){

        localStorage.removeItem('token')


      }
      

      console.log(data)

      const token = await logincontrol(data)

     console.log('최종 토큰'+token)

     await userdata()
     await userrole()

     if ( userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정'+ userrl.value)
      router.push({ name: 'stdatt' })
    } else if ( userrl.value == 'ROLE_TEACHER') {
      console.log('선생계정'+ userrl.value)
      router.push({ name: 'teachertoday' })
    } else {
      console.log('맵핑문제'+ userrl.value)
      router.push({name:'loginview'})
    }


    //  router.push({ path: 'stdatt' })

    }catch(e){

      console.log('로그인실패 ' + e)

      loginError.value = '아이디와 비밀번호를 확인해 주세요'
      return

    } 
  }
     
</script>

<style lang="scss" scoped></style>



