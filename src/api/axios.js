import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/' ; 
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