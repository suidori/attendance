<template>
  <div class="flex flex-col items-center p-10 space-y-6">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-blue-900">회원가입</h2>

    <!-- Step Progress Bar -->
    <div class="flex justify-center space-x-2 w-full max-w-2xl">
      <div class="step flex flex-col items-center p-4 text-center bg-blue-900 text-white rounded-tl-lg rounded-bl-lg w-1/4">
        <p class="text-xl font-bold">01.</p>
        <p class="text-sm">이용약관 및<br>개인정보 수집 및 이용에 관한 동의</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-white text-gray-700 border border-gray-300 w-1/4">
        <p class="text-xl font-bold">02.</p>
        <p class="text-sm">본인인증 및<br>기본정보 입력</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-blue-800 text-white w-1/4">
        <p class="text-xl font-bold">03.</p>
        <p class="text-sm">아이디 및<br>패스워드 설정</p>
      </div>
      <div class="step flex flex-col items-center p-4 text-center bg-gray-100 text-gray-500 rounded-tr-lg rounded-br-lg w-1/4">
        <p class="text-xl font-bold">04.</p>
        <p class="text-sm">회원가입 완료</p>
      </div>
    </div>

    <!-- Agreement Checkbox -->
    <div class="w-full max-w-2xl">
      <div class="flex items-center space-x-2">
        <input type="checkbox" id="all-agree" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
        <label for="all-agree" class="text-gray-700">모두 동의합니다.</label>
      </div>

      <!-- Terms Sections -->
      <div class="mt-4 space-y-4">
        <div class="p-4 border border-gray-300 rounded bg-gray-50 h-32 overflow-auto">
          <p>제1조 (개인정보 보호 및 이용 기간)...</p>
          <p>제2조 (동의 거부 권리)...</p>
          <p>제3조 (개인정보의 제3자 제공)...</p>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="agree1" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
          <label for="agree1" class="text-gray-700">개인정보 수집 및 이용약관에 동의합니다.</label>
        </div>

        <div class="p-4 border border-gray-300 rounded bg-gray-50 h-32 overflow-auto">
          <p>제1조 (목적)...</p>
          <p>제2조 (개인정보 처리 목적)...</p>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="agree2" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
          <label for="agree2" class="text-gray-700">개인정보 수집 및 이용약관에 동의합니다.</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.step {
  flex: 1;
}
</style>