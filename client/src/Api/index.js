import axios from 'axios'
import {URL} from '../config'
// Set config defaults when creating the instance
let Axios = axios.create({
    baseURL: URL,
    headers:{
        "Authorization": "Bearer "+ localStorage.getItem("token")
    }
});
//
// // Alter defaults after instance has been created
// Axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
// Axios.defaults.headers.post['Content-Type'] = 'application/json';
//
// let Axios = () => {
//     let Axios = axios.create({
//         baseURL: URL
//     })
//     Axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
//     Axios.defaults.headers.post['Content-Type'] = 'application/json';
//     return Axios
// }
export default Axios