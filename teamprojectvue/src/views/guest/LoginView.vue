<template>
  <div class="text-center">
    <div class="flex justify-center -m-5">
      <h1 class="font-mono font-black italic text-3xl tracking-tight flex flex-col">GREEN COMPUTER ARCADEMY</h1>
    </div>
    <div class="mx-auto mt-20 w-[40rem] p-4 transform bg-white shadow-md flex flex-col justify-center items-center">
      <div class="my-3 mt-10 space-y-3 justify-between">
        <p class="ml-10">
          ID<input
            class="ml-5 p-3 mb-5 w-80 transition duration-200 border-b border-gray-400 focus:outline-none"
            type="text"
            name="userid"
            id="userid"
            placeholder="아이디를 입력해주세요"
            v-model="userid"
          />
        </p>
        <p class="mr-12">
          PASSWORD<input
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
      <div class="m-2 my-5">
        <p class="pb-2 font-bold text-rose-600" v-if="loginError">{{ loginError }}</p>
        <input
          @click="LoginSequence"
          class="bg-blue-500 text-white font-bold py-2 px-16 rounded-lg shadow-md hover:bg-blue-300 transition duration-200 ease-in-out transform hover:scale-x-105"
          type="button"
          value="로그인"
        />
      </div>
      <router-link to="jointermsofuse"> <button class="text-sm text-blue-900">회원이 아니신가요?</button></router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import { userdata, userrole, logincontrol } from '@/api/loginapi';

const loginpinia = useloginStore();

const { userrl } = storeToRefs(loginpinia);

const userid = ref('');
const password = ref('');

const loginError = ref('');
const router = useRouter();

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
</script>

<style lang="scss" scoped></style>
