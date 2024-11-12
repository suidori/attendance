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
          <button @click="openModal(course)" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">자세히 보기</button>
        </div>
      </div>
    </div>
  </div>

 <!-- 모달 창 (v-if로 조건부 렌더링) -->
 <div v-if="isModalOpen" @click.self="closeModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-1/3 max-h-[80vh] overflow-y-auto">
        <!-- 모달 헤더 -->
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold"> {{ selectedCourse?.description }}</h2>
          
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 hover:scale-105 text-4xl">&times;</button>
        </div>
        <!-- 모달 내용 -->
        <div class="mt-4">
          <h1 class="text-xl">강좌를 설명 (예시문)</h1><br>
          <!-- <img :src="courses.image" alt="Course Image"> -->
          <p class="text-sm">IT 업계 미래를 여는 첫걸음! “{{ selectedCourse?.description }}”<br>
            <img :src="selectedCourse.image" alt="Course Image" class="w-full max-h-60 overflow-y-hidden rounded-lg mb-4" />
            (아래는 예시문 입니다)<br><br>
안녕하세요! 이번 기회를 통해 여러분께 최고의 강의, {{ selectedCourse?.description }}를 소개합니다. 이 강좌는 최신 기술 트렌드와 실무에 기반한 커리큘럼을 제공하여 여러분의 커리어를 새롭게 도약시킬 수 있는 기회를 드립니다.<br>
<br>

강의 개요<br>
<br>
• 강의 기간: 주 3회, 총 3개월 (온라인 및 오프라인 수업 지원)<br>
• 총 수강 시간: 120시간 (한 수업당 2시간씩 진행)<br>
• 수강 인원: 30명 소수 정예<br>
• 수강료: 초기 등록 시 20% 할인 혜택 제공!<br>
강의 특징<br>
<br>
• 전문 강사진<br>
실무 경험이 풍부한 IT 전문가 이정훈 강사님이 강의를 이끌어 갑니다. 이 강사님은 세계적 IT 기업에서 다년간 경력을 쌓아온 데이터 과학자로, 최신 IT 트렌드와 실무 팁을 생생하게 전달합니다. 또한, 개별적인 질문과 피드백을 적극 제공하여 학습을 돕습니다.<br>
<br>
• 맞춤형 커리큘럼<br>
이번 강좌는 초급 프로그래밍 기초부터 심화 데이터 분석 기법까지 단계별 학습을 제공하여, 프로그래밍과 데이터 분석을 한 번에 완벽히 배우고 싶은 분들께 최적의 커리큘럼입니다. 특히, Python, JavaScript, SQL 등의 필수 언어부터, 최신 인공지능과 머신러닝 기법을 활용한 데이터 분석 실습까지 다루고 있습니다.<br>
<br>
• 실무 프로젝트 기반 학습<br>
각 이론 수업 뒤에 실습 과제를 제공하여, 이론을 바탕으로 한 실제 사례와 문제 해결 능력을 길러드립니다. 마지막 프로젝트에서는 실제 회사와 유사한 데이터 분석 과제를 수행하며 실무 적응력을 높일 수 있습니다.<br>
<br>
<!-- 학습 목표<br>
<br>
1. 프로그래밍 기본기: Python과 JavaScript의 기본 문법과 알고리즘, 함수형 프로그래밍 등 기초부터 시작하여 전문가 수준까지 성장할 수 있도록 지도합니다.<br>
2. 데이터 분석 역량 강화: 통계, 데이터 시각화, 머신러닝 기초 등을 학습하고 이를 통해 데이터 기반 의사결정 역량을 키워나갑니다.<br>
3. 프로젝트 완성 및 포트폴리오 제작: 프로젝트를 통해 실무를 익히고, 수강생만의 포트폴리오를 제작하여 실질적인 성과물을 남길 수 있습니다.<br>
이 강좌를 통해 여러분이 얻게 될 것들<br> -->
<!-- <br>
• 최신 IT 기술에 대한 깊이 있는 이해<br>
• 실무에 즉시 적용 가능한 프로그래밍 및 데이터 분석 스킬<br>
• 전문가와 동료들과의 네트워크 확장 및 팀 협업 경험<br>
• 본인만의 포트폴리오 구축 기회와 미래의 커리어 성장 발판<br><br>
강의 수강생들께는 24시간 질문 답변 지원과 수료 후 직무 자문 서비스를 제공하여, 학습 이후에도 꾸준히 성장할 수 있도록 돕습니다.<br>
<br>
지금 바로 신청하세요! 빠르게 변하는 IT 산업에서 나만의 경쟁력을 강화할 수 있는 기회가 될 것입니다. -->
</p>
        </div>
        <!-- 모달 버튼 -->
        <div class="mt-6 text-right mx-4">
          <button @click="openConfirmModal" class="px-4 py-2 mx-2 bg-green-500 text-white rounded">
            신청
          </button>
          <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded">
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
        <button @click="applyForCourse" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">확인</button>
        <button @click="closeConfirmModal" class="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';

const loginstore = useloginStore();

const router = useRouter();

const buttonchek = ref(true);
const search = ref('');
const courses = ref([
  { name: '강좌1', description: '기초 프로그래밍 강좌', image: '/src/images/img1.jpg' },
  { name: '강좌2', description: '심화 프로그래밍 강좌', image: '/src/images/img2.jpg' },
  { name: '강좌3', description: '웹 개발 강좌', image: '/src/images/img3.jpg' },
  { name: '강좌4', description: '데이터 분석 강좌', image: '/src/images/img4.jpg' },
  { name: '강좌5', description: '머신러닝 기초 강좌', image: '/src/images/img5.jpg' },
  { name: '강좌6', description: '고급 머신러닝 강좌', image: '/src/images/img6.jpg' },
  { name: '강좌7', description: '네트워크 기초 강좌', image: '/src/images/img7.jpg' },
  { name: '강좌8', description: '보안 기초 강좌', image: '/src/images/img8.jpg' },
  { name: '강좌9', description: '클라우드 컴퓨팅 강좌', image: '/src/images/img9.jpg' },
  { name: '강좌10', description: '빅데이터 분석 강좌', image: '/src/images/img10.jpg' },
  { name: '강좌11', description: '인공지능 기초 강좌', image: '/src/images/img11.jpg' },
  { name: '강좌12', description: '고급 인공지능 강좌', image: '/src/images/img12.jpg' },
]);


const {userrl} =  storeToRefs(loginstore);


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

// 모달 열기/닫기 상태를 관리하는 ref
const isModalOpen = ref(false);
const selectedCourse = ref(null);
const isConfirmModalOpen = ref(false);

// 모달 열기 함수
function openModal(course) {
  selectedCourse.value = course;  
  isModalOpen.value = true;
}

// 모달 닫기 함수
function closeModal() {
  isModalOpen.value = false;
  selectedCourse.value = null;
}

function openConfirmModal(){
  isConfirmModalOpen.value = true;
}
function closeConfirmModal(){
  isConfirmModalOpen.value = false;
  isModalOpen.value = false;
}
function applyForCourse(){
  alert('신청되었습니다');
  //여기에 진짜 신청되는 기능 추가
  isConfirmModalOpen.value = false;
  isModalOpen.value = false;
}
</script>

<style scoped></style>
