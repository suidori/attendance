<template>
    <router-link to="/stdatt">
      <div class="w-auto bg-green-300 text-9xl">
        학생메뉴
      </div>
    </router-link>
    <router-link to="/teachertoday">
      <div class="w-auto bg-blue-300 text-9xl">
        선생님메뉴
      </div>
    </router-link>
    <router-link to="/deskcalander">
      <div class="w-auto bg-yellow-300 text-9xl">
        매니저메뉴
      </div>
    </router-link>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  </script>
  
  <style lang="scss" scoped></style>
  