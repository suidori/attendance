import axios from "axios";
import { GLOBAL_URL } from "./utils";

const url = `${GLOBAL_URL}`

export const loginannounceapi = async() => {

    // const token = localStorage.getItem('token')
try{
    const res = await axios.get(`${url}/announce/searchforall`)
 
    return res

}catch(e){
    console.log(e)
}
    
}