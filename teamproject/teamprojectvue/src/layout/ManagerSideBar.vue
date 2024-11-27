<template>
  <div class="w-40 rounded-sm">
    <div class="rounded-md bg-blue-50">
      <img src="../images/LOGO2.png" alt="Logo" />
    </div>
    <div class="bg-blue-300 h-[650px]">
      <aside class="p-3 text-gray-950 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold">매니저</div>
        <ul class="flex flex-col justify-center p-1 space-y-3 rounded-lg bg-slate-100">
          <RouterLink to="/deskcalander">
            <li>
              <div
                @click="setActiveItem('deskcalander')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskcalander' }"
                class="flex items-center py-1 my-1 mt-2 text-sm"
              >
                <img src="../images/AtenCheck.png" alt="" class="mr-2" />
                출결리스트
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300" />
          <RouterLink to="/vacationmanage">
            <li>
              <div
                @click="setActiveItem('vacationmanage')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'vacationmanage' }"
                class="flex items-center py-1 mt-2 text-sm"
              >
                <img src="../images/check.png" alt="" class="mr-2" />
                휴가 신청 관리
              </div>
            </li>
          </RouterLink>

          <hr class="border-gray-300" />
          <RouterLink to="/lectureselect">
            <li>
              <div
                @click="setActiveItem('lectureselect')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'lectureselect' }"
                class="flex items-center py-1 my-2 text-sm"
              >
                <img src="../images/wlearn.png" alt="" class="mr-2" />
                강좌 관리
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300" />
          <RouterLink to="/mypage">
            <li>
              <div
                @click="setActiveItem('mypage')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'mypage' }"
                class="flex items-center py-1 my-2 text-sm"
              >
                <img src="../images/mycon.png" alt="" class="mr-2" />
                마이페이지
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300" />
          <RouterLink to="/deskannouncelist">
            <li>
              <div
                @click="setActiveItem('deskannouncelist')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskannouncelist' }"
                class="flex items-center py-1 my-2 text-sm"
              >
                <img src="../images/announ.png" alt="" class="mr-2" />
                <p class="text-[0.8rem]">공지사항</p>
              </div>
            </li>
          </RouterLink>
          <!-- <RouterLink to="studentvacation">연습페이지로</RouterLink> -->
        </ul>
        <div class="mt-20 text-xs"></div>
      </aside>

      <div @click="logout" class=" font-[GmarketSansMedium] mt-24 border-gray-300 bg-slate-100 m-3 rounded-md cursor-pointer hover:bg-red-400"><span class="flex justify-center p-2 pb-1 ">로그아웃</span></div>

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
//  localStorage.removeItem('token');
 loginchecktrue();
   userrole();
   router.push({ name: 'loginview' });
};



</script>
