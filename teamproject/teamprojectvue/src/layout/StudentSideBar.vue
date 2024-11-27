<template>
  <div class="w-40 rounded-sm">
    <div class="bg-blue-50 rounded-md">
      <img src="../images/LOGO2.png" alt="Logo" />
    </div>
    <div class="bg-blue-300 h-[650px]">
      <aside class="p-3 text-gray-950 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold"> 학생</div>
        <ul class="space-y-3 bg-slate-100 p-1 rounded-lg flex flex-col justify-center">
          <RouterLink to="/stdatt">
            <li>
              <div
                @click="setActiveItem('attendance')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'attendance' }"
                class="my-1 py-1 text-sm flex items-center mt-2"
              >
                <img src="../images/AtenCheck.png" alt="" class="mr-2" />
                내 출결 관리
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/studentvacation">
            <li>
              <div
                @click="setActiveItem('vacation')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'vacation' }"
                class="mt-2 py-1 text-sm flex items-center"
              >
                <img src="../images/VacaSub.png" alt="" class="mr-2" />
                휴가 신청
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/lectureselect">
            <li>
              <div

                @click="setActiveItem('course')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'course' }"
                class="mt-2 py-1 text-sm flex items-center"
              >
                <img src="../images/stuhead.png" alt="" class="mr-2" />
                과정 선택
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/mypage">
            <li>
              <div

                @click="setActiveItem('mypage')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'mypage' }"
                class="my-2 py-1 text-sm flex items-center"
              >
                <img src="../images/mycon.png" alt="" class="mr-2" />
                마이페이지
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/studentannouncelist">
            <li>
              <div
                @click="setActiveItem('studentannouncelist')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'studentannouncelist' }"
                class="my-2 py-1 text-sm flex items-center"
              >
                <img src="../images/announ.png" alt="" class="mr-2" />
                공지사항
              </div>
            </li>
          </RouterLink>
        </ul>
        <div class="mt-20 text-xs">

        </div>
      </aside>
      <div @click="logout" class=" font-[GmarketSansMedium] mt-24 border-gray-300 bg-slate-100 m-3 rounded-md cursor-pointer hover:bg-red-400"><span class="p-2 pb-1 flex justify-center ">로그아웃</span></div>
    </div>
  </div>
</template>

<script setup>
import { useloginStore } from '../stores/loginpinia.js';
import { userrole } from '../api/loginapi.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';

const router = useRouter()

const loginStore = useloginStore()

const {userrl} = storeToRefs(loginStore)

const { loginchecktrue } = loginStore;


const activeItem = ref(''); // Tracks the active item

// Sets the active item based on the button clicked
const setActiveItem = (item) => {
  activeItem.value = item;
};

const logout =async () => {

userrl.value =null

Cookies.remove('token')
// localStorage.removeItem('token');
loginchecktrue();
 userrole();
 router.push({ name: 'loginview' });
};

</script>
