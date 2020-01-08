import Axios from "../Api";

export function getSkillTags(pageNo, pageSize){
    return Axios.get("skill-tag", {
        params:{
            offset: (pageNo-1)*pageSize,
            limit: pageSize
        }
    })
        .catch(e=>{
            if(e && e.response){
                return e.response;
            }
        })
}

export function getSkillTagById(id) {
    return Axios.get("skill-tag/by-id/"+id).catch(err=>{
        if(err && err.response)
            return err.response
    })
}