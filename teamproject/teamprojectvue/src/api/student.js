import axios from "axios"
import { GLOBAL_URL } from "./utils"
import Cookies from "js-cookie"

const url = `${GLOBAL_URL}`

export const profiledata = async() => {
    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token')
        const profileres = await axios.get(`${url}/user/getuser`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        return profileres
    }catch(e){
        console.log(e)
    }
}

export const getmylecture = async() => {

    const token = Cookies.get('token')
    // const token = localStorage.getItem('token')
    const mylectureres = await axios.get(`${url}/lecture/mylecture`, {
        headers: {
            Authorization: `Bearer ${token}`
          }
    } )

    return mylectureres
}

export const subapi = async(data) => {

    try{
        const token = Cookies.get('token')
        const res = await axios.post('http://greencomart.kro.kr:716/vacation/request', data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const showuserresuserapi = async()=> {

    try{
        const token = Cookies.get('token')
        const resuser = await axios.get('http://greencomart.kro.kr:716/user/getuser', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return resuser

    }catch(e){
        console.log(e)
    }
}

export const showuserresattapi = async(data) => {
    try{
        const resatt = await axios.post('http://greencomart.kro.kr:716/attendance/getuser', data);

        return resatt
    }catch(e){
        console.log(e)
    }
}


export const stunCheckedapi = async(pageNum=1) => {

    try{
        const token = Cookies.get('token');
        // const token = localStorage.getItem('token');
        const response = await axios.get(`http://greencomart.kro.kr:716/vacation/studentunchecked?pageNum=${pageNum - 1}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        return response

    }catch(e){
        console.log(e)
    }
}

export const stfetchVacationsapi = async(pageNum=1) => {

    try{
        const token = Cookies.get('token')
    // const token = localStorage.getItem('token');
    const response = await axios.get(`http://greencomart.kro.kr:716/vacation/student?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response
    }catch(e){
        console.log(e)
    }
}

export const stshowuserapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
    
        const resuser = await axios.get('http://greencomart.kro.kr:716/user/getuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return resuser

    }catch(e){
        console.log(e)
    }
}

export const stshowuserttapi = async() => {

    try{
        const resatt = await axios.post('http://greencomart.kro.kr:716/attendance/getuser', data);

        return resatt
    }catch(e){
        console.log(e)
    }
}


export const stshowuserattapi = async() => {
    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
    
        const resuser = await axios.get('http://greencomart.kro.kr:716/user/getuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
         return resuser

    }catch(e){
        console.log(e)
    }
}

export const stshowuseratt2api = async(data) => {
    try{
        const resatt = await axios.post('http://greencomart.kro.kr:716/attendance/getuser', data);

        return resatt
    }catch(e){
        console.log(e)
    }

}

export const stattupdate = async(data) => {
    try{
        const res = await axios.post('http://greencomart.kro.kr:716/attendance/attupdate', data);
        return res
    }catch(e){
        console.log(e)
    }
}

export const stattdelete = async (idx) => {
    try{
        const res = await axios.delete(
            `http://greencomart.kro.kr:716/attendance/attdelete/${idx}`
          );
      
          return res

    }catch(e){
        console.log(e)
    }
}


export const stgetlectureapi = async() => {
    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
        const res = await axios.get(`http://greencomart.kro.kr:716/lecture/mylecture`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return res
    }catch(e){
        console.log(e)
    }
}

export const stfetchannounceForAllapi = async(pageNum = 1) => {

    try{
        const response = await axios.get(`http://greencomart.kro.kr:716/announce/searchforall?pageNum=${pageNum - 1}`);
        return response

    }catch(e){
        console.log(e)
    }

}