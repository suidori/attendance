<template>
  <div class="mx-auto p-10 w-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-2">과정 선택</h1>
      <hr class="border-t-2 border-blue-600" />
    </div>

    <!-- Main Section -->
    <div class="bg-white shadow p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4 inline-block">강좌 선택</h2>
      <button v-if="buttonchek" @click="golectureinsert()" class="ml-10 inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
        강좌 생성
      </button>
      <button v-if="buttonchek" @click="golecturelist()" class="ml-10 inline-block bg-red-300 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">강좌 리스트</button>

      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="검색"
          class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Course Cards -->
      <div class="mx-auto grid grid-cols-4 gap-4">
        <div v-for="course in filteredCourses" :key="course.name" class="p-4 bg-white shadow rounded-lg">
          <div class="relative h-32 mb-4">
            <img :src="course.image" alt="Course Image" class="w-full h-full object-cover rounded-lg" />
          </div>
          <h3 class="text-lg font-bold mb-2">{{ course.name }}</h3>
          <p class="text-gray-600 text-sm">{{ course.description }}</p>
          <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">자세히 보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';

const loginstore = useloginStore()

const router = useRouter();

const buttonchek = ref(true)

const search = ref('');
const courses = ref([
  { name: '강좌1', description: '기초 프로그래밍 강좌', image: '/src/images/AtenCheck.png' },
  { name: '강좌2', description: '심화 프로그래밍 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌3', description: '웹 개발 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌4', description: '데이터 분석 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌5', description: '머신러닝 기초 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌6', description: '고급 머신러닝 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌7', description: '네트워크 기초 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌8', description: '보안 기초 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌9', description: '클라우드 컴퓨팅 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌10', description: '빅데이터 분석 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌11', description: '인공지능 기초 강좌', image: 'https://via.placeholder.com/150' },
  { name: '강좌12', description: '고급 인공지능 강좌', image: 'https://via.placeholder.com/150' },
]);


const {userrl} =  storeToRefs(loginstore)


const filteredCourses = computed(() => 
  courses.value.filter((course) => course.name.toLowerCase().includes(search.value.toLowerCase()))
);

const golectureinsert = () => {
  router.push({ name: 'lectureinsert' });
};

const golecturelist = () => {
  router.push({ name: 'lectureapprovallist' });
};

onMounted(()=>{

  if(userrl.value =='ROLE_STUDENT'){
    buttonchek.value = false
  }

})

</script>

<style scoped></style>
