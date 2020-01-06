import React from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import UserInfo from './UserInfo'
import axios from "axios";
import {URL} from "../../config";

// import { getUserProfile, updateUserProfile, updateUserAccount } from '../actions/UserAction'
class UserInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: "",
            previewVisible: false,
            username: null,
            email: null,
            userDetail: null
        };
    }

    componentDidMount() {
        const {username} = this.props.match.params;
        this.getUserByUsername(username)
    }

    getUserByUsername(username) {
        if (!username)
            return null;
        const api = axios.create({baseURL: URL});
        return api.get("public-user/user/" + username, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({
                userDetail: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

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
        if (this.state.userDetail) {
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
        return <Spin size="large" style={{display: 'flex', justifyContent: 'center'}}/>

    }
}


const mapStatetoProps = state => {
    return {
        locationState: state.location.location
    }
}

const mapDispatchToProps = dispatch => ({
    // getUserProfile: () => dispatch(getUserProfile()),
    // updateUserProfile: (e, props) => dispatch(updateUserProfile(e, props)),
    // updateUserAccount: (e) => dispatch(updateUserAccount(e))
})
export default connect(mapStatetoProps, mapDispatchToProps)(UserInfoContainer) 
