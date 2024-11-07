<template>
  <div>
    <div class="font-[GmarketSansMedium]">

      <RouterView />


    </div>
  </div>
  <layoutHeader></layoutHeader>

</template>

<script setup>
import layoutHeader from './layout/layout-header.vue';
import { useloginStore } from './stores/loginpinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
// import { userrole } from './api/loginapi';
import { userdata } from './api/loginapi';


const loginStore = useloginStore();

const router = useRouter();

const { logincheckpinia,  userrl } = storeToRefs(loginStore);
const { logincheckfalse } = loginStore;


onMounted(async () => {
  userdata();

  if (localStorage.getItem('token') !== null) {
    //토큰 체크
    logincheckfalse();
    //권한 체크

    //사이드바 체크

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

    console.log('로그인 체크' + logincheckpinia);
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
