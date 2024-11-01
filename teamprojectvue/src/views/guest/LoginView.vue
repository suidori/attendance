<template>
  <div class="text-center">
    <div class="flex justify-center">
      <img src="../images/LOGO.PNG" alt="#" class="w-32 max-md:w-28" />
    </div>
    <div class="absolute p-4 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md top-1/2 left-1/2">
      <div class="flex flex-col items-center justify-center my-3 mt-10 space-y-3">
          <p>아이디<input
              class="p-2 ml-5 transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              name="userid"
              id="userid"
              v-model="userid"
            />
          </p>
          <p>비밀번호<input
              class="p-2 ml-1 transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
          </p>
        </div>
      <div class="m-2 my-5">
        <p class="pb-2 font-bold text-rose-600" v-if="loginError">{{ loginError }}</p>
        <input
          @click="LoginSequence"
          class="bg-gray-200 border-2 border-black rounded cursor-pointer hover:opacity-30 hover:bg-gray-300"
          type="submit"
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

      console.log(data)

      const token = await logincontrol(data)

      
     console.log('최종 토큰'+token)

     router.push({ path: 'devmenu' })


    }catch(e){


console.log('로그인실패 ' + e)
      loginError.value = '아이디와 비밀번호를 확인해 주세요'
      return

    } 
  }
     

  

// 로그인 유지
// const onMounted = (() => {
//   // Axios 요청 시 토큰을 헤더에 자동으로 추가
//   axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('access_token')
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}` // 토큰을 Bearer 형태로 추가
//       }
//       return config
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
//   )
// })
</script>

<style lang="scss" scoped></style>
