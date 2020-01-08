import React from 'react'
import {connect} from 'react-redux'
import {updateAccountInfo} from "../../Account/action-account";
import {getUserByUsername} from "../../Api/UserApi";
import UserProfile from "./UserProfile";

class UserProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
        const username = this.props.match.params.username;
        if (username)
            this.getUserProfile(username)
    }

    getUserProfile(username) {
        return getUserByUsername(username)
            .then(res => {
                console.log(res)
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