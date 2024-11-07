<template>
  <!--
user1,2 선생
user3,4 매니저
user5~15 학생
마스터
-->
  <div>
    <div class="m-5">
      <div class=""></div>
      <RouterView />
      <!-- 사이드배너 -->
      <div class="" id="sidebann">
        <div class="hidden"></div>
      </div>
    </div>
  </div>
  <LayoutFooter></LayoutFooter>

  <template v-if="role_number=='ROLE_STUDNET'">
    {{ console.log("학생") }}
    <StudentSideBar class="" style="position: fixed; top: 35%; left: 3%" v-if="sidecheck1" />
  </template>
  <template v-if="role_number=='ROLE_TEACHER'">
    {{ console.log("선생") }}
    <div>TEACHER</div>
  </template>
  <template v-if="role_number=='ROLE_MANAGER'">
    {{ console.log("매니저") }}
    <div>MANAGER</div>
  </template>
  
  <!-- <StudentSideBar  class="" style="position: fixed; top:35%; left:3%" v-if="sidecheck1"/>
<StudentSideBar  class="" style="position: fixed; top:35%; left:3%" v-if="sidecheck2"/> -->
</template>

<script setup>
import LayoutFooter from './layout/layoutFooter.vue';
import { useloginStore } from './stores/loginpinia';
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
// import { userrole } from './api/loginapi';
import { userdata } from './api/loginapi';

const router = useRouter();

const loginStore = useloginStore();
const { userrl } = storeToRefs(loginStore);
const { logincheckfalse } = loginStore;

const role_number = ref(''); 

console.log(`userrl = ${JSON.stringify(userrl)}`);

// watch(
//   () => route.fullPath, // 라우트 경로가 변경될 때 감지
//   () => {
//     usernameinput.value = false;
//     setTimeout(() => {
//       usernameinput.value = true;
//     }, 500);
//   }
// );

onMounted(async () => {
  if (localStorage.getItem('token') !== null) {
    userdata();
    //토큰 체크
    logincheckfalse();
    //권한 체크

    //사이드바 체크
    role_number.value = userrl.value;
    console.log("여기오냐"+role_number.value)
  }
  //  else{
  //   router.push({name:'loginview'})
  //    console.log("에러"+logincheckpinia )
  //  }
  homelogin();
});

const homelogin = () => {
  if (localStorage.getItem('token') !== null) {
    console.log('로그인 유지');

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
  } else {
    console.log('로그아웃 상태');
    router.push({ name: 'loginview' });
  }
};

homelogin();
</script>

<style lang="scss" scoped></style>
