import Axios from "../Api";

export function getSkills(username){
    return Axios.get("skill/by-teacher/"+username)
        .catch(e=>{
            if(e && e.response){
                return e.response;
            }
        })
}