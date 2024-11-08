<template>
  <div class="m-3 border border-gray-400 w-full p-10">
    <div class="">
      <h1 class="py-4 font-bold text-blue-800 mx-60">마이페이지</h1>
      <hr class="w-full mx-auto border-blue-900" />

      <div class="flex items-center justify-center p-6">
        <div class="bg-white flex p-3 rounded-xl">
          <!-- 사진 영역 -->
          <aside>
            <img src="../images/stude.jpg" alt="../images/stude.jpg" class="w-40" />
          </aside>

          <!-- 사용자 정보 영역 -->
          <div class="px-10 py-6 space-y-4">
            <!-- 이름 -->
            <div class="flex">
              <span class="w-24 font-bold text-gray-800">이름 </span>
              <span class="text-gray-500">{{ username }} ({{ role }})</span>
            </div>
            <!-- 전화번호 -->
            <div class="flex">
              <span class="w-24 font-bold text-gray-800">전화번호</span>
              <span class="text-gray-500">{{ phoneNumber }}</span>
            </div>
            <!-- 이메일 -->
            <div class="flex">
              <span class="w-24 font-bold text-gray-800">e-mail</span>
              <span class="text-gray-500">{{ email }}</span>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-full mx-auto border-blue-900" />
      <h1 class="py-4 font-bold text-blue-800 mx-60">수강중인 강좌</h1>
      <div class="flex flex-col items-center justify-center mx-60">
        <div v-for="(item, index) in lecturelist" :key="item.lecturelist" class="flex my-3">
          <h class="flex items-center justify-center w-20 text-sm text-center text-white bg-blue-900 border rounded">강좌{{ index + 1 }}</h>
          <div class="h-10 mx-3 text-xs border w-96 rounded p-3">{{ item.content }}</div>
        </div>
      </div>
      <hr class="w-full mx-auto border-blue-900 py-3 mt-8" />
      <div>
        <h1 class="py-4 font-bold text-blue-800 ml-60">내 휴가신청 보기</h1>
        <div class="flex justify-center items-center">
          <div class="bg-white">
            <a>링크 연결</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profiledata } from '@/api/student';
import { getmylecture } from '@/api/student';
import { onMounted, ref } from 'vue';

const username = ref('');
const phoneNumber = ref('');
const email = ref('');
const role = ref('');
const lecturelist = ref([]);

onMounted(async () => {
  const profileres = await profiledata();

  username.value = profileres.data.name;
  phoneNumber.value = profileres.data.phoneNumber;
  email.value = profileres.data.email;

  if (profileres.data.role == 'ROLE_STUDENT') {
    role.value = '학원생';
  } else if (profileres.data.role == 'ROLE_TEACHER') {
    role.value = '선생님';
  } else {
    role.value = '매니저';
  }

  const arrres = await getmylecture();

  lecturelist.value = arrres.data;

  console.log(lecturelist.value[0].content);
});
</script>

<style lang="scss" scoped></style>
