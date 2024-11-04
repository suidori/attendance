import { defineStore } from "pinia";
import { ref } from "vue";


export const useloginStore = defineStore('loginpinia',  ()=>{

    const logincheckpinia = ref(true)


    const username = ref('')
    
   

    const userN = (usernamedata) =>{

        username.value = usernamedata;

    }




    const check = () => {


        return logincheckpinia.value

    }

    const logincheckfalse = () => {

       //로그인

        logincheckpinia.value = false



        console.log("체크"+logincheckpinia.value)

    }

    const loginchecktrue = () => {

        //로그아웃

        logincheckpinia.value = true
        console.log("체크"+logincheckpinia.value)





     
    }

   

    return {logincheckfalse, loginchecktrue,  check , userN,  logincheckpinia, username}
    
    
    }

    

    
)
