import axios from 'axios';
import { GLOBAL_URL } from './utils';


const url = `${GLOBAL_URL}`


export const getavaillectureapi = async() => {

    try{
    
       const res = await axios.get(`${url}/lecture/availlist`);

       return res

    }catch(e){
          console.log(e)
    }
}

export const lecturejoinapi = async(data) => {

    const token = localStorage.getItem('token');

    try{

      const res = await axios.post(`${url}/lecture/join`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const insertlectureapi = async(data) => {

    try{

      const res = await axios.post(`${url}/lecture/save`, data);

      return res

    }catch(e){
        console.log(e)
    }
}

export const getavaillecturelistapi = async() => {

    try{

       const res = await axios.get(`${url}/lecture/list`);

       return res

    }catch(e){
        console.log(e)
    }
}