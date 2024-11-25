<template>
  <div class="w-[14vw] rounded-sm bg-indigo-900">
    <!-- <div class="bg-blue-50 rounded-md">
      <img src="../images/LOGO2.png" alt="Logo" />
    </div> -->
    <div class=" h-[650px] bottom-10">
      <aside class="p-3 text-gray-950 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold text-white">매니저</div>
        <ul class="space-y-3 bg-slate-100 p-1 rounded-lg flex flex-col justify-center">
          <RouterLink to="/deskcalander">
            <li>
              <div
                @click="setActiveItem('deskcalander')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskcalander' }"
                class="my-1 py-1 text-sm flex items-center mt-2"
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
                class="mt-2 py-1 text-sm flex items-center"
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
                class="my-2 py-1 text-sm flex items-center"
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
                class="my-2 py-1 text-sm flex items-center"
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
                class="my-2 py-1 text-sm flex items-center"
              >
                <img src="../images/announ.png" alt="" class="mr-2" />
                <p class="text-[0.8rem]">공지사항 리스트</p>
              </div>
            </li>
          </RouterLink>
          <!-- <RouterLink to="studentvacation">연습페이지로</RouterLink> -->
        </ul>
        <div class="mt-20 text-xs"></div>
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

 localStorage.removeItem('token');
 loginchecktrue();
   userrole();
   router.push({ name: 'loginview' });
};



</script>
