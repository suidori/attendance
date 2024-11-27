<template>
    <div>
        <div>
<h1 class=" text-blue-800 text-2xl font-bold mb-3">관리자 가입 허가</h1>
<hr class="border-2 border-blue-800 ">
<div>
<div class=" mx-auto" style="width: 1150px;">
<div class="flex justify-center mt-16">
<div class="w-96 bg border border-black rounded"><input  type="search" name="" id="" placeholder="강의명 또는 이름검색" 
    class="w-11/12 px-3 pt-1 pb-1 " required><span class=" ml-2 cursor-pointer">＠</span></div>
</div>
<br>
<div class="">
    <div class="ml-24">
    <input type="checkbox" name="" id="" class="inline-block "><h1 class="inline-block ml-7">전체선택</h1> 
    <!-- 위치수정 필요 -->
</div>
    <!-- 리스트 항목 -->
    <!-- <ul v-for="item in arr" :key="item.id" class="w-full  flex justify-center "> -->
        <!-- <input type="checkbox" name="" id="" class="inline-block mr-7">
        <li class="inline-block text-center w-1/6 border-t border-b border-black bg-[#eee]"><p class="mt-1">이름</p></li>
        <li class="inline-block text-center w-3/6  border-t border-b border-l border-black" ><p class="mt-1">강좌이름</p></li>
        <li class="inline-block w-1/6 text-center  border-t border-b  border-black"  >
            <button class=" border border-blue-800 bg-blue-800 text-white font-bold m-1">가입승인</button>
        </li> -->

         <ul class="w-full  flex justify-center ">
        <input type="checkbox" name="" id="" class="inline-block mr-7">
        <li class="inline-block text-center w-1/6 border-t border-b border-black bg-[#eee]"><p class="mt-1">이름</p></li>
        <li class="inline-block text-center w-3/6  border-t border-b border-l border-black" ><p class="mt-1">강좌이름</p></li>
        <li class="inline-block w-1/6 text-center  border-t border-b  border-black"  >
            <button class=" border border-blue-800 bg-blue-800 text-white font-bold m-1">가입승인</button>
        </li>
    </ul>
</div>
        </div>
        <div class="flex justify-center">
            <ul class="flex space-x-2">
            <li
              class="cursor-pointer p-3"
              v-for="num in totalpages"
              v-bind:key="num"
              @click="setpageNum(num - 1)"
            >
              {{ num }}
            </li>
          </ul>
        </div>
    </div>   
    </div>
    </div>
    <div class="mb-64">
</div>
</template>

<script setup>
import { ref } from 'vue';

const arr = ref([])
const pageNum = ref(0)
const totalpages = ref(10)

</script>

<style lang="scss" scoped>


</style>