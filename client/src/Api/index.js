import axios from 'axios'
import {URL} from '../config'
// Set config defaults when creating the instance
const Axios = axios.create({
    baseURL: URL
});

// Alter defaults after instance has been created
Axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios