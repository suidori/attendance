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
                    - <input @input="showuser" type="text" v-model="phoneNumberthird" class="border border-gray-500">
                    <button @click="showuser"
                        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button">
                        조회하기
                    </button>
                </p>
                <p v-if="useravail" class="text-green-600">수강중: {{ attlist.at(0).lecture }}</p>
                <p v-if="!useravail" class="text-red-600">사용자를 찾을 수 없습니다.</p>
            </div>
            <div id="attendance" class="flex">
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
                                        <button
                                        @click="(event) => selectAttFn(event, items)"
                                        class="w-full font-bold text-white rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                                        :class="{
                                            'bg-green-500': items.approval == null && (items.type === '조퇴' || items.type === '외출' || items.type === '지각'),
                                            'bg-red-500': items.approval == null && items.type === '결석',
                                            'bg-blue-500': items.approval != null
                                        }"
                                        >{{ items.type }}</button>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div id="attadd" v-show="selectDate">
                    <h1>{{ selectDate }} 출결 등록</h1>
                    <p>1. 해당하는 출결 변동 사항을 선택 해 주세요.</p>
                    <p>
                        <input type="radio" value="지각" name="attendance" v-model="type" required>지각
                        <input type="radio" value="조퇴" name="attendance" v-model="type" required>조퇴
                        <input type="radio" value="외출" name="attendance" v-model="type" required>외출
                        <input type="radio" value="결석" name="attendance" v-model="type" required>결석
                    </p>
                    <p>2. 출결 변동의 원인을 적어주세요.</p>
                    <p><input type="text" placeholder="예시) 병원, 예비군 등" class="border border-gray-500" v-model="reason"></p>
                    <p>3. 출석 인정 사유에 해당됩니까?</p>
                    <p>
                        <input type="radio" value=false name="approval" v-model="approval" required> 예
                        <input type="radio" value=null name="approval" v-model="approval" required> 아니오
                    </p>
                    <button @click="attupdate"
                    class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button">
                    제출하기
                </button>
                </div>
                <div id="attupdate" v-show="selectAtt">
                    <h1>{{ attDate }} 출결 수정</h1>
                    <p>1. 해당하는 출결 변동 사항을 선택 해 주세요.</p>
                    <p>
                        <input type="radio" value="지각" name="attendance" v-model="type" required>지각
                        <input type="radio" value="조퇴" name="attendance" v-model="type" required>조퇴
                        <input type="radio" value="외출" name="attendance" v-model="type" required>외출
                        <input type="radio" value="결석" name="attendance" v-model="type" required>결석
                    </p>
                    <p>2. 출결 변동의 원인을 적어주세요.</p>
                    <p><input type="text" placeholder="예시) 병원, 예비군 등" class="border border-gray-500" v-model="reason"></p>
                    <p>3. 출석 인정 사유에 해당됩니까?</p>
                    <p>
                        <input type="radio" value=false name="approval" v-model="approval" required> 예
                        <input type="radio" value=null name="approval" v-model="approval" required> 아니오
                    </p>
                    <button @click="attupdate"
                    class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button">
                    수정하기
                </button>
                <button @click="attdelete"
                    class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="button">
                    삭제하기
                </button>
                </div>
                
            </div>
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
const selectAtt = ref(null);

const subMonth = () => {
    now.value = dayjs(now.value).subtract(1, 'month');
};
const addMonth = () => {
    now.value = dayjs(now.value).add(1, 'month');
};
const selectDateFn = (date) => {
    if(!useravail){
    return;
    }
    oldtype.value = null;   
    console.log('dateClick', dayjs(date).format('YYYY-MM-DD'));
    if (selectDate.value == dayjs(date).format('YYYY-MM-DD')) {
        selectDate.value = null;
    } else {
        type.value = '';
        reason.value = null;
        approval.value = null;
        selectAtt.value = null;
        selectDate.value = dayjs(date).format('YYYY-MM-DD');
    }
};

const oldtype = ref('');
const attDate = ref('');

const selectAttFn = (event, items) => {
    if(!useravail){
    return;
}
    event.stopPropagation();
    if(selectAtt.value == items){
        type.value = '';
        reason.value = null;
        approval.value = null;
        oldtype.value = null;
        attDate.value = null;
        selectAtt.value = null;
    } else {
        selectDate.value = null;
        selectAtt.value = items;
        type.value = items.type;
        reason.value = items.reason;
        oldtype.value = items.type;
        attDate.value = items.adate;
        approval.value = items.approval;
    }
    console.log('attClick', selectAtt.value);
    console.log(attDate.value);
}

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

const router = useRouter();

const name = ref('');
const phoneNumberfirst = ref('');
const phoneNumbersecond = ref('');
const phoneNumberthird = ref('');
const type = ref('');
const reason = ref('');
const approval = ref(null);
const useravail = ref(false);

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
        useravail.value = true;
        console.log(attlist.value);
    } catch (e) {
        console.log(e);
        useravail.value = false;
    }
}

const attupdate = async () => {

    if (!useravail) {
        alert('사용자가 유효하지 않습니다.');
        return;
    }

    const data = {
        "type": type.value,
        "reason": reason.value,
        "adate": (selectDate.value==null) ? attDate.value : selectDate.value,
        "approval": approval.value,
        "oldtype": oldtype.value,
        "user": {
            "name": name.value,
            "phoneNumber": `${phoneNumberfirst.value}-${phoneNumbersecond.value}-${phoneNumberthird.value}`
        }
    }

    try {
        const res = await axios.post('http://192.168.67:8080/attendance/attupdate', data)
        console.log(res)
        alert(`${(selectDate.value==null) ? attDate.value : selectDate.value}, ${name.value} 학생 ${type.value} 요청 완료!`)
        showuser();
    } catch (e) {
        console.log(e)
        alert('에러')
    }
}

const attdelete = async () => {
    if (!useravail) {
        alert('사용자가 유효하지 않습니다.');
        return;
    }

    try {
        const res = await axios.delete(`http://192.168.67:8080/attendance/attdelete/${selectAtt.value.idx}`)
        console.log(res)
        alert(`${selectAtt.value.adate}, ${name.value} 학생 ${type.value} 삭제 요청 완료!`)
        selectAtt.value = null;
        showuser();
    } catch (e) {
        console.log(e)
        alert('에러')
    }

}

</script>

<style lang="scss" scoped></style>