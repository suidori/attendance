<template>
  <div
    class="fixed w-24 p-4 text-blue-900 transition-colors duration-200 transform -translate-y-1/2 bg-white rounded-md shadow-lg lg:w-28 max-sm:hidden top-1/2 right-5 lg:right-8 xl:right-16 hover:bg-slate-100"
  >
    <!-- 배너 내용 -->
    <h1 class="text-2xl font-bold text-center">Quick</h1>
    <h2 class="mb-2 text-lg font-semibold text-center">Menu</h2>
    <hr class="border-gray-300" />
    <!-- 버튼 -->
     <RouterLink to="attendancecheck">
    <button
      class="block px-3 py-1 mt-2 text-blue-900 transition-colors duration-300 bg-white rounded hover:bg-gray-200">

      <img src="../images/calln.jpg" alt="#" class="w-20" />
      <p class="text-sm">출결관리</p>
    </button>
  </RouterLink>
    <button
      class="block px-3 py-1 mt-2 text-blue-900 transition-colors duration-300 bg-white rounded hover:bg-gray-200"
      @click="handleClick"
    >
      <img src="../images/Ques.jpg" alt="#" class="w-20" />
      <p class="text-sm">문의사항</p>
    </button>
    <button
      class="block px-3 py-1 mt-2 text-blue-900 transition-colors duration-300 bg-white rounded hover:bg-gray-200"
      @click="handleClick"
    >
      <img src="../images/homeIcon.jpg" alt="#" class="w-20" />
      <p class="text-sm">내페이지</p>
    </button>
    <button
      class="block px-3 py-1 mt-2 text-blue-900 transition-colors duration-300 bg-white rounded hover:bg-gray-200"
      @click="handleClick"
    >
      <img src="../images/napal.jpg" alt="#" class="w-20" />
      <p class="text-sm">알림마당</p>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push({ name: 'mypage' })
}
</script>

<style scoped>
/* 추가적인 스타일이 필요하다면 여기에 작성 */
</style>
