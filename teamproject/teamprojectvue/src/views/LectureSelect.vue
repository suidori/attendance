<template>
 
  <div class="ml-7 mb-20 mx-auto p-5 w-full border border-gray-400">
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
        <div v-for="course in courses" :key="course.name" class="p-4 bg-white shadow rounded-lg">
          <h3 class="text-lg font-bold mb-2">{{ course.title }}</h3>
          <p class="text-gray-600 text-sm">{{ course.content }}</p>
          <p>{{ course.startDate }} 부터 {{ course.endDate }} 까지</p>
          <button @click="lectureinfo(course)" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">자세히 보기</button>
        </div>
      </div>
    </div>
  </div>
<div class="bg-green-500" v-if="selectedlecture">
  <p>{{ selectedlecture.title }}</p>
  <p>{{ selectedlecture.content }}</p>
  <p>{{selectedlecture.startDate}} 부터 {{ selectedlecture.endDate }} 까지</p>
  <p>{{selectedlecture.startTime}} 부터 {{ selectedlecture.endTime }} 까지</p>
  <input type="text" placeholder="0000" v-model="password" />
  <button @click="lecturejoin(selectedlecture.idx)" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">수강하기</button>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const loginstore = useloginStore()

const router = useRouter();

const buttonchek = ref(true)

const search = ref('');
const courses = ref([]);
const selectedlecture = ref(null);
const password = ref('');


const {userrl} =  storeToRefs(loginstore)



const lectureinfo = (lecture) => {
  if(selectedlecture.value == null) {selectedlecture.value = lecture;}
  else{selectedlecture.value=null}
}


const golectureinsert = () => {
  router.push({ name: 'lectureinsert' });
};

const golecturelist = () => {
  router.push({ name: 'lectureapprovallist' });
};

const getavaillecture = async () => {
  try{
    const res = await axios.get('http://greencomart.kro.kr:716/lecture/availlist');
    courses.value = res.data;
  }catch(e){
    console.log(e)
  }
}

const lecturejoin = async (idx) => {
  try{ 
    const data = {
      "idx": idx,
      "password": password.value
    }
    const token = localStorage.getItem('token');
    const res = await axios.post('http://greencomart.kro.kr:716/lecture/join', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res.data);
  }catch(e){
    console.log(e)
  }
}

onMounted(()=>{

  if(userrl.value =='ROLE_STUDENT'){
    buttonchek.value = false
  }
  getavaillecture()
})

</script>

<style scoped></style>
