<template>
  <div class="absolute max-md:hidden"><SideBar></SideBar></div>
  <div>
    <h1 class="md:ml-52">| 학생용 (VacationForm)</h1>
    <div class="w-1/2 mx-auto min-w-80">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">휴가 신청서 제출</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-6 font-bold text-blue-900">1. 휴가를 시작하는 날짜와 끝나는 날짜 기입</p>
        <div class="inline-flex">
          <label for="StartDate" class="mr-3">시작 날짜</label>
          <input class="border-2 border-slate-600" type="date" name="StartDate" id="" />
        </div>
        <div class="inline-flex">
          <label for="EndDate" class="mx-3">끝나는 날짜</label>
          <input class="border-2 border-slate-600" type="date" name="EndDate" id="" />
        </div>
        <div>
          <hr class="mt-6" />
          <p class="py-6 font-bold text-blue-900">2. 휴가 사유를 입력해 주세요.</p>
          <textarea
            id="message"
            v-model="message"
            rows="5"
            class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Write your message here"
          ></textarea>
        </div>
        <div class="py-2 text-blue-900">
          <hr class="my-6" />
          <p class="py-2 font-bold">3. 수강중인 강좌와 본인 이름, 전화번호를 입력하세요</p>
          <label for="" class="flex">수강중인 강좌</label>
          <input type="text" id="" class="border rounded-md h-7" placeholder="강좌명" />
          <label for="" class="flex">이름</label>
          <input type="text" id="" class="border rounded-md h-7" placeholder="이름" />
          <label for="" class="flex">전화번호</label>
          <input type="text" id="" class="border rounded-md h-7" placeholder="000-0000-0000" />
        </div>
        <div class="flex justify-end">
          <button
            @click="sub"
            type="button"
            class="p-2 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85"
          >
            제출
          </button>
        </div>
      </div>
    </div>
    <hr class="w-1/2 mx-auto my-5">
    <div class="flex items-center justify-center">
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/component/SideBar.vue'

const sub = () => {
  alert('제출합니다')
}
</script>

<style lang="scss" scoped></style>
