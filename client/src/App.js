import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Notify from "./Notify/container-notify";
import "antd/dist/antd.css";
import Home from "./Home/container-home";
import Header from "./Commons/Header";
import Footer from "./Commons/Footer";
import Admin from "./Admin/Admin";
import UserInfo from "./Commons/UserInfo/UserInfoContainer";
import MainMenu from "./Menu/container-menu";
import LoadingScreen from './Loading/container-loading'
import BackgroundProcess from './BackgroundProcess'
import AdminCreateUser from './Account/CreateAdminAccount/container-register'
import './App.css'
import UsersManagement from "./Admin/UsersManagement";
import SkillsManagement from "./Admin/SkillsManagement";
import ContractManagement from "./Admin/ContractManagement";
import StudentReport from "./Admin/StudentReport";
import {Col} from "antd";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <BackgroundProcess/>
                    <Header/>
                    {/*<MainMenu/>*/}
                    <Switch>
                        <Route path="/manage" component={() => {
                            return (
                                <Admin>
                                    <Switch>
                                        <Route path="/manage/users/:username" component={UserInfo}/>
                                        <Route path="/manage/users" component={UsersManagement}/>
                                        <Route path="/manage/skill-tags" component={SkillsManagement}/>
                                        <Route path="/manage/contracts" component={ContractManagement}/>
                                        <Route path="/manage/student-report" component={StudentReport}/>
                                        <Route path="/manage/create-user" component={AdminCreateUser}/>
                                    </Switch>
                                </Admin>
                            )
                        }}
                        />

                        <Route path="/user/:username" component={UserInfo}/>

                        <Route path="/">
                            <div className="App">
                                <Notify/>
                                <LoadingScreen/>
                                <Home/>
                            </div>
                        </Route>
                    </Switch>

                    {/*<Footer/>*/}
                </div>
            </BrowserRouter>
        )
            ;
    }
}

export default App;
