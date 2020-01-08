import React from 'react'
import {connect} from 'react-redux'
import {updateAccountInfo} from "../../Account/action-account";
import {getUserInfo} from "../../Api/UserApi";
import UserProfile from "./UserProfile";

class UserProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUserProfile()
    }

    getUserProfile() {
        return getUserInfo()
            .then(res => {
                if (res && res.status === 200) {
                    this.props.updateAccount(res.data)
                }
            })
    }

    render() {
        if (this.props.account.username)
            return <UserProfile userDetail={this.props.account}/>
        return null
    }
}

const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = dispatch => ({
    updateAccount: (e) => dispatch(updateAccountInfo(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)