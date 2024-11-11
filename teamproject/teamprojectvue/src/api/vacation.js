import axios from "axios";
import { GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;


export const unCheckedapi = async(pageNum) => {

    try {
    const response = await axios.get`${url}/vacation/managerunchecked?pageNum=${pageNum - 1}`;

    console.log(response)

    return response.data

    }catch(e){
        console.log(e)
        alert(e)
    }
}


// // export const nameSearchapi = async(pageNum, username) => {

// //     try {

// //     const response = await axios.get(`${url}/vacation/managersearch?pageNum=${pageNum -1}&size=10&name=${username}`);
// //     console.log(response.data.list)
// // return response

// // }catch(e){
// //     console.log(e)
// //     alert(e)
// // }
// // }



// export const fetchVacationsapi = async (pageNum) => {

//     try{

//     const response = await axios.get(`${url}/vacation/manager?pageNum=${pageNum - 1}`);

//     console.log(response)
//     return response

//     }
// catch(e){
//     console.log(e)
//     alert(e)
// }

// }


// export const handleApproveapi = async(idx) => {

//     try{
//         await axios.post(`${url}/vacation/accept/${idx}`);

//     }catch(e){
//     console.log(e)
//     alert(e)
// }

// }

// export const handleDenyapi = async(idx) => {

//     try{

//     await axios.post(`${url}/vacation/deny/${idx}`);


// }catch(e){
//     console.log(e)
//     alert(e)
// }
// }