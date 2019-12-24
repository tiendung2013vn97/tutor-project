import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import { changeStatus } from "./action-loading";

class LoadingContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    return <Loading loading={this.props.loading} />;
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    loading: state.loading.status
  };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);
