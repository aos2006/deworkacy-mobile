import React, { Component as ReactComponent } from 'react';

export default Component => class onSuccess extends ReactComponent {

  onSuccess = () => {
    this.props.onSuccess();
    this.props.onFormReset();
  }

  render() {
    if (this.props.isCompleted) this.onSuccess();
    return (
      <Component
        {...this.props}
      />
    );
  }
};
