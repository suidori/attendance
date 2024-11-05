
import axios from "axios"
import { useloginStore } from "@/stores/loginpinia"
// import { ref } from "vue"


const url = `http://192.168.103:8080`



export const userdata = async() => {

    const token = localStorage.getItem('token')
    
    const res = await axios.get(`${url}/user/getuser`, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    console.log("유저정보"+JSON.stringify(res.data.name))

    const logincheck = useloginStore()

    logincheck.userN(JSON.stringify(res.data.name))
   
}


export const userrole = async() => {

    const token = localStorage.getItem('token')
    
const res = await axios.get(`${url}/user/getrole`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    
    
 )
    

 



 const logincheck = useloginStore()

    console.log(res.data) 
 
    logincheck.userR(res.data)


}


export const logincontrol = async(data) =>{


    const logincheck = useloginStore()

    const {logincheckfalse} = logincheck;
     

try{

    const response = await axios.post(`${url}/sign/login`, data)

     
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

    
    
    
    
   