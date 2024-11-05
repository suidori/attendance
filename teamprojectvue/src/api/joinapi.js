import axios from "axios"


const url = `http://192.168.103:8080`


   export const checkPhapi = async(phoneNumber) => {

            const phoneResponse = await axios.get(`${url}/sign/checkphone?phoneNumber=${phoneNumber}`);
        
            console.log(phoneNumber);
            console.log(phoneResponse);
        
            return phoneResponse
}
    


export const checkI = async (userid) => {

        const idResponse = await axios.get(`${url}/sign/checkid?userid=${userid}`);
    
      return idResponse

}



export const joinU = async (data) => {


    if(localStorage.getItem('token')!==null){

        localStorage.removeItem('token')
  
      }
  
      const res = await axios.post(`${url}/sign/signin`, data)

      return res

}
