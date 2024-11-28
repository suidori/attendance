<template>

  <div v-if="useravail" class="w-[60vw] min-w-[620px]  mt-32">

    <h1 class="pb-6 font-bold text-blue-800 text-2xl ml-2">휴가 신청</h1>
    <hr class="w-full mx-auto border-blue-900 mb-4 border-2">
    <!-- <h1 class="md:ml-52">| 학생용 (VacationForm)</h1> -->
    <div class="w-1/2 mx-auto min-w-80">
      <div class="">
        <h1 class="pt-10 font-extrabold text-blue-900">휴가 신청서 제출</h1>
      </div>
      <hr class="border-t border-gray-300" />
      <div>
        <p class="py-6 font-bold text-blue-900">1. 휴가 날짜 기입</p>
        <div class="inline-flex">
          <label for="date" class="my-3 mr-3">휴가 날짜</label>
          <input @input="datecheck(date)" class="block p-3 w-44 border rounded-md h-10" type="date" v-model="date" id="date" />
          <p :class="dateavail ? 'text-green-500' : 'text-red-500'">{{ selectedDate }}</p>
        </div>
        <div>
          <hr class="mt-6" />
          <p class="py-6 font-bold text-blue-900">2. 휴가 사유를 입력해 주세요.</p>
          <textarea
            id="message"
            v-model="reason"
            rows="5"
            class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="ex) 해외로 가족여행"
          ></textarea>
        </div>
        <div class="py-2 text-blue-900">
          <hr class="my-6" />
          <p class="py-2 font-bold m-3">3. 추가적인 정보를 입력 해 주세요</p>
          <label for="personalnum" class="flex m-3 mt-5">주민등록번호</label>
          <div class="flex items-center m-3">
            <input
              type="text"
              id="personalnum-front"
              class="block p-3 w-28 border rounded-md h-7"
              placeholder="앞 6자리"
              maxlength="6"
              v-model="personalNumFront"
            />
            <span class="mx-1">-</span>
            <input type="text" id="personalnum-back" class="block pl-2 w-8 border rounded-md h-7" maxlength="1" v-model="personalNumBack" />
            <span>●●●●●●</span>
          </div>
          <div class="m-3">
            <label for="items" class="mt-7 mb-3 block"> 비상연락망 </label>
            <div>
              <select id="items" name="items" class="border border-gray-500 p-1 rounded-md w-20" v-model="phoneNumberfirst">
                <option value="010" selected>010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
              - <input type="text" v-model="phoneNumbersecond" maxlength="4" class="border border-gray-500 p-1 rounded-md w-16" /> -
              <input @input="showuser" type="text" v-model="phoneNumberthird" maxlength="4" 
              class="border border-gray-500 p-1 rounded-md w-16" />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="sub" type="button" class="p-2 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85">제출</button>
        </div>
      </div>
    </div>
    <hr class="w-1/2 mx-auto my-5" />
    <div class="flex items-center justify-center"></div>
  </div>
  <div v-else class="mt-44 ">
<h1 class="flex justify-center"> << 먼저 강좌를 선택하여 주시길 바랍니다. >>  </h1>
<div class="flex justify-center">
<button  class=" border-2 border-blue-800 m-5 p-2 pl-8 pr-8 rounded-md bg-blue-800 text-white" @click="golectureselect" >강좌 리스트 보러가기</button>
      </div>

  </div>




  <div class="mb-64"></div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { ref, computed, onMounted } from 'vue';

const router = useRouter()

const phoneNumberfirst = ref('010');
const phoneNumbersecond = ref('');
const phoneNumberthird = ref('');
const date = ref('');
const reason = ref('');
const personalNumFront = ref('');
const personalNumBack = ref('');
const dateAvail = ref(false);
const selectedDate = ref('날짜를 선택 해 주세요');

const user = ref(null);
const now = ref(dayjs());
const useravail = ref(false);
const usererror = ref('');
const attlist = ref([]);

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

  if (!isWeekend) {
    dateAvail.value = true;
    selectedDate.value = '선택되었습니다.';
  } else {
    dateAvail.value = false;
    selectedDate.value = '주말은 선택할 수 없습니다.';
    return;
  }

  if (inputDate >= sevenDaysAfterToday) {
    dateAvail.value = true;
    selectedDate.value = '선택되었습니다.';
    console.log('Date Available:', dateAvail.value);
  } else {
    dateAvail.value = false;
    selectedDate.value = '휴가 신청은 최소 일주일 전에 가능합니다.';
  }
};

const fullPersonalNum = computed(() => {
  return `${personalNumFront.value}-${personalNumBack.value}●●●●●●`;
});

const sub = async () => {
  if (dateAvail.value == false) {
    alert('올바른 날짜를 선택 해 주세요.');
    return;
  }

  const token = localStorage.getItem('token');
  const data = {
    personalNum: fullPersonalNum.value,
    reason: reason.value,
    date: date.value,
    phonecall: `${phoneNumberfirst.value}-${phoneNumbersecond.value}-${phoneNumberthird.value}`
  };

  try {
    const res = await axios.post('http://greencomart.kro.kr:716/vacation/request', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res);

    alert('휴가신청이 완료되었습니다.')
    router.push({name:'studentvacation'})

  } catch (e) {
    console.log(e);
    alert('에러');
  }
};


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


onMounted(()=>{
  showuser()

  if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})


</script>

<style lang="scss" scoped></style>