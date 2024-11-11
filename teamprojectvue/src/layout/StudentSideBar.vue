<template>
  <div class="flex">
    <!-- Sidebar -->
    <div class="bg-gray-800 w-64 h-screen p-5">
      <h2 class="text-white text-2xl font-bold mb-6">Sidebar</h2>
      
      <nav class="text-white">
        <div class="mb-4 flex items-center space-x-3">
          <span class="material-icons text-gray-400">home</span>
          <span>Home</span>
        </div>
        <div class="mb-4 flex items-center space-x-3">
          <span class="material-icons text-gray-400">search</span>
          <span>Search</span>
        </div>
        <div class="mb-4 flex items-center space-x-3">
          <span class="material-icons text-gray-400">settings</span>
          <span>Settings</span>
        </div>
        <div class="mb-4 flex items-center space-x-3">
          <span class="material-icons text-gray-400">person</span>
          <span>Profile</span>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-10">
      <h1 class="text-3xl font-bold">Main Content</h1>
      <p class="mt-4 text-gray-600">This is where your main content will go.</p>
    </div>
  </div>
</template>

<script setup>
// 스크립트 필요 없음, 고정된 사이드바이기 때문에 toggle 기능 불필요
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
