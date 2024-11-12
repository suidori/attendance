<template>
  <div class="w-40 rounded-sm">
    <div class="bg-blue-50 rounded-md">
      <img src="../images/LOGO2.png" alt="Logo" />
    </div>
    <div class="bg-blue-300">
      <aside class="p-3 text-gray-950 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold"> 선생님 메뉴</div>
        <ul class="space-y-3 bg-slate-100 p-1 rounded-lg flex flex-col justify-center">
          <RouterLink to="/teachertoday">
            <li>
              <div
                @click="setActiveItem('attendance')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'attendance' }"
                class="my-1 py-1 text-sm flex items-center mt-2"
              >
                <img src="../images/AtenCheck.png" alt="" class="mr-2" />
                금일 출결 현황
              </div>
            </li>
          </RouterLink>
          <!-- <hr class="border-gray-300"/>
          <RouterLink to="/vacationmanage">
            <li>
              <div
                @click="setActiveItem('vacationmanage')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'vacationmanage' }"
                class="mt-2 py-1 text-sm flex items-center"
              >
                <img src="../images/check.png" alt="" class="mr-2" />
                휴가 제출 관리??
              </div>
            </li>
          </RouterLink> -->
          <hr class="border-gray-300"/>
          <RouterLink to="/teachercalander">
            <li>
              <div

                @click="setActiveItem('course')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'course' }"
                class="mt-2 py-1 text-sm flex items-center"
              >
                <img src="../images/stuhead.png" alt="" class="mr-2" />
                학생 출결 조회
              </div>
            </li>
          </RouterLink>

          <hr class="border-gray-300"/>
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
          <RouterLink to="/DeskAnnounceList">
            <li>
              <div

                @click="setActiveItem('announcement')"
                :class="{ 'bg-blue-200 rounded-md': activeItem === 'announcement' }"
                class="my-2 py-1 text-sm flex items-center"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref(''); // Tracks the active item

// Sets the active item based on the button clicked
const setActiveItem = (item) => {
  activeItem.value = item;
};
</script>
