import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Notify from './Notify/container-notify'
import 'antd/dist/antd.css';
import Home from './Home/container-home'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Notify/>
          <Home/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
