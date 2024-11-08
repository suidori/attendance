<template>
  <div class="bg-[#eee] font-[GmarketSansMedium]">
    <nav class="mx-0 shadow-md">
      <div class="bg-blue-300 h-12 p-3 fixed bottom-0 left-0 right-0">
        <div>

          <div>
          <a href="https://greenart.co.kr/" target="_blank">
            <div  class="justify-center flex items-center">
            <img src="../images/LOGO.png" alt="" class="h-8 max-md:w-28 cover cursor-pointer" />
            <!-- @click="logoclick" -->
            그린컴퓨터아트학원(대구지점)
          </div> 
        </a>
        </div>
         
          <div v-if="logincheckpinia"></div>

          <template v-else>
            <div class="absolute top-0 right-0 m-3 flex space-x-5">
              <div class="text-2xl">{{ username }} 님 반갑습니다.</div>
              <div class="text-xl rounded hover:bg-red-400 px-3 pt-1" @click="logout">
                <RouterLink to="/loginview" class="flex text-white items-center font-[GmarketSansMedium]"> 로그아웃 </RouterLink>
              </div>
            </div>
          </template>

        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useloginStore } from '../stores/loginpinia.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { userrole } from '../api/loginapi.js';

const loginStore = useloginStore();

const router = useRouter();

const { username, userrl, logincheckpinia } = storeToRefs(loginStore);
const { loginchecktrue } = loginStore;

const logout =async () => {

   localStorage.removeItem('token');
  loginchecktrue();
   userrole();
  router.push({ name: 'loginview' });
};

// watchEffect(() => {
//   logout();
// });

const logoclick = async () => {
  console.log('로고클릭');

  if (localStorage.getItem('token') !== null) {
    rolecheck();
  } else {
    console.log('서버연결 오류');
    router.push({ name: 'loginview' });
  }
};

const rolecheck = async () => {
  await userrole();

  if (userrl.value == 'ROLE_STUDENT') {
    console.log('학생계정');
    router.push({ name: 'stdatt' });
  } else if (userrl.value == 'ROLE_TEACHER') {
    console.log('선생계정');
    router.push({ name: 'teachertoday' });
  } else if (userrl.value == 'ROLE_MANAGER') {
    console.log('매니저계정');
    router.push({ name: 'deskcalander' });
  } else {
    console.log('맵핑문제');
  }
};
</script>

<style lang="scss" scoped></style>
