import React, { Component } from "react";
import "./Loading.css";
import { Spin } from 'antd';

class Loading extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    return (
      <div
        className="loading-screen"
        style={{ display: this.props.loading ? "block" : "none" }}
      >
        <div className='spin'>
        <div className='spin-title'>Waiting ...</div>
        <Spin  size="large"/>
        </div>
      </div>
    );
  }
}

export default Loading;
