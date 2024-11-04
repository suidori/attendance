<template>

  <nav class="relative mx-0">
    <div class="flex justify-between">
      <div class="z-10 flex items-center space-x-4">
        <div class="w-1/6"><RouterLink to="/">
          <img src="./images/LOGO.PNG" alt="" class="ml-3  max-md:w-28">
        </RouterLink></div>
      </div>
      <div class="z-10 flex items-center text-white">

        <div class="mr-2"><RouterLink to="/loginview">| 로그인</RouterLink></div>
        <div class="mr-2"><RouterLink to="/jointermsofuse">| 회원가입</RouterLink></div>
        <div class="mr-2"><RouterLink to="/vacationform">| 휴가신청</RouterLink></div>
        <div class="mr-20"><RouterLink to="/laboview">| 연구실</RouterLink></div>
      </div>

      <div class="absolute inset-0 h-40 bg-gradient-to-t from-blue-200">
        <img class="w-full h-40 -z-30" src="../src/images/wbar_t.jpg" alt="" />
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

</script>

<style lang="scss" scoped></style>
