import axios from 'axios';
const BASE_URL = 'https://hr-backend-5kyq.onrender.com/' ; 
// Replace with your API base URL
export default axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json',
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    },
    withCredentials:true

})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})