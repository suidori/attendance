import axios from 'axios';
import { GLOBAL_URL } from './utils';


const url = `${GLOBAL_URL}`

export const fetchVacationsapi = async(pageNum) => {

    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${url}/vacation/teacher?pageNum=${pageNum - 1}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          return response

    }catch(e){
        console.log(e)
    }
}


export const showuserapi = async() => {

try{
    const token = localStorage.getItem('token')

    const resuser = await axios.get(`${url}/user/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return resuser

}catch(e){
    console.log(e)
    }
}

export const getattlistapi = async(data) => {

    try{
        const resatt = await axios.post(`${url}/attendance/getuser`, data);

        return resatt.data

    }catch(e){
        console.log(e)
    }
}

export const getuserapi = async() => {

    try{
        const token =  localStorage.getItem('token');

      const res = await axios.get(`${url}/user/getuser`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const teachercheckapi = async (idx) => {

    try{

        await axios.post(`${url}/attendance/teacheraccept/${idx}`);
    
    }catch(e){
        console.log(e)
    }
}

export const todayviewapi = async() => {

    try{
        const token = localStorage.getItem('token');
        const res = await axios.get(`${url}/attendance/todayteacherview`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        return res

    }catch(e){
        console.log(e)
    }
}

export const getlectureapi = () => {

    
}