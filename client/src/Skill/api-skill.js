import Axios from "../Api";

export function getSkills(pageNo, pageSize){
    return Axios.get("skill/me", {
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
export function getSkill(e){
    return Axios.get("skill"+ e)
}

export function addSkill(e){
    return Axios.post("skill", e)
}

export function editSkill(id,e){
    return Axios.put("skill/"+id, e)
}

export function deleteSkill(e){
    return Axios.delete("/skill/"+e)
}
