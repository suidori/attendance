import { defineStore } from "pinia";
import { ref } from "vue";


<<<<<<< HEAD
export const useloginStore = defineStore('loginpinia',  ()=>{

    const logincheckpinia = ref(true)


    const username = ref('')
    
   

    const userN = (usernamedata) =>{

        username.value = usernamedata;

    }



=======


export const useloginStore = defineStore('loginpinia',  ()=>{


    const logincheckpinia = ref(true)


>>>>>>> origin/우혁

    const check = () => {


        return logincheckpinia.value

    }

<<<<<<< HEAD
    const logincheckfalse = () => {

       //로그인

        logincheckpinia.value = false



        console.log("체크"+logincheckpinia.value)

=======




    const logincheckfalse = () => {

       //로그인상태에서 로그아웃

        
      
        logincheckpinia.value = false

        console.log("체크"+logincheckpinia.value)

  
>>>>>>> origin/우혁
    }

    const loginchecktrue = () => {

<<<<<<< HEAD
        //로그아웃

        logincheckpinia.value = true
        console.log("체크"+logincheckpinia.value)





=======

        //로그아웃 상태에서 로그인

        
        logincheckpinia.value = true
        console.log("체크"+logincheckpinia.value)

>>>>>>> origin/우혁
     
    }

   

<<<<<<< HEAD
    return {logincheckfalse, loginchecktrue,  check , userN,  logincheckpinia, username}
=======
    return {logincheckfalse, loginchecktrue,  check, logincheckpinia}
>>>>>>> origin/우혁
    
    
    }

    

    
)
