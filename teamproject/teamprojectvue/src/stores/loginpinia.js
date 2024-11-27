import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';

export const useloginStore = defineStore('loginpinia', () => {
  const logincheckpinia = ref(true);
  const username = ref('');
  const userrl = ref('');
  const useraccept = ref(false);

  const doLogin = (name,role,accept)=>{
    username.value = name;
    userrl.value = role;
    useraccept.value = accept;
    
  }

  const userA = () => {
    console.log(useraccept.value);
    return useraccept.value;
  }

  const userN = (usernamedata) => {
    username.value = usernamedata;
  };

  const userR = (userroledata) => {
    
    userrl.value = userroledata;
  };



  const userL = ()=> {

  //  if(localStorage.getItem('token') !==null) {
  if(Cookies.get('token') !==null ){
    userrl.value = null
   }
  }

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
    doLogin,
    userL,
    useraccept,
    userA,
  };
});
