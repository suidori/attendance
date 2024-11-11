<template>
  <div class="flex justify-center w-full">


    <div class="w-4/5 p-3 border-2 bg-white">
      <h1 class="p-5 text-3xl font-bold text-blue-800">-출결리스트-</h1>
      <hr class="border-2 border-blue-800" />

      <h1 class="flex justify-center m-3 text-3xl font-bold text-blue-800">
        <button class="mb-2 mr-2 hover:scale-150" @click="downdate()">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
        
        {{ nowDat }}


        <button class="mb-2 ml-2 hover:scale-150" @click="update()">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
      </h1>
      <div class="w-full overflow-auto">
        <table class="w-full">
          <thead>
            <tr class="border">
              <th class="w-1/4 p-4">이름</th>
              <th
                v-for="day in arr"
                :key="day"
                class="p-4"
                :style="{ color: isWeekend(getDayName(day)) }"
              >
                {{ getDayName(day) }}
              </th>
            </tr>
          </thead>
          <tbody v-if="monthatt.length > 0">
            <tr v-for="student in monthatt" :key="student.user" class="border bg-[#eee]">
              <th class="w-1/4 p-4 bg-indigo-400">{{ student.user }}</th>
              <td
                v-for="day in arr"
                :key="day"
                class="p-4 font-bold border-r min-w-20"
                :style="{ color: isWeekend(getDayName(day)) }"
              >
                <div :style="{ color: getatt(student.attendance[day]) }">
                  {{ getAttendanceType(student.user, day) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="lecturelist.length > 0"
      id="lecturelist"
      class="w-1/6 p-4 border border-blue-500 bg-white"
    >
      <h1>강의목록</h1>
      <button
        @click="getlecture, (isClicked = true)"
        :class="{ 'bg-green-500': isClicked }"
        class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80 mr-2"
      >
        최신순
      </button>
      <button
        @click="desclecture, (isClicked = false)"
        :class="{ 'bg-green-500': !isClicked }"
        class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80"
      >
        과거순
      </button>
      <hr class="my-2 border-blue-500" />

      <div
      :class="{
  'bg-blue-500 text-white': selectedlecture!==null && selectedlecture == lecture.idx
}"

            class="hover:bg-blue-500 hover:text-white"
        @click="getmonthatt(lecture.idx, nowDat)"
        v-for="(lecture, index) in lecturelist"
        :key="lecture.idx"
      >
        {{ lecture.title }}
        <hr v-if="index < lecturelist.length - 1" class="my-2 border-blue-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import 'dayjs/locale/ko';

const isClicked = ref(true);

dayjs.locale('ko');

const arr = ref([]); // 날짜 배열
const monthatt = ref([]);

const nowDat = ref(dayjs().format('YYYY-MM'));
const currentMonth = ref(dayjs().month());
const currentYear = ref(dayjs().year());
const lecturelist = ref([]);
const selectedlecture = ref(null);

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
  getmonthatt(selectedlecture.value, nowDat.value);
};

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
    .format('ddd-DD')
    .replace('-', '\n'); // 줄바꿈
};

const isWeekend = (test) => {
  if (/^일/.test(test)) {
    return 'red';
  } else if (/^토/.test(test)) {
    return 'blue';
  } else {
    return 'black';
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
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://greencomart.kro.kr:716/lecture/mylecture`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    lecturelist.value = res.data.sort((a, b) => b.idx - a.idx);
  } catch (e) {
    console.error(e);
  }
};

const desclecture = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://greencomart.kro.kr:716/lecture/mylecture`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    lecturelist.value = res.data.sort((a, b) => a.idx - b.idx);
  } catch (e) {
    console.error(e);
  }
};

const getmonthatt = async (idx, month) => {

  try {
    const res = await axios.get(
      `http://greencomart.kro.kr:716/attendance/monthview?idx=${idx}&month=${month}`
    );
    monthatt.value = processAttendanceData(res.data); // 데이터를 가공하는 함수를 호출
    selectedlecture.value = idx;
    console.log("일루오나"+selectedlecture.value)
  } catch (e) {
    console.log(e);
  }
};

const getAttendanceType = (username, day) => {
  const studentAttendance = monthatt.value.find((student) => student.user === username);

  if (!studentAttendance) return '-'; // 학생이 존재하지 않으면 '-'

  // 주말인지 확인
  const dayName = getDayName(day); // 날짜 이름 가져오기
  const isWeekendDay = /^일/.test(dayName) || /^토/.test(dayName); // 주말 여부 확인

  // 주말이면 '-'
  if (isWeekendDay) return '☕';

  // 해당 날짜에 출결 정보가 없다면 '출석' 반환
  if (!studentAttendance.attendance[day]) {
    return '✔';
  }

  // 출결 정보가 있다면 해당 유형 반환
  return studentAttendance.attendance[day].type;
};

const processAttendanceData = (data) => {
  const attendanceMap = {};

  data.forEach((record) => {
    const { user, useridx, adate, type = '', approval = 'null' } = record; // idx 포함

    if (!attendanceMap[user]) {
      attendanceMap[user] = {
        user: user,
        useridx: useridx, // useridx로 변경
        attendance: {}
      };
    }

    const day = dayjs(adate).date() - 1;
    attendanceMap[user].attendance[day] = {
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

onMounted(async () => {
  await getlecture(); // 강의 목록 가져오기
  if (lecturelist.value.length > 0) {
    // 강의 목록이 비어 있지 않은 경우
    await getmonthatt(lecturelist.value[0].idx, nowDat.value); // 첫 번째 강의에 대한 출결 정보 가져오기
  }
});
</script>

<style lang="scss" scoped></style>