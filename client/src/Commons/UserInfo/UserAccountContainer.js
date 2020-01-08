import React from 'react'
import {connect} from 'react-redux'
import {logout, updateAccountInfo} from "../../Account/action-account";
import {getUserByUsername} from "../../Account/api-account";
import UserProfile from "./UserProfile";
import UserAccount from "./UserAccount";

class UserAccountContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <UserAccount {...this.props}/>
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    updateAccount: (e) => dispatch(updateAccountInfo(e)),
    logout: (e) =>{
        e.push("/")
        return dispatch(logout())}
})
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountContainer)