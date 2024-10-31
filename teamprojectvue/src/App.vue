<template>
  <nav class="mx-0 bg-blue-300 shadow-md">
    <div class="">
      <div class="justify-center flex items-center ">
        <RouterLink to="/">
          <img src="./images/LOGO.PNG" alt="" class="w-32 max-md:w-28 ml-3">
        </RouterLink>
      </div>
      <div class="flex text-white z-10 justify-end">
        <div class="mr-2"><RouterLink to="/loginview">| 로그인</RouterLink></div>
        <div class="mr-2"><RouterLink to="/jointermsofuse">| 회원가입</RouterLink></div>
        <div class="mr-2"><RouterLink to="/vacationform">| 휴가신청</RouterLink></div>
        <div class="mr-20"><RouterLink to="/laboview">| 연구실</RouterLink></div>
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
</script>

<style lang="scss" scoped></style>
