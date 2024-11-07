<template>
  <StudentSideBar class="absolute"></StudentSideBar>
  <div class="flex flex-col items-center space-y-12 p-8 bg-gray-50 min-h-screen">
 
    <!-- 헤더 제목 -->
    <div class="text-center">
      <h1 class="text-4xl font-bold">GREEN SOFTWARE TRAINING</h1>
      <p class="text-gray-600 mt-2">비전공자에서 취업까지 나에게 맞는 과정 찾아보기</p>
      <div class="border-t-2 border-gray-300 w-16 mx-auto mt-4"></div>
    </div>

    <!-- 큰 비디오 컨테이너 -->
    <div class="w-full max-w-4xl h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
      <iframe width="640" height="360" src="https://www.youtube.com/embed/7q0qN3m2tN8" title="[FM그린] 졸업생인터뷰 강성관 님 1화 - 영상촬영 및 제작 | 국비지원 강의 후기 | 대구그린컴퓨터아트학원" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <!-- <p class="text-gray-500">영상이 여기에 표시됩니다</p> -->
    </div>

    <!-- 섹션 제목 -->
    <h2 class="text-xl font-semibold text-blue-800">수업 과정 선택</h2>
    <div class="border-t-2 border-gray-300 w-16 mx-auto mb-8"></div>

    <!-- 카드 리스트 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      <div v-for="(course, index) in courses" :key="index" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img :src="course.image" alt="Course image" class="w-full h-32 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ course.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ course.description }}</p>
          <div class="flex space-x-2">
            <button class="bg-blue-500 text-white py-1 px-3 rounded-lg text-sm">커리큘럼</button>
            <button class="bg-blue-200 text-blue-800 py-1 px-3 rounded-lg text-sm">수업문의</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StudentSideBar from '@/layout/StudentSideBar.vue';
import { ref } from 'vue'

const courses = ref([
  {
    title: '기초부터 프로젝트 중심 풀스택 개발자 (PWA를 활용한 React~)',
    description: 'HTML, CSS, JavaScript, React, Node.js, Canvas, charts, QR / P...',
    image: 'https://via.placeholder.com/150'
  },
  {
    title: '실무 기초과정 데이터베이스, SQL 성능 개선을 위한 프로젝트',
    description: 'SQL, 데이터베이스 설계, 성능 개선, 백엔드 기초...',
    image: 'https://via.placeholder.com/150'
  },
  {
    title: '기초부터 프로젝트 중심 MS기반 풀스택 개발자 (클라우드를 활용)',
    description: 'JAVASCRIPT, HTML/CSS, React, Azure DevOps...',
    image: 'https://via.placeholder.com/150'
  },
  {
    title: '(한화) 디지털서비스와 React를 활용한 풀스택 개발자 과정',
    description: 'React, Node.js, API 개발, 데이터 시각화...',
    image: 'https://via.placeholder.com/150'
  }
])
</script>

<style scoped>
/* 필요한 추가 스타일이 있을 경우 여기에 추가 */
</style>
