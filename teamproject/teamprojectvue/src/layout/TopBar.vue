<template>

    <nav class="mx-0 shadow-md bg-blue-300 h-20">
      <div class="flex justify-between items-center h-full px-10">
    <!-- 로고 (가운데 정렬) -->
    <div class="flex justify-center items-center">
      <img src="../images/LOGO.png" alt="" class="w-20 cursor-pointer" @click="logoclick" />
    </div>

          <!-- <StudentSideBar  class="" v-if="sidecheck"/> -->

          <div class="justify-end">
            <div class="mr-2" v-if="logincheckpinia">
              <!-- <RouterLink to="/loginview">| 로그인</RouterLink> -->
            </div>
            <div class="mr-2" v-if="logincheckpinia">
              <!-- <RouterLink to="/jointermsofuse">| 회원가입</RouterLink> -->
            </div>
            <div v-else>
              <div class="flex items-end float-right mr-10 text-xl rounded hover:bg-red-400" @click="logout">
                <RouterLink to="/loginview"
                  ><a class="flex text-white items-center font-[GmarketSansMedium]">로그아웃 <img class="w-8" src="./images/LoutIcon.png" alt="" /></a
                ></RouterLink>
              </div>
              <div class="float-right mr-6 text-2xl">{{ username }} 님 반갑습니다.</div>
            </div>
          </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>




