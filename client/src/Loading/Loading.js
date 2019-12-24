import React, { Component } from "react";
import "./Loading.css";

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
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loading;
