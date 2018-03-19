import React, { Component } from 'react';
// require('inputmask/dist/inputmask/inputmask.phone.extensions');
// require('inputmask/dist/inputmask/phone-codes/phone-ru');

export default C => class MaskProvider extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
  	const input = this.input.querySelector('input');
  	if (this.props.mask) {
  	  new Inputmask(this.props.mask).mask(input);
    }
  }

  render() {
    return (
      <div ref={node => this.input = node}>
        <C {...this.props} />
      </div>
    )
  }
}
