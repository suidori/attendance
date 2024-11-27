<template>
  <div class="w-[74rem] mb-19">
    <div class="m-3">
      <div class="mt-5 ">
        <div v-if="lecturelist.length > 0" id="lecturelist"
          class="w-1/6 p-4 bg-white border border-blue-500 float-start">
          <h1 class="text-3xl font-bold text-blue-800 my-5">강의목록</h1>
          <button @click="getlecture(), (isClicked = true)" :class="{ 'bg-green-600': isClicked }"
            class="p-1 mr-2 text-white bg-blue-400 rounded hover:opacity-80">
            최신순
          </button>
          <button @click="desclecture(), (isClicked = false)" :class="{ 'bg-green-600': !isClicked }"
            class="p-1 text-white bg-blue-400 rounded hover:opacity-80">
            과거순
          </button>
          <hr class="my-2 border-blue-500" />
          <div :class="{
            'bg-[#e7e7e7]':
              selectedlecture !== null && selectedlecture.title == lecture.title
          }" class="cursor-pointer hover:bg-[#e7e7e7] my-2" @click="getmonthatt(lecture, nowDat)"
            v-for="(lecture) in lecturelist" :key="lecture.idx">
            - {{ lecture.title }}
            <br />
          </div>
        </div>



        <div class="float-right w-5/6 p-3 bg-white border-2">
          <div class="w-full">
            <h1 class="p-5 text-3xl font-bold text-blue-800">-출결 리스트-</h1>
            <hr class="border-2 border-blue-800" />

            <h1 class="relative flex justify-center m-3 text-3xl font-bold text-blue-800">
              <button class="mb-2 mr-2 hover:scale-150" @click="downdate()">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                  </svg>
                </div>
              </button>
              <select v-model="currentYear" @change="dropdate" class="p-2 mx-2 border rounded">
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}년</option>
              </select>

              <select v-model="currentMonth" @change="dropdate" class="p-2 mx-2 border rounded">
                <option v-for="(month, index) in monthNames" :key="index" :value="index">
                  {{ month }}
                </option>
              </select>
              <button class="mb-2 ml-2 hover:scale-150" @click="update()">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
              <p class="absolute right-0 text-sm text-black bg-yellow-100">◯- 정상 출석<br>
                <span class="text-green-600">■</span>- 부분 출석<br>
                <span class="text-red-600">■</span>- 결석<br>
                <span class="text-blue-600">■</span>- 출석 인정
              </p>
            </h1>
            <h1 v-if="selectedtitle" class="text-2xl text-green-600 font-bold mb-3 ml-5">◆ {{ selectedtitle }}</h1>
            <h1 v-else class="text-2xl text-green-600">&nbsp;</h1>

            <div class="w-full h-[30vw] overflow-auto">
              <table class="w-full">
                <thead>
                  <tr class="border border-black">
                    <th class="w-1/4 p-4 border border-black">이름</th>
                    <th class="min-w-[4vw] bg-[#d1d0d0]">출결 현황</th>
                    <th v-for="day in arr" :key="day" class="p-4 border border-black min-w-[4vw]"
                      :style="{ color: isWeekend(getDayName(day)), backgroundColor: '#d1d0d0' }">
                      {{ getDayName(day) }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="monthatt.length > 0">
                  <tr v-for="student in monthatt" :key="student.user" class="border border-black bg-[#eee]">
                    <th class="w-1/4 p-4 h-[2vw] bg-orange-200 border border-black">{{ student.user }}</th>
                    <th class="border border-black min-w-[4vw] text-sm" v-html="getAttendanceSummary(student.useridx)"></th>
                    <td v-for="day in arr" :key="day" class="font-bold border-black border-r min-w-[4vw]"
                      :style="{ backgroundColor: backgroundColor(day)}">
                      <div class="text-center" :style="{ color: getatt(student.attendance[day]) }">
                        {{ getAttendanceType(student.useridx, day) }}
                        <div v-if="appget(student.attendance[day])">
                          <button @click="approve(student.useridx, day, true)"
                            class="my-2 text-white bg-blue-300 border border-black rounded hover:opacity-80 text-sm"
                            :style="{ color: 'green' }">
                            승인
                          </button>
                          <button @click="approve(student.useridx, day, null)"
                            class="text-white bg-blue-300 border border-black rounded hover:opacity-80 text-sm ml-1"
                            :style="{ color: 'red' }">
                            거절
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>




      <div class="mb-20"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import router from '@/router';
import Cookies from 'js-cookie';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.locale('ko');

const arr = ref([]); // 날짜 배열
const monthatt = ref([]); 

const nowDat = ref(dayjs().format('YYYY-MM'));
const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());
const lecturelist = ref([]);
const selectedtitle = ref(null);
const selectedlecture = ref(null);

const isClicked = ref(true);

const availableYears = ref([]);

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

onMounted(() => {
  const currentYearValue = dayjs().year();
  availableYears.value = Array.from({ length: 11 }, (_, i) => currentYearValue - 5 + i);
  updateDaysInMonth();
});

const updateDaysInMonth = () => {
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value);
  arr.value = Array.from({ length: daysInMonth }, (_, i) => i); // 0부터 일수까지의 배열 생성
  monthatt.value = [];

  if (selectedlecture.value !== null) {
    getmonthatt(selectedlecture.value, nowDat.value);
  }
};

const backgroundColor = (day) => {
  if(nowDat.value == dayjs().format('YYYY-MM') && (day + 1 == dayjs().format('DD')) ) {
    return 'rgb(255,253,157)';
  } else return '#eee';

}

const dropdate = () => {
  // currentYear와 currentMonth를 사용하여 nowDat을 업데이트
  nowDat.value = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .format('YYYY-MM');
  updateDaysInMonth();
};


const getDayName = (item) => {
  return dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .date(item + 1)
    .format('DD (ddd)'); // 줄바꿈
};

const isWeekend = (test) => {
  if (/^\d{2} \([가-힣]+\)$/.test(test)) {  // "01 (금)" 형식에 맞는 정규식
    const dayOfWeek = test.match(/\(([^)]+)\)/)[1]; // 괄호 안의 요일을 추출
    if (dayOfWeek === '일') {
      return 'red';  // 일요일이면 빨간색
    } else if (dayOfWeek === '토') {
      return 'blue'; // 토요일이면 파란색
    } else {
      return 'black'; // 그 외의 요일은 검정색
    }
  } else {
    return 'black';  // 올바르지 않은 형식은 검정색 처리
  }
};



const downdate = () => {
  // 한 달을 감소시키고, currentMonth 및 nowDat을 업데이트
  currentMonth.value = (currentMonth.value - 1 + 12) % 12;
  if (currentMonth.value === 11) {
    currentYear.value -= 1; // 12월에서 11월로 넘어가면 연도를 감소시킴
  }
  nowDat.value = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .format('YYYY-MM');
  updateDaysInMonth();
};

const update = () => {
  // 한 달을 증가시키고, currentMonth 및 nowDat을 업데이트
  currentMonth.value = (currentMonth.value + 1) % 12;
  if (currentMonth.value === 0) {
    currentYear.value += 1; // 1월에서 12월로 넘어가면 연도를 증가시킴
  }
  nowDat.value = dayjs()
    .year(currentYear.value)
    .month(currentMonth.value)
    .format('YYYY-MM');
  updateDaysInMonth();
};


const getlecture = async () => {
  try {
    const res = await axios.get(`http://greencomart.kro.kr:716/lecture/list`);
    lecturelist.value = res.data.sort((a, b) => b.idx - a.idx);
    console.log(lecturelist.value);
  } catch (e) {
    console.error(e);
  }
};

const desclecture = async () => {
  try {
    const res = await axios.get(`http://greencomart.kro.kr:716/lecture/list`);
    lecturelist.value = res.data.sort((a, b) => a.idx - b.idx);
    console.log(lecturelist.value);
  } catch (e) {
    console.error(e);
  }
};

const getmonthatt = async (lecture, month) => {
  try {
    selectedtitle.value = lecture.title;
    selectedlecture.value = lecture;
    const res = await axios.get(
      `http://greencomart.kro.kr:716/attendance/monthview?idx=${lecture.idx}&month=${month}`
    );
    console.log(res.data);
    monthatt.value = processAttendanceData(res.data); // 데이터를 가공하는 함수를 호출
  } catch (e) {
    console.log(e);
  }
};

const getAttendanceType = (useridx, day) => {
  // studentAttendance를 찾을 때 useridx를 정수로 변환하여 비교합니다.
  const studentAttendance = monthatt.value.find((student) => student.useridx === Number(useridx));


  if (!studentAttendance) return '-'; // 학생이 존재하지 않으면 '-'

  // 주말인지 확인
  const dayName = getDayName(day); // 날짜 이름 가져오기
  const isWeekendDay = /\((일|토)\)/.test(dayName);


  // 주말이면 '-'
  if (isWeekendDay) return '';

  // 해당 날짜에 대해 출결 정보가 없으면 '-'
  const attendanceInfo = studentAttendance.attendance[day];
  if (!attendanceInfo) {
    return '◯';
  }

  // 출결 정보가 있다면 해당 유형 반환
  return attendanceInfo.type || '-';
};

const processAttendanceData = (data) => {
  const attendanceMap = {};

  data.forEach((record) => {
    const { user, useridx, adate, type = '', approval = 'null' } = record; // useridx 추가

    // 사용자 별로 출결 정보를 초기화 (useridx 기준)
    if (!attendanceMap[useridx]) {
      attendanceMap[useridx] = {
        user: user,
        useridx: useridx, // useridx도 저장
        attendance: {} // 출결 정보를 담는 객체
      };
    }

    const day = dayjs(adate).date() - 1; // 날짜 인덱스 계산

    // 각 날짜에 대해 출결 정보 저장
    attendanceMap[useridx].attendance[day] = {
      type,
      approval:
        approval === null ? null : approval === 'true' ? true : approval === 'false' ? false : null
    };
  });

  return Object.values(attendanceMap);
};

const getatt = (attendance) => {
  if (!attendance) {
    return 'black'; // attendance가 undefined일 때 기본 색상
  }
  if (attendance.approval !== null) {
    return 'blue'; // approval이 null도 undefined도 아닐 때만 blue
  } else if (attendance.type === '결석') {
    return 'red';
  } else if (['지각', '조퇴', '외출'].includes(attendance.type)) {
    return 'green';
  } else {
    return 'black';
  }
};

const appget = (attendance) => {
  if (attendance && attendance.approval === false) {
    return true;
  }
  return false;
};

const approve = async (useridx, day, isApproved) => {
  const studentAttendance = monthatt.value.find((student) => student.useridx === useridx); // useridx로 검색

  if (studentAttendance && studentAttendance.attendance[day]) {
    studentAttendance.attendance[day].approval = isApproved;

    try {
      await axios.post('http://greencomart.kro.kr:716/attendance/updateApproval', {
        useridx: useridx, // useridx도 전송할 수 있음
        adate: dayjs()
          .year(currentYear.value)
          .month(currentMonth.value)
          .date(day + 1)
          .format('YYYY-MM-DD'), // day를 날짜 형식으로 변환
        type: studentAttendance.attendance[day].type,
        approval: isApproved
      });
    } catch (e) {
      console.error('Approval update failed:', e);
    }
  }
};

const getAbsentCount = (useridx) => {
  // 특정 학생의 출결 데이터에서 조건에 맞는 갯수를 세는 함수
  const studentAttendance = monthatt.value.find((student) => student.useridx === useridx);
  
  if (!studentAttendance) return 0; // 학생이 존재하지 않으면 0 반환

  // 조건: approval이 true가 아니고, type이 '결석'인 데이터
  let count = 0;
  Object.values(studentAttendance.attendance).forEach((attendance) => {
    // approval이 true가 아니고 type이 '결석'인 항목
    if (attendance.approval !== true && attendance.type === '결석') {
      count++;
    }
  });

  return count;
};

const getNotAbsentOrEmptyCount = (useridx) => {
  // 특정 학생의 출결 데이터에서 조건에 맞는 갯수를 세는 함수
  const studentAttendance = monthatt.value.find((student) => student.useridx === useridx);
  
  if (!studentAttendance) return 0; // 학생이 존재하지 않으면 0 반환

  // 조건: approval이 true가 아니고, type이 '결석'이 아니고, ''이 아닌 데이터
  let count = 0;
  Object.values(studentAttendance.attendance).forEach((attendance) => {
    // approval이 true가 아니고 type이 '결석'이 아니고, ''이 아닌 항목
    if (attendance.approval !== true && attendance.type !== '결석' && attendance.type !== '') {
      count++;
    }
  });

  return count;
};

const getAttendanceSummary = (useridx) => {
  const absentCount = getAbsentCount(useridx);
  const notAbsentOrEmptyCount = getNotAbsentOrEmptyCount(useridx);

  const totalAbsent = absentCount + Math.floor(notAbsentOrEmptyCount / 3);
  const partialAttendance = notAbsentOrEmptyCount % 3;

  return `결석 ${totalAbsent}<br>부분출석 ${partialAttendance}`;
};

onMounted(() => {
  getlecture();

  if(Cookies.get('token')==null){
  // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
});

</script>

<style lang="scss" scoped></style>
