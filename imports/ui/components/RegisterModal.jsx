import React, {Component} from 'react';
import NewUserForm from './NewUserForm';
import ModalWrapper from './ModalWrapper';
import {connect} from 'react-redux';
import {summonModalById, dismissModal} from '../actions/UIActions';

const mapDispatchToProps = dispatch => {
  return {
    summonModalById: (id) => dispatch(summonModalById(id)),
    dismissModal: () => dispatch(dismissModal())
  }
}

class ConnectableRegisterModal extends Component {


  render() {
    return (
      <ModalWrapper name="Register">
        <NewUserForm toggle={this.toggleToLogin} dismiss={this.props.dismissModal}/>
      </ModalWrapper>
    )
  }

  toggleToLogin = () => {
    this.props.summonModalById("LOGIN");
  }


}

const LoginModal = connect(null, mapDispatchToProps)(ConnectableRegisterModal)
export default LoginModal;
