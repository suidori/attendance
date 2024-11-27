<template>
  <div class=" w-full">
    <div class="m-5 border border-black">
    <div class="w-1/2 mx-auto min-w-80">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">공지사항 작성</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-4 font-bold text-blue-900">제목</p>
        <div>
          <input type="text" v-model="title" placeholder="제목을 입력하세요"
            class="w-full transition-all duration-300 ease-in-out border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:border-transparent">
        </div>
        <div>
          <p class="py-6 font-bold text-blue-900">내용</p>
          <textarea id="message" v-model="body" rows="5"
            class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="내용을 입력하세요"></textarea>
        </div>
        <div class="mb-24" v-if="lecturelist.length>0">
          <select v-model="selectedlecture" name="" id="">
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
    <hr class="w-1/2 mx-auto my-5">
    <div class="flex items-center justify-center">
    </div>
  </div>
  <div class="mb-64">
  </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Cookies from 'js-cookie';
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

  if(Cookies.get('token'==null)){
  // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});

const goback = ()=>{

  router.go(-1)

}

const sub = async () => {

  const token = Cookies.get('token')
  // const token = localStorage.getItem('token')
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
