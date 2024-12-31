<template>
  <div class="w-[60vw] min-w-[620px]  mt-32">
  
    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">휴가 신청</h1>
    <hr class="w-full mx-auto border-blue-900 border-2" />
    <main v-if="useravail" class="flex justify-center">
      <section class="flex-1 p-5 m-10 bg-white">
        <h1 class="mb-5 text-2xl font-semibold">휴가 신청 현황</h1>

        <div>
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-1 border border-gray-300">휴가 신청일</th>
                <th class="p-1 border border-gray-300">사유</th>
                <th class="p-1 border border-gray-300">휴가 당일</th>
                <th class="p-1 border border-gray-300">승인 대기</th>
                <th class="p-1 border border-gray-300">휴가 신청서</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vacation, index) in vacationList" :key="index" class="text-center">
                <td class="p-1 border border-gray-300">{{ vacation.wdate }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.reason }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.date }}</td>
                <td class="p-1 border border-gray-300">
                  <span v-if="vacation.accept == '대기중'" class="text-blue-600">대기중</span>
                  <span v-else :class="vacation.accept === '허가됨' ? 'text-green-600' : 'text-red-600'">
                    {{ vacation.accept }}
                  </span>
                </td>
                <td class="p-1 border border-gray-300">
                  <a v-if="vacation.accept === '허가됨'"
                    :href="`http://greencomart.kro.kr:716/vacation/download/hwp/${vacation.idx}`"
                    class="px-2 py-1 text-white bg-blue-800 rounded hover:opacity-80" target="_blank">다운로드</a>
                  <span v-else>—</span>
                </td>
              </tr>
            </tbody>
          </table>
          <button v-if="!unchecking" @click="unChecked(1)"
            class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">대기 중인 요청만 보기</button>
          <button v-if="unchecking" @click="fetchVacations(1)"
            class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">모든 요청 보기</button>
            <button class="float-end px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80" @click="govacationForm">휴가 신청</button>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-5 space-x-2">
          <button @click="prevPageGroup" :disabled="currentPageGroup === 0"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
          <span v-for="page in currentPageNumbers" :key="page"
            class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100" @click="getPage(page)">
            {{ page }}
          </span>
          <button @click="nextPageGroup" :disabled="currentPageGroup >= maxPageGroup"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
        </div>
      </section>
    </main>

    <div v-else class="mt-44 w-[1100px] mb-24">
<h1 class="flex justify-center"> << 먼저 강좌를 선택하여 주시길 바랍니다. >>  </h1>
<div class="flex justify-center">
<button  class=" border-2 border-blue-800 m-5 p-2 pl-8 pr-8 rounded-md bg-blue-800 text-white" @click="golectureselect" >강좌 리스트 보러가기</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import router from '@/router';
import dayjs from 'dayjs';

const vacationList = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const currentPage = ref(1); // 현재 페이지를 관리하는 상태
const itemsPerPage = 10; // 페이지당 항목 수
const currentPageGroup = ref(0); // 현재 페이지 그룹
const totalPageGroups = computed(() => Math.ceil(totalPages.value / itemsPerPage)); // 총 페이지 그룹 수

const unchecking = ref(false);

const user = ref(null);
const now = ref(dayjs());
const useravail = ref(false);
const usererror = ref('');
const attlist = ref([]);



const unChecked = async (pageNum = 1) => {
  unchecking.value = true;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/studentunchecked?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    vacationList.value = response.data.list;
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const fetchVacations = async (pageNum = 1) => {
  unchecking.value = false;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/student?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    vacationList.value = response.data.list;
    vacationList.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const getPage = (index) => {

  if (unchecking.value == true) {
    unChecked(index);
    return;
  }

  fetchVacations(index); // 현재 페이지 번호로 데이터를 가져옴

};

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



const govacationForm = () => {

  router.push({name:'vacationform'})

}


const showuser = async () => {
  try {
    const token = localStorage.getItem('token');

    const resuser = await axios.get('http://greencomart.kro.kr:716/user/getuser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(resuser.data);
    user.value = resuser.data;
    const data = {
      user: user.value,
      month: dayjs(now.value).format('YYYY-MM')
    };

    const resatt = await axios.post('http://greencomart.kro.kr:716/attendance/getuser', data);

    attlist.value = resatt.data;
    useravail.value = true;
    console.log(attlist.value);
  } catch (e) {
    console.log(e);
    useravail.value = false;
    usererror.value = '사용자를 찾을 수 없습니다.';
    
  }
};

onMounted(() => {
  fetchVacations(currentPage.value);
  showuser()

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});

</script>