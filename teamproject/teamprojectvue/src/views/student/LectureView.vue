<template>
  <div class="mx-auto p-10 w-full  mt-32">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-2">과정 선택</h1>

      <hr class="border-t-2 border-blue-600" />
    </div>

    <!-- Main Section -->

    <div class="bg-white shadow p-6 rounded-lg">
      <h2 class="text-xl font-bold mb-4 inline-block">강좌 선택</h2>

      <!-- <button @click="golectureinsert()" class="ml-10 inline-block bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
        강좌 생성
      </button>
      <button @click="golecturelist()" class="ml-10 inline-block bg-red-300 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">강좌 리스트</button> -->

      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="검색"
          class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Course Buttons -->
      <div class="mx-auto grid grid-cols-4 gap-4">
        <button v-for="course in filteredCourses" :key="course" class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {{ course }}
        </button>
      </div>
    </div>

    <!-- Duplicate Section (Optional) -->
    <div class="mx-auto p-6 mt-10 bg-white rounded-lg shadow">
      <div class="grid grid-cols-4 gap-4">
        <button v-for="course in courses" :key="course + '-dup'" class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {{ course }}
        </button>
      </div>
    </div>
  </div>
  <div class="mb-64"></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
const courses = ['강좌1', '강좌2', '강좌3', '강좌4', '강좌5', '강좌6', '강좌7', '강좌8', '강좌9', '강좌10', '강좌11', '강좌12'];

const filteredCourses = computed(() => courses.filter((course) => course.toLowerCase().includes(search.value.toLowerCase())));

const golectureinsert = () => {
  router.push({ name: 'lectureinsert' });
};

const golecturelist = () => {
  router.push({ name: 'lectureapprovallist' });
};

onMounted(()=>{

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})
</script>

<style scoped></style>
