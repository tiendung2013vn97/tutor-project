import Axios from "../Api";

export function getUserByUsername(username) {
    return Axios.get("public-user/user/" + username).catch(err => {
        if (err && err.response)
            return err.response
    })
}

export function getUserInfo() {
    return Axios.get("login-user/info").catch(err => {
        if (err && err.response)
            return err.response
    })
}

export function editUserInfo() {
    return Axios.put("login-user")
}

export function editUserAccount(e) {
    return Axios.put("login-user/password", {
        password: e
    })
}
