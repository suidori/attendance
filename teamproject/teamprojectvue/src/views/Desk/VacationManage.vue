<template>
    <main class="w-[60vw] min-w-[620px]  mt-32">

    
      <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">휴가 신청 관리</h1>
      <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
      <section class="flex-1 p-5 m-2 bg-white border border-gray-500">
        <h1 class="mb-5 text-2xl font-semibold">휴가 신청 관리</h1>
        
        <div class="flex mb-5">
          <button @click="nameSearch(pageNum)" class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">검색</button>
          <input type="text" 
                 v-model="username" 
                 @input="nameSearch(pageNum)" 
                 placeholder="이름 검색" 
                 class="flex-1 p-2 border border-gray-300 rounded" />
        </div>

        <div class="overflow-x-auto">
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-1 border border-gray-300">
                  <input type="checkbox" 
                         :checked="allChecked" 
                         :disabled="!hasActiveRequests" 
                         @change="toggleAllCheckboxes($event.target.checked)" 
                         class="w-4 h-4 transform scale-150"/>
                </th>
                <th class="p-1 border border-gray-300">작성일</th>
                <th class="p-1 border border-gray-300">이름</th>
                <th class="p-1 border border-gray-300">강좌 이름</th>
                <th class="p-1 border border-gray-300">사유</th>
                <th class="p-1 border border-gray-300">휴가신청일</th>
                <th class="p-1 border border-gray-300">휴가 승인</th>
                <th class="p-1 border border-gray-300">휴가 신청서</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vacation, index) in vacationList" :key="index" class="text-center">
                <td class="p-1 border border-gray-300">
                  <input v-if="vacation.accept == '대기중'" 
                         type="checkbox" 
                         :value="vacation.idx" 
                         :checked="checkedRequest.includes(vacation.idx)" 
                         @change="updateCheckedRequest(vacation.idx, $event.target.checked)"
                         class="w-4 h-4 transform scale-150" />
                  <span v-else>&nbsp;</span>
                </td>
                <td class="p-1 border border-gray-300">{{ vacation.wdate }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.user }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.lecture }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.reason }}</td>
                <td class="p-1 border border-gray-300">{{ vacation.date }}</td>
                <td class="p-1 border border-gray-300">
                  <button v-if="vacation.accept == '대기중'" 
                          @click="handleApprove(vacation.idx)"
                          class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">
                    승인
                  </button>
                  <button v-if="vacation.accept == '대기중'" 
                          @click="handleDeny(vacation.idx)" 
                          class="px-2 py-1 text-white bg-blue-600 rounded hover:opacity-80">
                    거절
                  </button>
                  <span v-else :class="vacation.accept === '허가됨' ? 'text-green-600' : 'text-red-600'">
                    {{ vacation.accept }}
                  </span>
                </td>
                <td class="p-1 border border-gray-300">
                  <a v-if="vacation.accept === '허가됨'" 
                     :href="`http://greencomart.kro.kr:716/vacation/download/hwp/${vacation.idx}`" 
                     class="px-2 py-1 text-white bg-blue-800 rounded hover:opacity-80" 
                     target="_blank">다운로드</a>
                  <span v-else>—</span>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="approveAll" class="px-4 py-2 text-white bg-green-600 rounded hover:opacity-80">선택 사항 모두 승인</button>
          <button v-if="!unchecking" @click="unChecked(1)" class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">대기 중인 요청만 보기</button>
          <button v-if="unchecking" @click="fetchVacations(1)" class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">모든 요청 보기</button>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-5 space-x-2">
          <button @click="prevPageGroup" :disabled="currentPageGroup === 0" class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
          <span v-for="page in currentPageNumbers" :key="page" class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100" @click="getPage(page)">
            {{ page }}
          </span>
          <button @click="nextPageGroup" :disabled="currentPageGroup >= maxPageGroup" class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
        </div>
      </section>
    </main>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter()

const vacationList = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const checkedRequest = ref([]); // 체크박스에 선택된 vacation.idx를 저장할 배열
const currentPage = ref(1); // 현재 페이지를 관리하는 상태
const itemsPerPage = 10; // 페이지당 항목 수
const currentPageGroup = ref(0); // 현재 페이지 그룹
const totalPageGroups = computed(() => Math.ceil(totalPages.value / itemsPerPage)); // 총 페이지 그룹 수
const username = ref('');


const unchecking = ref(false);

const unChecked = async (pageNum = 1) => {
  unchecking.value = true;
  try {

    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/managerunchecked?pageNum=${pageNum - 1}`);

    console.log(response)

    vacationList.value = response.data.list; 
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
    checkedRequest.value = [];
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const nameSearch = async (pageNum = 1) => {
  unchecking.value = false;
  if (username.value === '') {
    fetchVacations();
    return;
  }
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/managersearch?pageNum=${pageNum -1}&size=10&name=${username.value}`);
    vacationList.value = response.data.list; 
    vacationList.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum;
    checkedRequest.value = [];
    
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const fetchVacations = async (pageNum = 1) => {
  unchecking.value = false;
  try {
    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/manager?pageNum=${pageNum - 1}`);
    vacationList.value = response.data.list; 
    vacationList.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
    checkedRequest.value = [];
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const getPage = (index) => {

  if(unchecking.value == true){
        unChecked(index);
        return;
    }


  if (username.value === '') {
   fetchVacations(index); // 현재 페이지 번호로 데이터를 가져옴
    return;
  }
  nameSearch(index);
};

const updateCheckedRequest = (idx, isChecked) => {
  if (isChecked) {
    // 체크 시 추가
    if (!checkedRequest.value.includes(idx)) {
      checkedRequest.value.push(idx);
    }
  } else {
    // 체크 해제 시 제거
    checkedRequest.value = checkedRequest.value.filter(id => id !== idx);
  }
};

const approveAll = async () => {
  for (const idx of checkedRequest.value) {
    await handleApprove(idx); // 각 idx에 대해 handleApprove 호출
  }
  checkedRequest.value = []; // 승인 후 선택된 요청 초기화
};

const handleApprove = async (idx) => {
  try {
    await axios.post(`http://greencomart.kro.kr:716/vacation/accept/${idx}`);
    getPage(currentPage.value); // 현재 페이지로 목록 새로고침
  } catch (error) {
    console.error('승인 중 오류 발생:', error);
  }
};

const handleDeny = async (idx) => {
  try {
    await axios.post(`http://greencomart.kro.kr:716/vacation/deny/${idx}`);
    getPage(currentPage.value); // 현재 페이지로 목록 새로고침
  } catch (error) {
    console.error('거절 중 오류 발생:', error);
  }
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

const allChecked = computed(() => {
  return hasActiveRequests && vacationList.value.filter(vacation => vacation.accept === '대기중').every(vacation => checkedRequest.value.includes(vacation.idx));
});

const hasActiveRequests = computed(() => {
  return vacationList.value.some(vacation => vacation.accept === '대기중');
});

const toggleAllCheckboxes = (isChecked) => {
  const activeVacations = vacationList.value.filter(vacation => vacation.accept === '대기중');
  checkedRequest.value = isChecked 
    ? activeVacations.map(vacation => vacation.idx) 
    : [];
};

onMounted(() => {
  fetchVacations(currentPage.value);

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});
</script>