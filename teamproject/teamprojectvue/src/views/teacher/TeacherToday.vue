<template>
  <div class="w-[60vw] min-w-[620px]  mt-32">
 
    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">금일 출결 현황</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
        <div class="flex justify-between">
          <h1 class="m-3 inline-block text-2xl font-bold" v-if="user">
            <span class="font-bold ">{{ user.name }}</span> 선생님, 환영합니다.
          </h1>
          <h1 class="m-3 inline-block" v-if="user">
            {{ now }}
          </h1>
        </div>
        <hr class="m-1 mr-2 ml-2 border border-blue-500" />
        <div v-if="arr.length > 0" class="overflow-x-auto">
          <h1 class="font-bold m-2">- {{ arr.at(0).lecture }} 강좌 출결정보 리스트 -</h1>
          <table class="border border-collapse border-gray-200 w-full">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-2 pr-4 pl-4 border-t border-b border-gray-300">학생</th>
                <th class="p-2 pr-4 pl-4 border border-gray-300">출결 상태</th>
                <th class="p-2 pr-4 pl-4 border border-gray-300">사유</th>
                <th class="p-2 pr-4 pl-4 border border-gray-300">교사 확인</th>
                <th class="p-2 pr-4 pl-4 border border-gray-300">출석 인정</th>
                <th class="p-2 pr-4 pl-4 border-t border-b border-gray-300">체크</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="students in arr" :key="students.idx" class="bg-gray-50 hover:bg-gray-200">
                <td class="p-2 border-t border-b border-gray-300 text-center">{{ students.user }}</td>
                <td class="p-2 border border-gray-300 text-center">{{ students.type }}</td>
                <td class="p-2 border border-gray-300">{{ students.reason }}</td>
                <td class="p-2 border border-gray-300 text-center">{{ students.teacheraccept }}</td>
                <td class="p-2 border border-gray-300 text-center">{{ students.approval }}</td>
                <td class="p-2 border-t border-b border-gray-300 flex justify-center">
                  <button
                    v-if="students.teacheraccept == '담당교사 확인 대기중'"
                    @click="teachercheck(students.idx)"
                    class="px-2 py-1 text-white bg-blue-600 rounded hover:opacity-80"
                  >
                    확인
                  </button>
                  <div v-else class="px-2 py-1 mr-1" style="opacity: 0">확인</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="flex text-xl border-2 border-blue-300 pl-3 pr-3 my-3
             hover:bg-blue-300 hover:opacity-80
              hover:text-white cursor-pointer float-left rounded p-1"
          >
            <router-link to="teachercalander" class=""> 학생출결 조회 </router-link>
          </div>
        </div>
      </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getuserapi } from '@/api/teacher';
import { teachercheckapi } from '@/api/teacher';
import { todayviewapi } from '@/api/teacher';
import dayjs from 'dayjs';

import { useRouter } from 'vue-router';

const arr = ref([]);
const user = ref(null);

const now = ref(dayjs().format('YYYY년MM월DD일'));

const getuser = async () => {

  try {
    const res = getuserapi()
    user.value = res.data;
  } catch (e) {
    console.log(e);
  }
};

const teachercheck = async (idx) => {

  try {

       await teachercheckapi(idx)

    const item = arr.value.find((student) => student.idx === idx);

    if (item) {
      item.teacheraccept = '담당교사 확인 완료';
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getuser();
  todayview();

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});

const todayview = async () => {
  try {

    const res = await todayviewapi()

    const sortedData = res.data.sort((a, b) => {
      if (a.teacheraccept === '담당교사 확인 대기중' && b.teacheraccept !== '담당교사 확인 대기중') {
        return -1;
      } else if (a.teacheraccept !== '담당교사 확인 대기중' && b.teacheraccept === '담당교사 확인 대기중') {
        return 1;
      }
      return a.user.localeCompare(b.user, 'ko');
    });

    console.log(sortedData);
    arr.value = sortedData;
  } catch (e) {
    console.error(e);
  }
};
</script>

<style lang="scss" scoped></style>
