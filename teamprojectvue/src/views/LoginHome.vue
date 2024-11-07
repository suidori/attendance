<template>
  <div class="flex items-center justify-center w-full space-x-16 h-full">


    <!-- 교직원/학생 로그인 -->
    <div class="w-2/5 min-w-64 h-96 ">
      <h3 class="mb-2 text-lg font-bold text-blue-700">교직원/학생 로그인</h3>
      <div class="bg-white shadow-xl shadow-blue-300 rounded-3xl p-6 flex flex-col items-center bg-gradient-to-t from-sky-200 to-90% ">
        <img src="../images/stu.png" alt="" class="w-24" />

        <p class="mt-2 text-sm text-gray-500 py-5 font-bold ">교직원/학생 전용 로그인입니다.</p>
        <div class="flex items-center justify-center mt-4">
          <RouterLink to="/loginview">
            <button type="button" class="font-semibold text-blue-700 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="p-5 my-4 text-2xl whitespace-nowrap">교직원/학생</p>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 비로그인 (출결용) -->
    <div class=" w-2/5 min-w-64 h-96">
      <h3 class="mb-2 text-lg font-bold text-blue-700">비로그인 (출결용)</h3>
      <div
        class="bg-white shadow-lgxl shadow-blue-300 rounded-3xl p-6 flex flex-col items-center bg-gradient-to-t from-sky-200 to-90%"
      >
        <img src="../images/tea.png" alt="#" class="w-24" />
        <p class="mt-2 text-sm text-gray-500 py-5 font-bold">출결 전용 페이지입니다.</p>
        <div class="flex items-center justify-center mt-4">
          <RouterLink to="/guestattendance">
            <button type="button" class="flex items-center justify-center font-semibold text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="p-5 my-4 text-2xl whitespace-nowrap">비로그인</p>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center mt-10">
    <p class="text-sm font-bold text-blue-900">회원이 아니신가요?</p>
    <button
      @click="ToJoinview()"
      class="px-10 py-3 text-sm font-bold text-white bg-blue-900 border-2 rounded-sm"
    >
      회원가입 페이지로이동하기
    </button>
  </div>
  <div class="mb-64">

</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const ToJoinview = () => {
  router.push({ path: 'jointermsofuse' })
}
</script>

<style lang="scss" scoped></style>
