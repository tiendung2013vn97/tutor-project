import Axios from "./index";

export function getSkillTagById(id) {
    return Axios.get("skill-tag/by-id/"+id).catch(err=>{
        if(err && err.response)
            return err.response
    })
}