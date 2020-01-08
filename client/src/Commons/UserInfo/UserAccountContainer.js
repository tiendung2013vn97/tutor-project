import React from 'react'
import {connect} from 'react-redux'
import {updateAccountInfo} from "../../Account/action-account";
import {getUserByUsername} from "../../Api/UserApi";
import UserProfile from "./UserProfile";
import UserAccount from "./UserAccount";

class UserAccountContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <UserAccount/>
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    updateAccount: (e) => dispatch(updateAccountInfo(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountContainer)