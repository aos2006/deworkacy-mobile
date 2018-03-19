import React, { PureComponent } from 'react';
import { Programm, WorkSpace, Order, Review, Subscribe } from 'modules/Form/components';
import Modal from 'components/Modal/Modal';

export default Component => class withForms extends PureComponent {
  state = {
    showModal: false,
    showSuccessDialog: false,
    activeForm: 'order',
    defaultIndex: 0,
  }

  onSuccess = () => this.setState({
    showModal: false,
    showSuccessDialog: true,
  })

  getForm(name) {
    switch (name) {
      case 'order':
        return <Order onSuccess={this.onSuccess} defaultIndex={this.state.defaultIndex}  />;
      case 'workSpace':
        return <WorkSpace {...this.props} onSuccess={this.onSuccess} />;
      case 'programm':
        return <Programm onSuccess={this.onSuccess} {...this.props} />;
      case 'review':
        return <Review onSuccess={this.onSuccess} />;
      case 'subscribe':
        return <Subscribe {...this.props} onSuccess={this.onSuccess} />;
    }
  }


  handleShowModal = ({ activeForm, defaultIndex }) => this.setState({
    activeForm,
    defaultIndex,
    showModal: !this.state.showModal,
  });

  handleVisibleChange = () => this.setState({
    showModal: !this.state.showModal,
  });


  render() {
    return (
      <div>
        <Modal visible={this.state.showModal} handleVisibleChange={this.handleVisibleChange}>
          {this.getForm(this.state.activeForm)}
        </Modal>
        <Modal
          type="success"
          visible={this.state.showSuccessDialog}
          hideTimeout={3000}
          onHide={() => this.setState({ showSuccessDialog: false })}/>
        <Component
          {...this.props}
          getForm={this.getForm}
          onSuccess={this.onSuccess}
          showModal={this.handleShowModal}
        />
      </div>
    );
  }
};
