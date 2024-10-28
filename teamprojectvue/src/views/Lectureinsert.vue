<template>
    <div  @click="modalclick">
        <div>
        <div  class="relative">
<div v-if="modal" class="border-2 posi absolute bg-black z-50" style="width: 300px; height: 300px;">

</div>

        <div class="mb-4" >
        <h1 class="text-2xl font-bold mb-2">과정 선택</h1>
        
        <hr class="border-t-2 border-blue-600" />
      </div>
 
      <!-- 강좌 리스트 -->
      <div class="w-full flex ">

        <div class="border-2 rounded p-5 m-5" style="width: 200px; height: 230px;">
            <h1 class="text-2xl font-bold">|현재 강좌</h1>
            <br>
            <p>강좌제목</p>
            <p>0교시</p>
            <p>00:00 ~ 00:00</p>
            <button class="border bg-blue-800 text-white w-full " >시간변경</button>
            <br>
            <button class="border bg-blue-800 text-white w-full" >강좌종료</button>
        </div>

        <div class="border-2 rounded p-5 m-5 text-center" @click="insetlectur" style="width: 200px; height: 230px;">
            <h1 class="text-2xl font-bold mt-8 z-10 text-gray-400" >광좌개설</h1>
        </div>
      </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const modal = ref(false)

const insetlectur = () => {

    modal.value = true
}

const modalclick = () => {

    modal.value = false
}

</script>

<style lang="scss" scoped>

</style>