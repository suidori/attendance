
import axios from "axios"
import { useloginStore } from "@/stores/loginpinia"
import { ref } from "vue"



export const userdata = async() => {

    const token = localStorage.getItem('token')
    
    const res = await axios.get(`http://192.168.0.103:8080/userandlecture/userlist`, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    console.log("유저정보"+JSON.stringify(res.data.list[0].user))

    const logincheck = useloginStore()

    logincheck.userN(JSON.stringify(res.data.list[0].user))
   
}


export const userrole = async() => {



    const token = localStorage.getItem('token')

    const role = ref('')

const res = await axios.get(`http://192.168.0.103:8080/user/getuser`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
 )
    
role.value = res.role;
 
return role.value;

}

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

    
    
    
    
   