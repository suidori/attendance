<template>
  <div class="bg-[#eee] font-[GmarketSansMedium]">
    <nav class="mx-0 shadow-md">
      <div class="bg-blue-300 h-12 p-2 fixed bottom-0 left-0 right-0">
        <div class="flex justify-between items-start">
          <div class="text-xs">
            <p>주소 : 대구광역시 중구 중앙대로 394, 제일빌딩 5F</p>
            <p>전화 : 053-572-1005 / FAX : 053-422-9122</p>
          </div>
          <div>
            <a href="https://greenart.co.kr/" target="_blank">
              <div class="absolute flex items-center left-[41%]">
                <img src="../images/LOGO.png" alt="" class="h-8 max-md:w-28 cover cursor-pointer" />
                <!-- @click="logoclick" -->
                그린컴퓨터아트학원(대구지점)
              </div>
            </a>
          </div>

          <div v-if="logincheckpinia"></div>

          <template v-else>
            <div class="flex space-x-5">
              <div class="text-2xl mr-10">
                {{ username }} {{ mapUserRole(userrl) }}님 반갑습니다.
              </div>
              <!-- <div class="text-xl rounded hover:bg-blue-800 px-3 pt-1" @click="logout">
                <RouterLink to="/loginview" class="flex text-white items-center font-[GmarketSansMedium]"> 로그아웃 </RouterLink>
              </div> -->
            </div>
          </template>
          <button
            @click.stop="handleInstallClick"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2 -mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v12m0 0l-3-3m3 3l3-3m9 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>앱 설치</span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue';
import { useloginStore } from '../stores/loginpinia.js';
import { storeToRefs } from 'pinia';
// import { useRouter } from 'vue-router';

// import { userrole } from '../api/loginapi.js';

const loginStore = useloginStore();

// const router = useRouter();

const { username, userrl, logincheckpinia } = storeToRefs(loginStore);
// const { loginchecktrue } = loginStore;

// const logout =async () => {

//    localStorage.removeItem('token');
//   loginchecktrue();
//    userrole();
//   router.push({ name: 'loginview' });
// };

function mapUserRole(userRole) {
  //role에 따라 출력을 바꿔주는 펑션기능
  switch (userRole) {
    case 'ROLE_STUDENT':
      return '학원생';
    case 'ROLE_TEACHER':
      return '선생';
    case 'ROLE_MANAGER':
      return '매니저';
    default:
      return ' ';
  }
}

// watchEffect(() => {
//   logout();
// });

// const logoclick = async () => {
//   console.log('로고클릭');

//   if (localStorage.getItem('token') !== null) {
//     rolecheck();
//   } else {
//     console.log('서버연결 오류');
//     router.push({ name: 'loginview' });
//   }
// };

// const rolecheck = async () => {
// await userrole();

//   if (userrl.value == 'ROLE_STUDENT') {
//     console.log('학생계정');
//     router.push({ name: 'stdatt' });
//   } else if (userrl.value == 'ROLE_TEACHER') {
//     console.log('선생계정');
//     router.push({ name: 'teachertoday' });
//   } else if (userrl.value == 'ROLE_MANAGER') {
//     console.log('매니저계정');
//     router.push({ name: 'deskcalander' });
//   } else {
//     console.log('맵핑문제');
//   }
// };

let deferredPrompt = null;
watchEffect(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });
});
const handleInstallClick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      deferredPrompt = null;
    }
  } else {
    alert('홈 화면에 추가할 수 없습니다.');
  }
};
</script>

<style lang="scss" scoped></style>
