<template>
  <div class=" w-full">
    <div class="m-5 border border-black">
    <div class="w-1/2 mx-auto min-w-80">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">공지사항</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-6 font-bold text-blue-900">제목</p>
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
        <div v-if="lecturelist.length>0">
          <select v-model="selectedlecture" name="" id="">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAnnouncelectureapi } from '@/api/teacher';
import { subapi } from '@/api/teacher';
import Cookies from 'js-cookie';

const lecturelist = ref([]);
const title = ref('');
const body = ref('');
const selectedlecture = ref('');
const router = useRouter();

const getlecture = async () => {
  try {
    
    const res = await getAnnouncelectureapi()

    lecturelist.value = res.data.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

  } catch (e) {
    console.error(e);
  }
};


const sub = async () => {

  const data = {
    "title": title.value,
    "body": body.value,
    "lecture": lecturelist.value.find(lecture => lecture.title == selectedlecture.value).idx
}

  try {
    const res = subapi(data)
    console.log(res)
    router.push({name:'teacherannouncelist'})
  } catch (e) {
    console.log(e)
    alert('에러')
  }
}

const goback = ()=>{
router.go(-1)
}

onMounted(() => {
  getlecture();
  if(Cookies.get('token')==null){
  // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});
</script>

<style lang="scss" scoped></style>
