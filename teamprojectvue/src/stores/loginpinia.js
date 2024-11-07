import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useloginStore = defineStore('loginpinia', () => {
  const logincheckpinia = ref(true);
  const username = ref('');
  const userrl = ref('');

  const doLogin = (name,role)=>{
    username.value = name;
    userrl.value = role;
  }

  const userN = (usernamedata) => {
    username.value = usernamedata;
  };

  const userR = (userroledata) => {
    userrl.value = userroledata;
  };

  const check = () => {
    return logincheckpinia.value;
  };

  //로그인
  const logincheckfalse = () => {
    logincheckpinia.value = false;
    console.log('체크' + logincheckpinia.value);
  };

  //로그아웃
  const loginchecktrue = () => {
    logincheckpinia.value = true;
    console.log('체크' + logincheckpinia.value);
    return logincheckpinia.value;
  };
  
  return {
    logincheckfalse,
    loginchecktrue,
    check,
    userN,
    userR,
    logincheckpinia,
    username,
    userrl,
    doLogin
  };
});
