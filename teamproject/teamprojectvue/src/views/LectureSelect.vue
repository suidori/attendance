<template>
  <div class="w-[60vw] min-w-[620px]  mt-32">

    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">강좌 관리</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">

    <!-- Main Section -->
    <div class="bg-white shadow p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4 inline-block">강좌 선택</h2>
      <button v-if="buttonchek" @click="golectureinsert()" class="ml-10 inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
        강좌 생성
      </button>
      <button v-if="buttonchek" @click="golecturelist()" class="ml-10 inline-block bg-red-300 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">강좌 리스트</button>

      <!-- Search Bar -->
      <div class="mb-4">
        <input v-model="search" type="text" placeholder="검색"
          class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- Course Cards -->
      <div class="grid grid-cols-4 gap-4 mx-auto">
        <div v-for="course in courses" :key="course.name" class="p-4 bg-white rounded-lg shadow">
          <h3 class="mb-2 text-lg font-bold">{{ course.title }}</h3>
          <p class="text-sm">{{ course.content }}</p>
          <p class="text-sm text-gray-600">{{ course.startDate }} ~ {{ course.endDate }}</p>
          <button v-if="!ismanager" @click="lectureinfo(course)"
            class="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">자세히 보기</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedlecture" @click.self="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="w-1/3 p-6 bg-white rounded-lg">
      <!-- 모달 헤더 -->
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold"> {{ selectedlecture?.title }}</h2>

        <button @click="closeModal" class="text-4xl text-gray-400 hover:text-gray-600 hover:scale-105">&times;</button>
      </div>
      <!-- 모달 내용 -->
      <div class="mt-4">
        <h1 class="text-xl">강좌 설명</h1><br>
        <!-- <img :src="courses.image" alt="Course Image"> -->
        <p class="text-lg">IT 업계 미래를 여는 첫걸음! “{{ selectedlecture?.content }}”</p>
        <p>기간: {{ selectedlecture.startDate }} 부터 {{ selectedlecture.endDate }} 까지</p>
        <p>수업시간: {{ selectedlecture.startTime }} 부터 {{ selectedlecture.endTime }} 까지</p>
        <input class="border border-gray-300" maxlength="4" type="text" placeholder="비밀번호" v-model="password" />
      </div>
      <!-- 모달 버튼 -->

      <div class="mx-4 mt-6 text-right">
        <button @click="lecturejoin(selectedlecture.idx)" class="px-4 py-2 mx-2 text-white bg-green-500 rounded">
          신청
        </button>
        <button @click="closeModal" class="px-4 py-2 text-white bg-red-500 rounded">
          닫기
        </button>
      </div>
    </div>
</div>

  <!-- 재확인 모달 -->
  <div v-if="isConfirmModalOpen" @click.self="closeConfirmModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 w-1/3">
      <h2 class="text-xl font-bold mb-4">{{ selectedCourse?.description }}</h2>
      <p>신청하시겠습니까?</p>
      <div class="text-right mt-4">
        <button @click="lecturejoin" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">확인</button>
        <button @click="closeConfirmModal" class="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import { getavaillectureapi } from '@/api/lectureapi';
import { lecturejoinapi } from '@/api/lectureapi';


const loginstore = useloginStore();

const router = useRouter();

const buttonchek = ref(true);
const search = ref('');
const courses = ref([]);
const selectedlecture = ref(null);
const password = ref('');
const ismanager = ref(false);

const { userrl } = storeToRefs(loginstore)

const lectureinfo = (lecture) => {
  if (selectedlecture.value == null) { selectedlecture.value = lecture; }
  else { selectedlecture.value = null }
}


const golectureinsert = () => {
  router.push({ name: 'lectureinsert' });
};

// const golecturelist = () => {
//   router.push({ name: 'lectureapprovallist' });
// };

const getavaillecture = async () => {

  try {
    const res = await getavaillectureapi()
    courses.value = res.data;
  } catch (e) {
    console.log(e)
  }
}

const lecturejoin = async (idx) => {
  try {
    const data = {
      "idx": idx,
      "password": password.value
    }

    const res = await lecturejoinapi(data)
    console.log(res.data);
    alert('가입되었습니다.')
    selectedlecture.value=null;


  } catch (e) {
    if(e.response.data.message=='틀린 비밀번호입니다.'){
      alert(e.response.data.message)
      password.value='';
    }else{console.log(e)}
  }
}


onMounted(() => {

  if (userrl.value == 'ROLE_STUDENT') {
    buttonchek.value = false
  }
  if(userrl.value == 'ROLE_MANAGER') {
    ismanager.value = true;
  }
  getavaillecture()

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})

// 모달 열기/닫기 상태를 관리하는 ref
// const isModalOpen = ref(false);
const selectedCourse = ref(null);
const isConfirmModalOpen = ref(false);

// // 모달 열기 함수
// function openModal(course) {

//   selectedCourse.value = course;
//   isModalOpen.value = true;
// }

// // 모달 닫기 함수
// function closeModal() {
//   isModalOpen.value = false;
//   selectedCourse.value = null;
// }

// function openConfirmModal(){
//   isConfirmModalOpen.value = true;
// }
// function closeConfirmModal(){
//   isConfirmModalOpen.value = false;
//   isModalOpen.value = false;
// }

</script>

<style scoped></style>
