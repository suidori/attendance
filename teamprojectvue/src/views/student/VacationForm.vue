<template>
  <div class="absolute max-md:hidden">
    <StudentSideBar class="min-w-28"/>

  </div>
  <div class>
    <div class="w-1/2 mx-auto min-w-80">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">휴가 신청서 제출</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-6 font-bold text-blue-900">1. 휴가 신청 날짜 기입</p>
        <div class="inline-flex">
          <label for="date" class="mx-3">휴가 신청일</label>
          <input
          @input="datecheck(date)"
          class="border-2 border-slate-600"
          type="date"
          v-model="date"
          id="enddate" />
          <p v-if="dateAvail" class="text-green-500">{{ selectedDate }}</p>
          <p v-if="!dateAvail" class="text-red-500">{{ selectedDate }}</p>
        </div>
        <div>
          <hr class="mt-6" />
          <p class="py-6 font-bold text-blue-900">2. 휴가 사유를 입력해 주세요.</p>
          <textarea id="message" v-model="reason" rows="5"
            class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="ex) 해외로 가족여행"></textarea>
        </div>
        <div class="py-2 text-blue-900">
          <hr class="my-6" />
          <p class="py-2 font-bold">3. 추가적인 정보를 입력 해 주세요</p>
          <label for="personalnum" class="flex">주민등록번호</label>
          <div class="flex items-center">
            <input type="text" id="personalnum-front" class="w-24 border rounded-md h-7" placeholder="앞 6자리"
              maxlength="6" v-model="personalNumFront"
            />
            <span class="mx-1">-</span>
            <input type="text" id="personalnum-back" class="w-6 border rounded-md h-7" maxlength="1"
              v-model="personalNumBack"
            />
            <span>●●●●●●</span>
          </div>
          <label for="items"> 비상연락망 </label>
          <div>
            <select id="items" name="items" class="border border-gray-500" v-model="phoneNumberfirst">
              <option value="010" selected>010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </select>
            - <input type="text" v-model="phoneNumbersecond" maxlength="4" class="border border-gray-500">
            - <input @input="showuser" type="text" v-model="phoneNumberthird" maxlength="4" class="border border-gray-500">
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="sub" type="button" class="p-2 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85">
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
</template>

<script setup>
import axios from 'axios';

import StudentSideBar from '@/layout/StudentSideBar.vue';

import { ref, computed } from 'vue';

const phoneNumberfirst = ref('010');
const phoneNumbersecond = ref('');
const phoneNumberthird = ref('');
const date = ref('');
const reason = ref('');
const personalNumFront = ref('');
const personalNumBack = ref('');
const dateAvail = ref(false);
const selectedDate = ref('날짜를 선택 해 주세요');

const datecheck = (date) => {
    if (!date) {
      dateAvail.value = false;
      selectedDate.value = '유효하지 않은 날짜입니다.';
      return;
    }

    const inputDate = new Date(date);
    const today = new Date();

    const sevenDaysAfterToday = new Date(today);
    sevenDaysAfterToday.setDate(today.getDate() + 6);

    const isWeekend = inputDate.getDay() === 0 || inputDate.getDay() === 6;

    if(!isWeekend){
      dateAvail.value = true;
      selectedDate.value = '선택되었습니다.';
    }else {
      dateAvail.value = false;
      selectedDate.value = '주말은 선택할 수 없습니다.';
      return;
    }

    if(inputDate >= sevenDaysAfterToday){
      dateAvail.value = true;
      selectedDate.value = '선택되었습니다.';
    } else {
      dateAvail.value = false;
      selectedDate.value = '휴가 신청은 최소 일주일 전에 가능합니다.';
    }

  }

const fullPersonalNum = computed(() => {
  return `${personalNumFront.value}-${personalNumBack.value}●●●●●●`;
});

const sub = async () => {

  if(dateAvail.value == false){
    alert('올바른 날짜를 선택 해 주세요.');
    return;
  }


  const token = localStorage.getItem('token')
  const data = {
    "personalNum": fullPersonalNum.value,
    "reason": reason.value,
    "date": date.value,
    "phonecall": `${phoneNumberfirst.value}-${phoneNumbersecond.value}-${phoneNumberthird.value}`
  }

  try {
    const res = await axios.post('http://192.168.103:8080/vacation/request', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    console.log(res)
  } catch (e) {
    console.log(e)
    alert('에러')
  }
}
</script>

<style lang="scss" scoped></style>
