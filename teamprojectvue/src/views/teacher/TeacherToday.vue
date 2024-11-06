<template>
    <router-link to="teachercalander" class="bg-green-300">
        달력보기
    </router-link>
    <h1>오늘의 출결 변동 한눈에 보기</h1>
    <h1 v-if="user">{{ user.name }} 선생님, 환영합니다.</h1>
    <div v-if="arr.length > 0" class="overflow-x-auto">
        <h1>{{ arr.at(0).lecture }} 강좌의 출결 변동 목록입니다.</h1>
        <table class="border border-collapse border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-2 border border-gray-300">학생</th>
                    <th class="p-2 border border-gray-300">출결 상태</th>
                    <th class="p-2 border border-gray-300">사유</th>
                    <th class="p-2 border border-gray-300">교사 확인</th>
                    <th class="p-2 border border-gray-300">행정실 확인</th>
                    <th class="p-2 border border-gray-300">병결</th>
                    <th class="p-2 border border-gray-300"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="students in arr" :key="students.idx" class="hover:bg-gray-50">
                    <td class="p-2 border border-gray-300">{{ students.user }}</td>
                    <td class="p-2 border border-gray-300">{{ students.type }}</td>
                    <td class="p-2 border border-gray-300">{{ students.reason }}</td>
                    <td class="p-2 border border-gray-300">{{ students.teacheraccept }}</td>
                    <td class="p-2 border border-gray-300">{{ students.manageraccept }}</td>
                    <td class="p-2 border border-gray-300">{{ students.approval }}</td>
                    <td class="p-2 border border-gray-300">
                        <button v-if="students.teacheraccept == '담당교사 확인 대기중'" @click="teachercheck(students.idx)"
                            class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">확인</button>
                        <div v-else class="px-2 py-1 mr-1" style="opacity: 0;">확인</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const arr = ref([]);
const user = ref(null);

const teachercheck = async (idx) => {
    try {
        await axios.post(`http://192.168.0.103:8080/attendance/teacheraccept/${idx}`);
        
        const item = arr.value.find(student => student.idx === idx);
        if (item) {
            item.teacheraccept = '담당교사 확인 완료';
        }
    } catch (e) {
        console.log(e);
    }
}


const getuser = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://192.168.0.103:8080/user/getuser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        user.value = res.data;
    } catch (e) {
        console.log(e);
    }
}

const todayview = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://192.168.0.103:8080/attendance/todayteacherview`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

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
}



onMounted(() => {
    getuser();
    todayview();
});

</script>

<style lang="scss" scoped></style>