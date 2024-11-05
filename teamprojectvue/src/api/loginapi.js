
import axios from "axios"
import { useloginStore } from "@/stores/loginpinia"




export const logincontrol = async(data) =>{


    const logincheck = useloginStore()

    const {logincheckfalse} = logincheck;
    
   

try{

    const response = await axios.post(`http://192.168.103:8080/sign/login`, data)

     
       localStorage.setItem('token', response.data)

       const token = localStorage.getItem('token')


      console.log('로그인 성공, 토큰:' + token)


      

       const c = logincheckfalse()
       console.log("체크false"+ c + "======" + token)


       return token
      


    


}catch (e){
    console.log(e)
    
} 
}

    
    
    
    
   