<template>
  <div class="flex flex-col items-center p-10 space-y-6">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-blue-900">회원가입</h2>

    <!-- Step Progress Bar -->
    <div class="flex justify-center space-x-2 w-full max-w-2xl">
      <div class="step flex flex-col items-center p-4 text-center bg-blue-900 text-white rounded-lg w-1/4">
        <p class="text-xl font-bold">01.</p>
        <p class="text-sm">이용약관 및 개인정보 수집 및 이용에 관한 동의</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-white text-gray-700 border border-gray-300 rounded-lg w-1/4">
        <p class="text-xl font-bold">02.</p>
        <p class="text-sm">본인인증 및 기본정보 입력</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-blue-800 text-white rounded-lg w-1/4">
        <p class="text-xl font-bold">03.</p>
        <p class="text-sm">아이디 및 패스워드 설정</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-gray-100 text-gray-500 rounded-lg w-1/4">
        <p class="text-xl font-bold">04.</p>
        <p class="text-sm">회원가입 완료</p>
      </div>
    </div>

    <!-- Confirmation Message -->
    <h3 class="text-xl font-semibold text-blue-900">회원가입이 완료되었습니다!</h3>

    <!-- Return to Login Button -->
    <div class="flex flex-col items-center p-8 bg-blue-50 rounded-lg shadow-md space-y-4">
      <p class="text-lg font-semibold text-blue-900">로그인 페이지로 돌아가기</p>
      <button
        @click="goToLogin"
        class="flex items-center px-6 py-3 text-blue-700 font-semibold border-2 border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        로그인 페이지로 돌아가기
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login') // 원하는 로그인 페이지 경로로 변경
}
</script>

<style scoped>
.step {
  flex: 1;
}
</style>
