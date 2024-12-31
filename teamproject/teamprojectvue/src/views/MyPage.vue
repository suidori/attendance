<template>
    <div>


    <div class="w-[60vw] min-w-[620px] mt-32">
      <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">마이페이지</h1>
      <hr class="w-full mx-auto border-blue-900 border-2" />


        <div class="bg-white flex justify-between rounded-xl my-8 ml-10">
          <!-- 사진 영역 -->
          <div class="ml-16 mr-4 w-40">
            <img v-if="role === '학원생'" src="../images/stude.jpg" alt="Student Image" class="w-40" />
            <img v-else-if="role === '선생님'" src="../images/Teacha.jpg" alt="Teacher Image" class="w-40" />
            <img v-else-if="role === '매니저'" src="../images/manager.jpg" alt="Manager Image" class="w-40" />
            <img v-else src="../images/default.jpg" alt="Default Image" class="w-40" />
          </div>

          <!-- 사용자 정보 영역 -->
          <div class="pr-10 py-6 space-y-4">
            <!-- 이름 -->
            <div class="flex ">
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
          <!-- 개인 정보 수정-->
          <div class="justify-center items-center flex mx-20">
            <!-- 개인정보 수정 버튼 기능 추가 필요함-->
            <button class="border flex items-center justify-center w-32 bg-indigo-900 text-sm text-white p-1">개인 정보 수정</button>
          </div>
        </div>

      <!-- 내 강좌 -->
      <hr class="w-full mx-auto border-blue-900 border-2" />
      <h1 class="py-4 font-bold text-blue-800 text-2xl ml-2">내 강좌</h1>
      <div class="flex flex-col mb-5 mx-20">
        <div v-if="lecturecheck" v-for="(lecture, index) in lecturelist" :key="lecture.idx" class="flex my-3">
          <h v-if="lecture.state == '수강중'" class="flex items-center justify-center w-32 text-sm text-center bg-blue-400 border rounded">
            수강 중</h>
          <h v-else class="flex items-center justify-center w-32 text-sm text-center text-white bg-gray-500 border rounded">
            강좌{{ index }}</h>
          <div class="h-10 mx-3 items-center flex border rounded p-6 w-full">{{ lecture.title }}</div>
        </div>

        <div v-else-if="managercheck">
          <h1>매니저 계정입니다.</h1>
        </div>
        <div v-else>
          <h1>수강중인 강좌가 없습니다.</h1>
        </div>
        <div class="flex justify-end">
        <button class="w-32 my-4 p-1 border flex items-center justify-center bg-indigo-900 text-sm text-white"> 강좌 관리 </button>
      </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { profiledata } from '@/api/student';
import { getmylecture } from '@/api/student';
import HeaderLayout from '@/layout/HeaderLayout.vue';
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

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }

});
</script>

<style lang="scss" scoped></style>
