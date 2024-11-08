<template>
  <!--
user1,2 선생
user3,4 매니저
user5~15 학생
마스터
-->
  <div style="width: 1200px; margin:0 auto" 
      class="font-[GmarketSansMedium] flex justify-center">
    <RouterView />
  </div>
  <LayoutFooter></LayoutFooter>

  <template v-if="userrlvalue == 'ROLE_STUDENT'">
    <StudentSideBar class="" style="position: fixed; top: 1%; left: 11%" />
  </template>
  <template v-if="userrlvalue == 'ROLE_TEACHER'">
    <TeacherSideBar class="" style="position: fixed; top: 1%; left: 11%" />
  </template>
  <template v-if="userrlvalue == 'ROLE_MANAGER'">
    <ManagerSideBar class="" style="position: fixed; top: 1%; left: 11%" />
  </template>

  <!-- <StudentSideBar  class="" style="position: fixed; top:35%; left:3%" v-if="sidecheck1"/>
<StudentSideBar  class="" style="position: fixed; top:35%; left:3%" v-if="sidecheck2"/> -->
</template>

<script setup>
import ManagerSideBar from './layout/ManagerSideBar.vue';
import StudentSideBar from './layout/StudentSideBar.vue';
import TeacherSideBar from './layout/TeacherSideBar.vue';
import LayoutFooter from './layout/layoutFooter.vue';
import { useloginStore } from './stores/loginpinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { userdata, userrole } from './api/loginapi';
import { computed } from 'vue';

const router = useRouter();

const loginStore = useloginStore();
const { userrl } = storeToRefs(loginStore);
const { logincheckfalse } = loginStore;

const userrlvalue = computed(() => loginStore.userrl);

console.log(`userrl = ${JSON.stringify(userrl)}`);

const homelogin = async () => {
  await userrole();

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

onMounted(async () => {
  userdata();
  if (localStorage.getItem('token') !== null) {
    userdata();
    //토큰 체크
    logincheckfalse();
    //권한 체크

    //사이드바 체크
  }
  //  else{
  //   router.push({name:'loginview'})
  //    console.log("에러"+logincheckpinia )
  //  }
  homelogin();
});
</script>

<style lang="scss" scoped></style>
