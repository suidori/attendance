<template>
  <SideBar class="absolute"></SideBar>
  <h1 class="py-4 font-bold text-blue-800 mx-60">마이페이지</h1>
  <hr class="w-2/3 mx-auto" />

  <div class="flex items-start justify-center p-6">
    <!-- 사진 영역 -->
    <aside>
      <img src="../images/stude.jpg" alt="#" class="flex w-40" />
    </aside>

    <!-- 사용자 정보 영역 -->
    <div class="px-10 py-6 space-y-4">
      <!-- 이름 -->
      <div class="flex">
        <span class="w-24 font-bold text-gray-800">이름 </span>
        <span class="text-gray-500">김철수</span>
      </div>
      <!-- 전화번호 -->
      <div class="flex">
        <span class="w-24 font-bold text-gray-800">전화번호</span>
        <span class="text-gray-500">010-XXXX-XXXX</span>
      </div>
      <!-- 이메일 -->
      <div class="flex">
        <span class="w-24 font-bold text-gray-800">e-mail</span>
        <span class="text-gray-500">없음</span>
      </div>
    </div>
  </div>

  <hr class="w-2/3 mx-auto border-2 border-b-blue-900" />
  <h1 class="py-4 font-bold text-blue-800 mx-60">수강중인 강좌</h1>
  <div class="flex flex-col items-center justify-center mx-60 ">
    <div class="flex my-3">
      <h class="flex items-center justify-center w-20 text-sm text-center text-white bg-blue-900 border">강좌1</h>
      <input type="text" name="강의정보" id="" class="h-10 mx-3 text-xs border w-96" placeholder=" 강의정보-강사:000 / 강의시간 0교시"/>
    </div>
    <div class="flex">
      <h class="flex items-center justify-center w-20 text-sm text-center text-white bg-blue-900 border">강좌2</h>
      <input type="text" name="강의정보" id="" class="h-10 mx-3 text-xs border w-96" placeholder=" 강의정보-강사:000 / 강의시간 0교시"/>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/component/StudentSideBar.vue'
</script>

<style lang="scss" scoped></style>
