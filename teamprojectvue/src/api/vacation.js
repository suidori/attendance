// import axios from "axios";


// // const url = `http://192.168.0.103:8080`


// export const unCheckedapi = async(pageNum) => {

//     try {
//     const response = await axios.get`http://192.168.0.103:8080/vacation/managerunchecked?pageNum=${pageNum - 1}`;

//     console.log(response)

//     return response

//     }catch(e){
//         console.log(e)
//         alert(e)
//     }
// }


// // export const nameSearchapi = async(pageNum, username) => {

// //     try {

// //     const response = await axios.get(`http://192.168.0.103:8080/vacation/managersearch?pageNum=${pageNum -1}&size=10&name=${username}`);
// //     console.log(response.data.list)
// // return response

// // }catch(e){
// //     console.log(e)
// //     alert(e)
// // }
// // }



// export const fetchVacationsapi = async (pageNum) => {

//     try{

//     const response = await axios.get(`http://192.168.0.103:8080/vacation/manager?pageNum=${pageNum - 1}`);

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
//         await axios.post(`http://192.168.0.103:8080/vacation/accept/${idx}`);

//     }catch(e){
//     console.log(e)
//     alert(e)
// }

// }

// export const handleDenyapi = async(idx) => {

//     try{

//     await axios.post(`http://192.168.0.103:8080/vacation/deny/${idx}`);


// }catch(e){
//     console.log(e)
//     alert(e)
// }
// }