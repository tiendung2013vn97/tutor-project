import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Notify from './Notify/container-notify'
import 'antd/dist/antd.css';
import Home from './Home/container-home'
import Header from './Commons/Header';
import Footer from './Commons/Footer';
import Admin from './Admin/Admin';
import UserInfo from './Commons/UserInfo/UserInfoContainer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>

            <Route path="/manage">
              <Admin />
            </Route>

            <Route path="/info">
              <UserInfo />
            </Route>

            <Route path="/">
              <div className="App">
                <Notify />
                <Home />
              </div>
            </Route>

          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
