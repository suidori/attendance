<template>
  <router-link to="/guestattendance">
    <div class="w-auto bg-green-300 text-9xl">
      게스트 출결
    </div>
  </router-link>
  <router-link to="/loginview">
    <div class="w-auto bg-blue-300 text-9xl">
      로그인
    </div>
  </router-link>
  <router-link to="/join">
    <div class="w-auto bg-yellow-300 text-9xl">
      회원가입
    </div>
  </router-link>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped></style>
