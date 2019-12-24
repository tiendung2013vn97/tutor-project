import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showAlertNotify, showSuccessNotify, closeNotify } from '../Notify/action-notify'

class NotifyContainer extends Component {

  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    return (
     <div></div>
    );
  }

}

//map state to props
function mapStateToProps(state) {
  return {
    
  };

}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {

    //show alert notify with message: msg
    showAlertNotify: (msg) => {
      return dispatch(showAlertNotify(msg));
    },

    //show successful notify with message: msg
    showSuccessNotify: (msg) => {
      return dispatch(showSuccessNotify(msg));
    },

    //close current notify
    closeNotify: () => {
      return dispatch(closeNotify());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NotifyContainer)