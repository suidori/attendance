<template>
  <img src="/src/images/wall5.png" alt="" class="h-screen w-screen absolute opacity-50" />
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div class="flex justify-center bg-opacity-30 bg-gray-300">
      <img src="/src/images/LOGO.png" alt="" class="w-28" />
      <h1 class="font-mono font-black italic text-3xl tracking-tight flex items-center text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)] ml-5">
        GREEN COMPUTER ACADEMY
      </h1>
    </div>
    <div style="width: 860px;"
      class="flex mt-8 mx-auto max-lg:w-[40rem] h-[25rem] bg-white shadow-md rounded-lg">
      <!-- 로그인 섹션 -->
      <div class="w-[60%] p-4 flex flex-col items-center justify-center">
        <div class="space-y-3">
          <div class="flex justify-center items-center mb-10 space-x-8">

          <form action="">
          
              <input @click="print" type="radio" id="role1" v-model="radiocheck"  name="role1"  value="ROLE_STUDENT"/>
              <label for="role1" class="text-gray-800 ml-3 mr-6 mt-1">학생</label>
         
              <input @click="print" type="radio" id="role2" v-model="radiocheck"  name="role2"  value="ROLE_TEACHER" />
              <label for="role2" class="text-gray-800 ml-3 mr-6 mt-1">선생님</label>
           
              <input @click="print" type="radio" id="role3" v-model="radiocheck"  name="role3"  value="ROLE_MANAGER"/>
              <label for="role3" class="text-gray-800 ml-3 mr-6 mt-1">매니저</label>
           
          </form>

          </div>

          <div class="flex justify-between text-center">
            <p class="max-lg:text-left flex justify-center items-center">ID</p>
            <input
              class="ml-5 p-3 mb-5 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
              type="text"
              name="userid"
              id="userid"
              placeholder="아이디를 입력해주세요"
              v-model="userid"
            />
          </div>
          <p>
            PASSWORD
            <input
              class="ml-5 p-3 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="비밀번호를 입력해주세요"
              @keydown.enter="LoginSequence"
            />
          </p>
        </div>
        <div class="m-2 my-5 justify-center block">
          <p class="pb-2 font-bold text-rose-600 block" v-if="loginError">{{ loginError }}</p>
          <input
            @click="LoginSequence"
            class="mx-10 bg-blue-500 text-white font-bold py-2 px-16 rounded-lg shadow-md  hover:bg-blue-300 transition duration-200 ease-in-out transform hover:scale-x-105"
            type="button"
            value="로그인"
          />
        </div>
        <router-link to="jointermsofuse">
          <button class="text-sm text-blue-900">회원이 아니신가요?</button>
        </router-link>
      </div>
      <!-- Notice Box Section -->
      <div class="w-[40%] flex items-center justify-center bg-gray-100 p-4 rounded-r-lg shadow-inner">
        <div class="text-center">
          <div>

          
          <div v-if= "contentcheck">
            <ul  v-for="item in arr" :key="item.idx">
             <li>{{contentlist}}</li>
             <li>{{setdate}}</li>
              </ul>
            </div>
           <div v-else >
             <p class="text-gray-600 text-sm font-semibold text-left py-2">공지사항</p>
             <p class="text-gray-700 mt-2">현재 서비스 점검 중입니다. 이용에 불편을 드려 죄송합니다.</p>
          </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import { userdata, userrole, logincontrol } from '@/api/loginapi';
import { onMounted } from 'vue';

const loginpinia = useloginStore();

const { userrl } = storeToRefs(loginpinia);
const { userL } = loginpinia;

const userid = ref('');
const password = ref('');

const loginError = ref('');
const router = useRouter();

const contentcheck = ref(false)
const contentlist = ref('')
const setdate = ref('')

const radiocheck = ref('ROLE_STUDENT')


// const errorMessage = ref('') // 에러 메시지를 저장할 변수

const LoginSequence = async () => {
  const data = {
    userid: userid.value,
    password: password.value
  };
  // 백엔드로 보낼 데이터
  try {
    const token = await logincontrol(data);
    console.log('최종 토큰' + token);

    await userdata();
    await userrole();

    //  if(userrl.value !==radiocheck.value){

    //   alert("로그인 권한 체크확인 바랍니다.")



    //  userL();
    //  localStorage.removeItem('token')
    //  return
     
      
    // }

    if (userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정');
      router.push({ name: 'stdatt' });
    } else if (userrl.value == 'ROLE_TEACHER') {
      console.log('선생계정');
      router.push({ name: 'teachertoday' });
    } else if (userrl.value == 'ROLE_MANAGER') {
      console.log('매니저계정');
      router.push({ name: 'deskcalander' });
    } else {
      console.log('맵핑문제');
    }

    //  router.push({ path: 'stdatt' })
  } catch (e) {
    console.log('로그인실패 ' + e);

    loginError.value = '아이디와 비밀번호를 확인해 주세요';
    return;
  }
};



onMounted(async () => {
  
  userL();
});
</script>

<style lang="scss" scoped></style>
