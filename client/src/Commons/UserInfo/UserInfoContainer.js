import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import UserInfo from './UserInfo'
// import { getUserProfile, updateUserProfile, updateUserAccount } from '../actions/UserAction'
class UserInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: "",
            previewVisible: false,
            username: null,
            email: null
        };
    }
    // componentWillMount() {
    //     if (localStorage.getItem('username') === null) {
    //         this.props.history.push("/login")
    //     }
    //     else
    //         this.props.getUserProfile();
    // }
    // componentWillReceiveProps(nextProps) {
    //     const { profile } = nextProps
    //     if (profile) {
    //         this.setState({
    //             username: profile.username,
    //             email: profile.email
    //         })
    //     }
    // }
    // handleBack = () => {
    //     this.props.history.push('/')
    // }
    // showModalPreview() {
    //     this.setState({ previewVisible: true });
    // }
    // handleHideModal() {
    //     this.setState({ previewVisible: false });
    // }
    // handleUpdateProfile = () => {
    //     this.props.updateUserProfile({
    //         username: this.state.username,
    //         email: this.state.email
    //     }, this.props)
    // }
    // handleUsernameChange = e => {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }
    // handleEmailChange = e => {
    //     this.setState({
    //         email: e.target.value
    //     })
    // }
    // changePassword = e => {
    //     this.props.updateUserAccount(e)
    // }
    render() {
        if (this.props.isLoadingGetProfile && !this.props.profile) {
            return <Spin size="large" style={{ display: 'flex', justifyContent: 'center' }} />
        }
        return (
            <UserInfo
                changePassword={(e) => this.changePassword(e)}
                handleUsernameChange={(e) => this.handleUsernameChange(e)}
                handleEmailChange={(e) => this.handleEmailChange(e)}
                handleUpdateProfile={(e) => this.handleUpdateProfile(e)}
                showModalPreview={() => this.showModalPreview()}
                handleBack={() => this.handleBack()}
                handleHideModal={() => this.handleHideModal()}
                {...this.props}
                {...this.state}
            />
        )
    }
}


const mapStatetoProps = state => {
    return {
        ...state.UserReducers
    }
}

const mapDispatchToProps = dispatch => ({
    // getUserProfile: () => dispatch(getUserProfile()),
    // updateUserProfile: (e, props) => dispatch(updateUserProfile(e, props)),
    // updateUserAccount: (e) => dispatch(updateUserAccount(e))
})
export default connect(mapStatetoProps, mapDispatchToProps)(UserInfoContainer) 
