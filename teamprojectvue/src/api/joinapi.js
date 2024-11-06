import axios from "axios"
import { useRouter } from "vue-router";

const url = `http://192.168.103:8080`

   export const checkPhapi = async(phoneNumber) => {

            const phonechek = await axios.get(`http://192.168.103:8080/sign/checkphone?phoneNumber=${phoneNumber}`);
        
            console.log("폰넘버 후"+phonechek);

      return phonechek
          
}
    

export const checkI = async (userid) => {

        const idResponse = await axios.get(`http://192.168.103:8080/sign/checkid?userid=${userid}`);

    
      return idResponse

}


export const joinU = async (data) => {


      console.log(data)
     await axios.post(`http://192.168.0.103:8080/sign/signin`, data)
    
     if(localStorage.getItem('token')!==null){

      localStorage.removeItem('token')
     }
    
    // } catch (e) {
    //   console.log(e)
    //   alert('에러')
    // }

  }
