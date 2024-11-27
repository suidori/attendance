<template>
  <div class="w-[60vw] min-w-[620px]  mt-32">
    
    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">공지사항</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
    <main class="flex justify-center w-[74.5rem]">
      <section class="flex-1 p-6 m-2 bg-white border border-gray-500 mr-5">
        <h1 class="mb-5 text-2xl font-semibold">공지사항</h1>

        <div v-if="lecturelist.length > 0">
          <select class="border border-gray-500 mr-3" v-model="selectedlecture" name="" id="">
            <option value="전체">전체</option>
            <option v-for="lecture in lecturelist" :key="lecture.idx" :value="lecture.idx">
              {{ lecture.title }}
            </option>
          </select>
          <button @click="resetSort(1)" class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">
            초기화
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-1 border border-gray-300">제목</th>
                <th class="p-1 border border-gray-300">강좌</th>
                <th class="p-1 border border-gray-300">글쓴이</th>
                <th class="p-1 border border-gray-300">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(announce, index) in announcelist" :key="index" class="text-center">
                <td @click="viewPage(announce.idx)"
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer hover:bg-gray-200">{{
                  announce.title }}</td>
                <td @click="lectureclick(announce.lecture)"
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer hover:bg-gray-200">{{
                  announce.lecture }}</td>
                <td class="p-1 border border-gray-300">{{ announce.user }}</td>
                <td class="p-1 border border-gray-300">{{ announce.wdate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button @click="sortAsc" class="px-4 py-2 text-white bg-green-600 rounded hover:opacity-80 mr-3">최신순</button>
        <button @click="sortDesc" class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">과거순</button>
        <button @click="gowrite" class="float-end px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80" >공지사항 작성</button>

        <div class="flex justify-center mt-5 space-x-2">
          <button @click="prevPageGroup" :disabled="currentPageGroup === 0"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
          <span v-for="page in currentPageNumbers" :key="page"
            class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100"
            @click="(ascdesc) ? getPage(page) : getdescPage(page)">
            {{ page }}
          </span>
          <button @click="nextPageGroup" :disabled="currentPageGroup >= maxPageGroup"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute()
const router = useRouter();


const announcelist = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const currentPage = ref(1); // 현재 페이지를 관리하는 상태
const itemsPerPage = 10; // 페이지당 항목 수
const currentPageGroup = ref(0); // 현재 페이지 그룹
const totalPageGroups = computed(() => Math.ceil(totalPages.value / itemsPerPage));
const lecturelist = ref([]);
const selectedlecture = ref(null);
const ascdesc = ref(true);


const resetSort = (pageNum) => {
  ascdesc.value = true; // ascdesc 값을 true로 설정
  fetchannounce(pageNum); // 페이지 번호 1로 초기화
};


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

const lectureclick = (title) => {

  if (title == '전체') {
    selectedlecture.value = '전체';
  } else {
    selectedlecture.value = lecturelist.value.find(lecture => lecture.title === title).idx;
  }
}


const viewPage = (annoidx) => {

const idx = Number(annoidx)

console.log(idx)

  router.push({name: 'announceview', params: { idx }});
};


const sortAsc = () => {
  ascdesc.value = true;
  getPage(1);
}

const sortDesc = () => {
  ascdesc.value = false;
  getdescPage(1);
}

watch(selectedlecture, async (newVal, oldVal) => {
  if (newVal) {
    if (newVal === '전체') {
      await fetchannounceForAll();
    } else {
      await fetchannounceByLecture(newVal);
    }
  }
});

const fetchannounceForAll = async (pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/searchforall?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 페이지 번호 갱신
  } catch (error) {
    console.error(error);
  }
};

const fetchannounceForAlldesc = async (pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/searchforalldesc?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) =>  a.idx - b.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 페이지 번호 갱신
  } catch (error) {
    console.error(error);
  }
};

// 특정 강의를 선택했을 때의 요청
const fetchannounceByLecture = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/lecturesearch/${lectureIdx}?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 페이지 번호 갱신
  } catch (error) {
    console.error(error);
  }
};

const fetchannounceByLecturedesc = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/lecturesearchdesc/${lectureIdx}?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) =>  a.idx - b.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 페이지 번호 갱신
  } catch (error) {
    console.error(error);
  }
};

const fetchannounce = async (pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/manager?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum;
    selectedlecture.value = null;
  } catch (error) {
    console.error(error);
  }
};

const fetchannouncedesc = async (pageNum = 1) => {
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/announce/managerdesc?pageNum=${pageNum - 1}`);
    announcelist.value = response.data.list;
    announcelist.value.sort((a, b) =>  a.idx  -b.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum;
    selectedlecture.value = null;
  } catch (error) {
    console.error(error);
  }
};

const getPage = (index) => {
  if (selectedlecture.value == null) {
    fetchannounce(index);
    return;
  } else if (selectedlecture.value == '전체') {
    fetchannounceForAll(index);
    return;
  } else {
    fetchannounceByLecture(selectedlecture.value, index);
    return;
  }
};

const getdescPage = (index) => {
  if (selectedlecture.value == null) {
    fetchannouncedesc(index);
    return;
  } else if (selectedlecture.value == '전체') {
    fetchannounceForAlldesc(index);
    return;
  } else {
    fetchannounceByLecturedesc(selectedlecture.value, index);
    return;
  }
}

// 페이지 그룹과 관련된 상태
const maxPageGroup = computed(() => totalPageGroups.value - 1);
const currentPageNumbers = computed(() => {
  const start = currentPageGroup.value * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// 이전 페이지 그룹으로 이동
const prevPageGroup = () => {
  if (currentPageGroup.value > 0) {
    currentPageGroup.value--;
    getPage(currentPage.value); // 첫 페이지로 이동
  }
};

// 다음 페이지 그룹으로 이동
const nextPageGroup = () => {
  if (currentPageGroup.value < maxPageGroup.value) {
    currentPageGroup.value++;
    getPage(currentPage.value); // 첫 페이지로 이동
  }
};


const gowrite = () => {

  router.push({name:'deskannouncewrite'})
}


onMounted(() => {
  fetchannounce(currentPage.value);
  getlecture();

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});
</script>