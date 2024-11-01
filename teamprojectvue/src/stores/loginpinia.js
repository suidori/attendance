import { defineStore } from "pinia";
import { ref } from "vue";




export const useloginStore = defineStore('loginpinia',  ()=>{


    const logincheckpinia = ref(true)



    const check = () => {


        return logincheckpinia.value

    }





    const logincheckfalse = () => {

       //로그인상태에서 로그아웃

        
      
        logincheckpinia.value = false

        console.log("체크"+logincheckpinia.value)

  
    }

    const loginchecktrue = () => {


        //로그아웃 상태에서 로그인

        
        logincheckpinia.value = true
        console.log("체크"+logincheckpinia.value)

     
    }

   

    return {logincheckfalse, loginchecktrue,  check, logincheckpinia}
    
    
    }

    

    
)
