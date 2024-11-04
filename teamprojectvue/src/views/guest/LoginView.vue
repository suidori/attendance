<template>
  <div class="text-center">
    <div class="flex justify-center -m-5">
      <h1 class="font-mono font-black italic text-3xl tracking-tight flex flex-col">GREENART COMPUTER ARCADEMY</h1>

    </div>
    <div class="mx-auto mt-20 w-[40rem] p-4 transform bg-white shadow-md flex flex-col justify-center items-center">
      <div class=" my-3 mt-10 space-y-3">
          <p class="">ID<input
              class="ml-5 p-3 mb-5 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
              type="text"
              name="userid"
              id="userid"
              v-model="userid"
            />
          </p>
          <p>PASSWORD<input
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
import axios from 'axios'
import { useRouter } from 'vue-router'

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
  try {
    // 백엔드로 보낼 데이터

    const response = await axios.post(

      `http://192.168.103:8080/sign/login`, data


    )
    if (response) {
      const token = response.data
      localStorage.setItem('token', token)
      console.log('로그인 성공, 토큰:' + token)
      router.push({ path: 'devmenu' })
    } else {
      console.log('로그인실패 ' + response)
      loginError.value = '아이디와 비밀번호를 확인해 주세요'
    }
  } catch (error) {
    console.error('error' + error)
    loginError.value = '로그인 에러'
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
