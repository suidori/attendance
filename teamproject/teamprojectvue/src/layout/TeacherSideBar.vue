<template>
  <div class="w-[14vw] rounded-sm bg-indigo-900">
    <!-- <div class="rounded-md bg-blue-50">
      <img src="../images/LOGO2.png" alt="Logo" />
    </div> -->
    <div class="h-[650px] bottom-10 ">
      <aside class="p-3 text-gray-950 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold text-white"> 선생님</div>
        <ul class="flex flex-col justify-center p-1 space-y-3 rounded-lg bg-slate-100">
          <RouterLink to="/teachertoday">
            <li>
              <div
                @click="setActiveItem('attendance')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'attendance' }"
                class="flex items-center py-1 my-1 mt-2 text-sm"
              >
                <img src="../images/AtenCheck.png" alt="" class="mr-2" />
                금일 출결 현황
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/teachercalander">
            <li>
              <div
                @click="setActiveItem('course')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'course' }"
                class="flex items-center py-1 mt-2 text-sm"
              >
                <img src="../images/stuhead.png" alt="" class="mr-2" />
                학생 출결 조회
              </div>
            </li>
          </RouterLink>
          <hr class="border-gray-300"/>
          <RouterLink to="/teachervacation">
            <li>
              <div
                @click="setActiveItem('vacation')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'vacation' }"
                class="flex items-center py-1 mt-2 text-sm"
              >
                <img src="../images/VacaSub.png" alt="" class="mr-2" />
                휴가 신청 현황
              </div>
            </li>
          </RouterLink>

          <hr class="border-gray-300"/>
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
          <hr class="border-gray-300"/>
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
          <hr class="border-gray-300"/>
          <RouterLink to="/teacherannouncelist">
            <li>
              <div

                @click="setActiveItem('announcement')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'announcement' }"
                class="flex items-center py-1 my-2 text-sm"
              >
                <img src="../images/announ.png" alt="" class="mr-2" />
                공지사항
              </div>
            </li>
          </RouterLink>
          <!-- <RouterLink to="studentvacation">연습페이지로</RouterLink> -->
        </ul>
        <div class="mt-20 text-xs">

        </div>
      </aside>
      <div @click="logout" class=" font-[GmarketSansMedium] mt-9 border-gray-300 bg-slate-100 m-3 rounded-md cursor-pointer hover:bg-red-300 "><span class="flex justify-center p-2 pb-1 ">로그아웃</span></div>
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
