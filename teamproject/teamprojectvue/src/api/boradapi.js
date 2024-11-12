import axios from 'axios';

import { GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;

export const getAnnounceview = async(idx) => {

    try{
        const token = localStorage.getItem('token')

        const res = await axios.get(`${url}/announce/view/${idx}`,{

            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        return res
        
    }catch(e){
        console.log(e)
    }
}