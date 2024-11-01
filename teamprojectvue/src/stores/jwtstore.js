
import { defineStore } from "pinia"
import axios from "axios"


export const usejwtStore = ()=> defineStore ('jwt', ()=> {


    const tokenjoin = async()=>{

        const res = await axios.get(``)

        if(res !==null){
    
            localStorage.getItem('token', res.data)
    
            const token = localStorage.setItem('token')


            return token
    
        }
    

    }

   
    
    return {tokenjoin}


})