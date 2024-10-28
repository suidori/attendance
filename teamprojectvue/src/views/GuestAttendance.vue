<template>
    <div id="container" class="flex">
        <div id="leftmenu" class="p-4 border border-blue-500 w-36">
            <h1>메뉴</h1>
            <RouterLink to="/join">
                <h1>회원가입</h1>
            </RouterLink>
            <RouterLink to="/loginview">
                <h1>로그인</h1>
            </RouterLink>
        </div>
        <div id="main">
            <div id="user">
                <h1>비로그인용 출결 관리</h1>
                <p>이름 <input type="text" placeholder="입력해주세요" class="border border-gray-500" v-model="name"></p>
                <p>전화번호 <label for="items"> </label>
                    <select id="items" name="items" class="border border-gray-500" v-model="phoneNumberfirst">
                        <option value="010" selected>010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                    </select>
                    - <input type="text" v-model="phoneNumbersecond" class="border border-gray-500">
                    - <input type="text" v-model="phoneNumberthird" class="border border-gray-500">
                    <button @click="showuser"
                        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button">
                        조회하기
                    </button>
                </p>
            </div>
            <div id="calander" class="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
                <h1 class="mb-4 text-xl font-bold text-center">
                    <button @click="subMonth()" class="mr-2"><i class="fas fa-arrow-left">&lt;&lt;</i></button>
                    {{ now.format('YYYY년 MM월') }}
                    <button @click="addMonth()" class="ml-2"><i class="fas fa-arrow-right">&gt;&gt;</i></button>
                </h1>
                <div class="grid grid-cols-7 gap-2 text-center text-gray-600">
                    <div class="p-2 px-4 text-red-600">일</div>
                    <div class="p-2 px-4">월</div>
                    <div class="p-2 px-4">화</div>
                    <div class="p-2 px-4">수</div>
                    <div class="p-2 px-4">목</div>
                    <div class="p-2 px-4">금</div>
                    <div class="p-2 px-4 text-blue-500">토</div>
                </div>
                <div class="grid grid-cols-7 gap-2" v-for="group in groupColumns" :key="group.length">
                    <div @click="selectDateFn(column)" v-for="(column, index) in group"
                        :key="column.format('YYYY-MM-DD')" class="p-2 text-center cursor-pointer hover:bg-blue-200"
                        :class="{
                            'text-red-600': index % 7 == 0,
                            'text-blue-600': index % 7 == 6,
                            'opacity-20': !column.isSame(now, 'month'),
                        }">
                        <span>{{ column.get('date') }}</span>
                        <template v-for="items in attlist" :key="items.adate">
                            <div v-if="items.adate == column.format('YYYY-MM-DD')">
                                <div class="mt-2 text-green-600">
                                    <span>{{ items.type }}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div id="attendance" v-show="selectDate">
                <h1>{{ selectDate }} 출결 수정</h1>
                <p>1. 해당하는 출결 변동 사항을 선택 해 주세요.</p>
                <p>
                    <input type="radio" value="지각" name="attendance" v-model="type">지각
                    <input type="radio" value="조퇴" name="attendance" v-model="type">조퇴
                    <input type="radio" value="외출" name="attendance" v-model="type">외출
                    <input type="radio" value="결석" name="attendance" v-model="type">결석
                </p>
                <p>2. 출결 변동의 원인을 적어주세요.</p>
                <p><input type="text" placeholder="예시) 병원, 예비군 등" class="border border-gray-500" v-model="reason"></p>
            </div>
            <button @click="guestattendance"
                class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button">
                제출하기
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const now = ref(dayjs());
const columns = ref([]);
const groupColumns = ref([]);

const selectDate = ref(null);

const subMonth = () => {
    now.value = dayjs(now.value).subtract(1, 'month');
};
const addMonth = () => {
    now.value = dayjs(now.value).add(1, 'month');
};
const selectDateFn = (date) => {
    console.log('dateClick', dayjs(date).format('YYYY-MM-DD'));
    if (selectDate.value == dayjs(date).format('YYYY-MM-DD')) {
        selectDate.value = null;
    } else {
        selectDate.value = dayjs(date).format('YYYY-MM-DD');
    }
};

watch(
    now,
    (newValue, _) => {
        columns.value = []; // 원래 있던 값 제거
        groupColumns.value = []; // 원래 있던 값 제거
        // 제일 처음 로딩 할때는 now는 현재 달력...
        const startday = dayjs(now.value).startOf('month');
        const lastday = dayjs(now.value).endOf('month');
        const startdayOfWeek = startday.get('day');
        const lastdayOfWeek = lastday.get('day');

        // 저번달에 날짜 추가
        for (let i = 1; i <= startdayOfWeek; i++) {
            columns.value.unshift(dayjs(startday).subtract(i, 'day'));
        }
        // 현재 달력에 날짜 추가
        for (let i = 0; i < lastday.get('date'); i++) {
            columns.value.push(dayjs(startday).add(i, 'day'));
        }
        // 다음달에 날짜 추가
        for (let i = 1; i <= 6 - lastdayOfWeek; i++) {
            columns.value.push(dayjs(lastday).add(i, 'day'));
        }
        // groupColumns
        //   7                 7                   7                     7                      7
        // ([29,30,1,2,3,4,5],[6,7,8,9,10,11,12],[13,14,15,16,17,18,19],[20,21,22,23,24,25,26],[27,28,29,30,31,1,2]))

        groupColumns.value.push(columns.value.slice(0, 7));
        groupColumns.value.push(columns.value.slice(7, 14));
        groupColumns.value.push(columns.value.slice(14, 21));
        groupColumns.value.push(columns.value.slice(21, 28));
        groupColumns.value.push(columns.value.slice(28, 35));
    },
    {
        immediate: true, // 현재페이지 처음 로딩 될때 도 실행
        deep: true, // 안에 값이 객체이면 객체 안에 변수도 변경 될때 watch안에 있는 함수 실행
    },
);

watchEffect(async () => {
    const res = await getTodos();
    if (res.status == 200) {
        todos.value = res.data;
    }
});

const router = useRouter();

const name = ref('');
const phoneNumberfirst = ref('');
const phoneNumbersecond = ref('');
const phoneNumberthird = ref('');
const type = ref('');
const reason = ref('');

const attlist = ref([]);

const showuser = async () => {
    const data = {
        "user": {
            "name": name.value,
            "phoneNumber": `${phoneNumberfirst.value}-${phoneNumbersecond.value}-${phoneNumberthird.value}`
        },
        "month": dayjs(now.value).format('YYYY-MM')
    }

    try {
        const res = await axios.post('http://192.168.0.67:8080/attendance/getuser', data)
        attlist.value = res.data;
        console.log(attlist.value);
    } catch (e) {
        console.log(e);
        alert('에러');
    }
}

const guestattendance = async () => {
    const data = {
        "type": type.value,
        "reason": reason.value,
        "adate": selectDate.value,
        "user": {
            "name": name.value,
            "phoneNumber": `${phoneNumberfirst.value}-${phoneNumbersecond.value}-${phoneNumberthird.value}`
        }
    }

    try {
        const res = await axios.post('http://192.168.67:8080/attendance/unlogin', data)
        console.log(res)
        alert(`${selectDate.value}, ${name.value} 학생 ${type.value} 요청 완료!`)
        router.push({ name: 'loginhome' })
    } catch (e) {
        console.log(e)
        alert('에러')
    }
}

</script>

<style lang="scss" scoped></style>