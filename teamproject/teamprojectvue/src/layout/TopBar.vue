<template>
  <header class="bg-white shadow-md py-1 px-8 h-24">
    <div class="flex items-center justify-between font-[GmarketSansMedium]">
      <!-- 로고 -->
      <button type="button">
        <router-link to="#">
          <img src="../images/LOGO2.png" alt="" class="pl-28 h-20 w-auto my-1" />
        </router-link>
      </button>
      <!-- 중간 메뉴-->
      <nav class="space-x-14 text-gray-600 -ml-32">
        <a href="#" class="hover:text-gray-900">Menu1</a>
        <a href="#" class="hover:text-gray-900">Menu2</a>
        <a href="#" class="hover:text-gray-900">Menu3</a>
        <a href="#" class="hover:text-gray-900">Menu4</a>
      </nav>
      <!-- 우측 아이콘 -->
      <div class="space-x-8 justify-center flex mr-3">
        <button type="button">
          <router-link to="/MyPage"> <img src="../images/mycon.png" alt="" /></router-link>
        </button>
        <button type="button" @click="toggleNotification">
          <img v-if="isBell1" src="../images/bell1.png" alt="" />
          <img v-else src="../images/bell2.png" alt="" />
        </button>
        <!-- 토글 알림 창-->
        <div
          v-if="showNotifications"
          class="absolute top-20 mt-2 right-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all transform origin-top duration-300 ease-in-out"
          :class="{ 'scale-y-100 ': showNotifications, 'scale-y-0': !showNotifications }"
        >
          <ul class="divide-y divide-gray-200">
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="p-4 text-gray-800 hover:bg-gray-100"
            >
              {{ notification }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isBell1 = ref(true);
const showNotifications = ref(false);
const notifications = ref([
  '새로운 알림 1',
  '새로운 알림 2',
  '새로운 알림 3',
  '새로운 알림 4',
  '새로운 알림 5'
]);
function toggleNotification() {
  isBell1.value = !isBell1.value;
  showNotifications.value = !showNotifications.value;
}
</script>
<style lang="scss" scoped></style>
