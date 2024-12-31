<template>
    <div class="w-[60vw] min-w-[620px]  mt-32">

    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">공지사항</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
    <div class="border rounded-xl p-4">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">공지 작성</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-6 font-bold text-blue-900">제목</p>
        <div>
          <input type="text" v-model="title" placeholder="제목을 입력하세요"
            class="w-1/2 p-2 transition-all duration-300 ease-in-out border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:border-transparent">
        </div>
        <div>
          <p class="py-6 font-bold text-blue-900">내용</p>
          <textarea id="message" v-model="body" rows="5"
            class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="내용을 입력하세요"></textarea>
        </div>
        <hr class="my-5">
        <p class="text-blue-900 font-bold">공지 항목</p>
        <div v-if="lecturelist.length>0">
          <select v-model="selectedlecture" name="" id="" class="border rounded-md p-1 my-2">
            <option value="전체">전체</option>
            <option v-for="lecture in lecturelist" :key="lecture.idx" :value="lecture.title">
              {{ lecture.title }}
            </option>
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="goback" type="button" class="flex justify-start p-2 pl-5 pr-5 text-white bg-red-600 border-2 rounded-lg hover:opacity-85">
            취소
          </button>
          <button @click="sub" type="button" class="flex justify-end p-2 pl-5 pr-5 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85">
            제출
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>

import axios from 'axios';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const lecturelist = ref([]);
const title = ref('');
const body = ref('');
const selectedlecture = ref("전체");
const router = useRouter();

const getlecture = async () => {
  try {
    const res = await axios.get(`http://greencomart.kro.kr:716/lecture/availlist`);

    lecturelist.value = res.data.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  getlecture();

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});

const goback = ()=>{

  router.go(-1)

}

const sub = async () => {

  const token = localStorage.getItem('token')
  const data = {
    "title": title.value,
    "body": body.value,
    "lecture": (selectedlecture.value == "전체") ? null : lecturelist.value.find(lecture => lecture.title == selectedlecture.value).idx
}

  try {
    const res = await axios.post('http://greencomart.kro.kr:716/announce/save', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(res)
    router.push({name:'deskannouncelist'})
  } catch (e) {
    console.log(e)
    alert('에러')
  }
}
</script>

<style lang="scss" scoped></style>
