import axios from "axios";
import {URL} from "../config";
import {updateLocation} from "./action-location";

export function getLocations() {
    const api = axios.create({baseURL: URL});
    return api.get("location", {
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        if(err.response)
            return err.response;
        return err;
    })
}