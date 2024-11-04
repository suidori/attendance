<template>
    <div class="m-3">
        <div class="flex justify-center">
            <div v-if="lecturelist.length > 0" id="lecturelist" class="w-[15vw] p-4 border border-blue-500">
                <h1>강의목록</h1>
                <button @click="getlecture" class="border border-green-500">최신순</button>
                <button @click="desclecture" class="border border-green-500">과거순</button>
                <hr class="my-2 border-blue-500" />
                <div class="hover:bg-blue-700" @click="getmonthatt(lecture, nowDat)"
                    v-for="(lecture, index) in lecturelist" :key="lecture.idx">
                    {{ lecture.title }}
                    <hr v-if="index < lecturelist.length - 1" class="my-2 border-blue-500" />
                </div>
            </div>

            <div class="w-6/12 p-3 border-2">
                <div class="w-full">
                    <h1 class="p-5 text-3xl font-bold text-blue-800">-출결리스트-</h1>
                    <hr class="border-2 border-blue-800" />

                    <h1 class="flex justify-center m-3 text-3xl font-bold text-blue-800">
                        <button @click="downdate()">&lt;</button> {{ nowDat }}
                        <button @click="update()">&gt;</button>
                    </h1>
                    <h1 v-if="selectedtitle" class="text-green-500">{{ selectedtitle }}</h1>
                    <div class="w-full overflow-auto">
                        <table class="w-full ">
                            <thead>
                                <tr class="border">
                                    <th class="w-1/4 p-4">이름</th>
                                    <th v-for="day in arr" :key="day" class="p-4"
                                        :style="{ color: isWeekend(getDayName(day)) }">{{ getDayName(day) }}</th>
                                </tr>
                            </thead>
                            <tbody v-if="monthatt.length > 0">
                                <tr v-for="student in monthatt" :key="student.user" class="border bg-[#eee]">
                                    <th class="w-1/4 p-4 bg-red-400">{{ student.user }}</th>
                                    <td v-for="day in arr" :key="day" class="p-4 font-bold border-r min-w-20"
                                        :style="{ color: isWeekend(getDayName(day)) }">
                                        <div :style="{ color: getatt(student.attendance[day]) }">{{
                                            getAttendanceType(student.useridx, day) }}
                                            <div v-if="appget(student.attendance[day])">
                                                <button @click="approve(student.useridx, day, true)"
                                                    class="border border-black" :style="{ color: 'green' }">승인</button>
                                                <button @click="approve(student.useridx, day, null)"
                                                    class="border border-black" :style="{ color: 'red' }">거절</button>
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios';
import 'dayjs/locale/ko'

dayjs.locale('ko')

const arr = ref([]) // 날짜 배열
const monthatt = ref([])

const nowDat = ref(dayjs().format('YYYY-MM'))
const currentMonth = ref(dayjs().month())
const currentYear = ref(dayjs().year())
const lecturelist = ref([])
const selectedtitle = ref(null)
const selectedlecture = ref(null)

const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

onMounted(() => {
    updateDaysInMonth()
})

const updateDaysInMonth = () => {
    const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value)
    arr.value = Array.from({ length: daysInMonth }, (_, i) => i) // 0부터 일수까지의 배열 생성
    monthatt.value = [];
    getmonthatt(selectedlecture.value, nowDat.value)
}

const getDayName = (item) => {
    return dayjs()
        .year(currentYear.value)
        .month(currentMonth.value)
        .date(item + 1)
        .format('ddd-DD')
        .replace('-', '\n') // 줄바꿈
}

const isWeekend = (test) => {
    if (/^일/.test(test)) {
        return 'red'
    } else if (/^토/.test(test)) {
        return 'blue'
    } else {
        return 'black'
    }
}

const count = ref(0)

const downdate = () => {
    count.value = count.value - 1
    nowDat.value = dayjs().add(count.value, 'month').format('YYYY-MM')
    currentMonth.value = (currentMonth.value - 1 + 12) % 12
    updateDaysInMonth()
}

const update = () => {
    count.value = count.value + 1
    nowDat.value = dayjs().add(count.value, 'month').format('YYYY-MM')
    currentMonth.value = (currentMonth.value + 1) % 12
    updateDaysInMonth()
}

const getlecture = async () => {
    try {
        const res = await axios.get(`http://192.168.0.5:8080/lecture/list`);
        lecturelist.value = res.data.sort((a, b) => b.idx - a.idx);
        console.log(lecturelist.value);
    } catch (e) {
        console.error(e);
    }
}

const desclecture = async () => {
    try {
        const res = await axios.get(`http://192.168.0.5:8080/lecture/list`);
        lecturelist.value = res.data.sort((a, b) => a.idx - b.idx);
        console.log(lecturelist.value);
    } catch (e) {
        console.error(e);
    }
}

const getmonthatt = async (lecture, month) => {
    try {
        console.log(lecture.idx, month);
        selectedtitle.value = lecture.title;
        selectedlecture.value = lecture;
        const res = await axios.get(`http://192.168.0.5:8080/attendance/monthview?idx=${lecture.idx}&month=${month}`);
        console.log(res.data);
        monthatt.value = processAttendanceData(res.data); // 데이터를 가공하는 함수를 호출
        console.log("Processed Month Attendance:", monthatt.value);
    } catch (e) {
        console.log(e);
    }
};

const getAttendanceType = (useridx, day) => {
    // studentAttendance를 찾을 때 useridx를 정수로 변환하여 비교합니다.
    const studentAttendance = monthatt.value.find(student => student.useridx === Number(useridx));

    console.log("Student Attendance:", studentAttendance);
    console.log("Month Attendance Data:", monthatt.value); // monthatt 배열 내용 확인

    if (!studentAttendance) return '-'; // 학생이 존재하지 않으면 '-'

    // 주말인지 확인
    const dayName = getDayName(day); // 날짜 이름 가져오기
    const isWeekendDay = /^일/.test(dayName) || /^토/.test(dayName); // 주말 여부 확인

    // 주말이면 '-'
    if (isWeekendDay) return '✖';

    // 해당 날짜에 대해 출결 정보가 없으면 '-'
    const attendanceInfo = studentAttendance.attendance[day];
    if (!attendanceInfo) {
        return '✔';
    }

    // 출결 정보가 있다면 해당 유형 반환
    return attendanceInfo.type || '-';
};




const processAttendanceData = (data) => {
    const attendanceMap = {};

    data.forEach(record => {
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
            approval: approval === null ? null : approval === 'true' ? true : approval === 'false' ? false : null
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
    const studentAttendance = monthatt.value.find(student => student.useridx === useridx); // useridx로 검색

    if (studentAttendance && studentAttendance.attendance[day]) {
        studentAttendance.attendance[day].approval = isApproved;

        try {
            await axios.post('http://192.168.0.5:8080/attendance/updateApproval', {
                useridx: useridx, // useridx도 전송할 수 있음
                adate: dayjs().year(currentYear.value).month(currentMonth.value).date(day + 1).format('YYYY-MM-DD'),  // day를 날짜 형식으로 변환
                type: studentAttendance.attendance[day].type,
                approval: isApproved,
            });
        } catch (e) {
            console.error('Approval update failed:', e);
        }
    }
};

onMounted(() => {
    getlecture();
});

</script>

<style lang="scss" scoped></style>