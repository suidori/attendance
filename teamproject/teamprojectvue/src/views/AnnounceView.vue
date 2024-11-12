<template>
    <div class>
      <div class="w-1/2 mx-auto min-w-80">
        <div class="">
          <h1 class="pt-10 font-extrabold text-blue-900">공지사항</h1>
        </div>
        <hr class="border-t border-gray-300" />
        <div>
          <p class="py-6 font-bold text-blue-900">{{announcement.title}}</p>
          <p class="text-green-600">{{ announcement.lecture }}</p>
          <p>{{announcement.user}} {{ announcement.wdate }}</p>
          <div>
            <p class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none py-6 font-bold text-blue-900">{{ announcement.body }}</p>
          </div>
          <div class="flex justify-end">
            <button @click="router.go(-1)" type="button" class="p-2 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85">
              뒤로가기
            </button>
          </div>
        </div>
      </div>
      <hr class="w-1/2 mx-auto my-5">
    </div>
    <div class="mb-64">
  
    </div>
  </template>
  
  <script setup>

import axios from 'axios';
import { onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const announcement = ref({});

const getView = async () => {
    try {
        const res = await axios.get(`http://greencomart.kro.kr:716/announce/view/${route.params.idx}`);
        announcement.value = res.data;
    }catch(e){
        console.error(e);
    }
}

onMounted(() => {
  getView();
});

  </script>
  
  <style lang="scss" scoped></style>
  