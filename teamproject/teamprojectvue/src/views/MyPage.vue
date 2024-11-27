<template>
  <div class="ml-5 m-3 border border-gray-400 w-full p-10">
    <div class="">
      <h1 class="py-4 font-bold text-blue-800 mx-60">마이페이지</h1>
      <hr class="w-full mx-auto border-blue-900" />

      <div class="flex items-center justify-center p-6">
        <div class="bg-white flex p-3 rounded-xl">
          <!-- 사진 영역 -->
          <aside>
            <img v-if="role === '학원생'" src="../images/stude.jpg" alt="Student Image" class="w-40" />
            <img v-else-if="role === '선생님'" src="../images/Teacha.jpg" alt="Teacher Image" class="w-40" />
            <img v-else-if="role === '매니저'" src="../images/manager.jpg" alt="Manager Image" class="w-40" />
            <!-- <img v-else src="../images/default.jpg" alt="Default Image" class="w-40" />/ -->
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
      <h1 class="py-4 font-bold text-blue-800 mx-60 mt-5">내 강좌</h1>
      <div class="flex flex-col items-center justify-center mx-60 mb-5">
        <div v-if="lecturecheck" v-for="(lecture, index) in lecturelist" :key="lecture.idx" class="flex my-3">
          <h v-if="lecture.state == '수강중'" class="flex items-center justify-center w-20 text-sm text-center bg-blue-400 border rounded">
            수강 중</h>
          <h v-else class="flex items-center justify-center w-20 text-sm text-center text-white bg-gray-500 border rounded">
            강좌{{ index }}</h>
          <div class="h-10 mx-3 text-xs border w-96 rounded p-3">{{ lecture.title }}</div>
        </div>

        <div v-else-if="managercheck">
          <h1>매니저 계정입니다.</h1>
        </div>
        <div v-else>
          <h1>수강중인 강좌가 없습니다.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profiledata } from '@/api/student';
import { getmylecture } from '@/api/student';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const username = ref('');
const phoneNumber = ref('');
const email = ref('');
const role = ref('');
const lecturelist = ref([]);
const lecturecheck = ref(false)
const managercheck = ref(false)


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
    managercheck.value = true
  }

  const arrres = await getmylecture();

  if (arrres !== null) {
    const sortedLectures = arrres.data.sort((a, b) => {
      if (a.state === '수강중' && b.state !== '수강중') return -1;
      if (b.state === '수강중' && a.state !== '수강중') return 1;

      return new Date(b.endDate) - new Date(a.endDate);
    });

    lecturelist.value = sortedLectures;

    console.log(lecturelist.value[0].content);

    lecturecheck.value = true;
  }
if(Cookies.get('token')==null){
  // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }

});
</script>

<style lang="scss" scoped></style>
