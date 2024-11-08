import axios from "axios"
import { GLOBAL_URL } from "./utils"

const url = `${GLOBAL_URL}`

export const profiledata = async() => {
    try{
        const token = localStorage.getItem('token')
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

    const token = localStorage.getItem('token')
    const mylectureres = await axios.get(`${url}/lecture/mylecture`, {
        headers: {
            Authorization: `Bearer ${token}`
          }
    } )

    return mylectureres
}