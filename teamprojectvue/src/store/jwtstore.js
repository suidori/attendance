
import { defineStore } from "pinia"
import axios from "axios"


export const usejwtStore = ()=> defineStore ('jwt', ()=> {


    const tokenjoin = async()=>{

        const res = await axios.get(``)

        if(res !==null){
    
            const token = localStorage.getItem('token', res.data)
    
            return token
    
        }
    

    }

   
    
    return {tokenjoin}


})