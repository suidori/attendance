<template>
  <img src="/src/images/wall5.png" alt="" class="absolute w-screen h-screen opacity-50 " />
  <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <div class="flex justify-center bg-gray-300 bg-opacity-30">
      <img src="/src/images/LOGO.png" alt="" class="w-28" />
      <h1
        class="font-mono font-black italic text-3xl tracking-tight flex items-center text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)] ml-5">
        GREEN COMPUTER ACADEMY
      </h1>
    </div>
    <div style="width: 860px;" class="flex mt-8 mx-auto max-lg:w-[40rem] h-[25rem] bg-white shadow-md rounded-lg">
      <!-- 로그인 섹션 -->
      <div class="w-[60%]   flex flex-col items-center ">
        <div class="space-y-3 w-full">
          <div class=" w-full  mb-16 flex">
<div class="border w-1/3 bg-white  h-16 cursor-pointer flex justify-center items-center rounded-tl-lg text-xl" @click="Choicest" :style="{ backgroundColor: isClicked1 ? '#eee' : 'white' }">학생</div>
<div class="border w-1/3 bg-white h-16 cursor-pointer flex justify-center items-center text-xl" @click="Choicete" :style="{ backgroundColor: isClicked2 ? '#eee' : 'white' }">선생</div>
<div class="border w-1/3 bg-white h-16 cursor-pointer flex justify-center items-center text-xl" @click="Choicema" :style="{ backgroundColor: isClicked3 ? '#eee' : 'white' }">매니저</div>
            <br>

            <!-- <form action="">
          
              <input @click="print" type="radio" id="role1" v-model="radiocheck"  name="role1"  value="ROLE_STUDENT"/>
              <label for="role1" class="mt-1 ml-3 mr-6 text-gray-800">학생</label>
         
              <input @click="print" type="radio" id="role2" v-model="radiocheck"  name="role2"  value="ROLE_TEACHER" />
              <label for="role2" class="mt-1 ml-3 mr-6 text-gray-800">선생님</label>
           
              <input @click="print" type="radio" id="role3" v-model="radiocheck"  name="role3"  value="ROLE_MANAGER"/>
              <label for="role3" class="mt-1 ml-3 mr-6 text-gray-800">매니저</label>
           
          </form> -->

          </div>

          <div class="flex justify-between text-center ">
            <p class="flex items-center justify-center ml-10 max-lg:text-left">ID</p>
            <input class="p-3 mr-6 mb-5 transition  duration-200 border-b border-gray-400 w-80 focus:outline-none"
              type="text" name="userid" id="userid" placeholder="아이디를 입력해주세요" v-model="userid" />
          </div>
          <p class="ml-10">
            PASSWORD
            <input class="p-3 ml-5 transition duration-200 border-b border-gray-400 w-80 focus:outline-none"
              type="password" name="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요"
              @keydown.enter="LoginSequence" />
          </p>
        </div>
        <div class="justify-center block m-2 my-5">
          <p class="block pb-2 font-bold text-rose-600" v-if="loginError">{{ loginError }}</p>
          <input @click="LoginSequence"
            class="px-16 py-2 mx-10 font-bold text-white transition duration-200 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-300 hover:scale-x-105"
            type="button" value="로그인" />
        </div>
        <router-link to="jointermsofuse">
          <button class="text-sm text-blue-900">회원이 아니신가요?</button>
        </router-link>
      </div>
      <!-- Notice Box Section -->
      <div class="w-[40%] flex items-center justify-center bg-gray-100 p-4 rounded-r-lg shadow-inner">
        <div class="text-center">
          <div>
            <div v-if="arr">
              <p class="py-2 text-sm font-semibold text-left text-gray-600">공지사항</p>
              <ul v-for="(item, index) in arr" :key="item.idx">
                <li v-if="index < 5" class="text-[1vw] text-left mt-1">{{ item.title }}</li>
                <li v-if="index < 5" class="text-[0.7vw] text-right mb-1">{{ item.wdate.substring(0, 8) }}</li>
              </ul>
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
import { loginannounceapi } from '@/api/announceapi';


const loginpinia = useloginStore();

const { userrl, useraccept } = storeToRefs(loginpinia);
const { userL, userA } = loginpinia;

const userid = ref('');
const password = ref('');

const loginError = ref('');
const router = useRouter();

const arr = ref([]);

const radiocheck = ref('ROLE_STUDENT')

const isClicked1 = ref(true)
const isClicked2 = ref(false)
const isClicked3 = ref(false)

const getannounce = async () => {

  const res = await loginannounceapi();
  arr.value = res.data.list;
}

const LoginSequence = async () => {
  const data = {
    userid: userid.value,
    password: password.value
  };
  // 백엔드로 보낼 데이터
  try {
    const token = await logincontrol(data);
    if (token === undefined) {
      loginError.value = '아이디와 비밀번호를 확인해 주세요'
      return;
    }

    console.log('최종 토큰' + token);

    await userdata();
    if (!useraccept.value) {
      userL();
      localStorage.removeItem('token');
      loginError.value = '가입 승인 후에 활동 가능합니다.'
      return;
    }

    await userrole();


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

  } catch (e) {
    console.log('로그인실패 ' + e);

    loginError.value = '아이디와 비밀번호를 확인해 주세요';
    return;
  }
};


const Choicest = () => {
  isClicked1.value = true
  isClicked2.value = false
  isClicked3.value = false
radiocheck.value = 'ROLE_STUDENT'
console.log(radiocheck.value)

}
const Choicete = () => {
  isClicked1.value = false
  isClicked2.value = true
  isClicked3.value = false
  radiocheck.value = 'ROLE_TEACHER'
  console.log(radiocheck.value)

}
const Choicema = () => {
  isClicked1.value = false
  isClicked2.value = false
  isClicked3.value = true
  radiocheck.value = 'ROLE_MANAGER'
  console.log(radiocheck.value)

}


onMounted(async () => {
  getannounce();
  userL();
});
</script>

<style lang="scss" scoped></style>