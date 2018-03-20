
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Select.css';
import Select from 'react-select';
import selectS from 'react-select/dist/react-select.css';

class S extends React.PureComponent {
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const {selectedOption} = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div className={s.root}>
        <Select
          className={s.select}
          clearable={false}
          menuStyle={{
            backgroundColor: 'white',
            padding: '20px 0 17px 0',
          }}
          optionClassName={s.option}
          value={value}
          onChange={this.handleChange}
          options={[
            {value: 'Sort By Popularity', label: 'Sort By Popularity'},
            {value: 'Sort by Average Rating', label: 'Sort by Average Rating'},
            {value: 'Sort by Newness', label: 'Sort by Newness'},
            {value: 'Sort by Price: Low to High', label: 'Sort by Price: Low to High'},
            {value: 'Sort by Price: High to Low', label: 'Sort by Price: High to Low'},
          ]}
        />

      </div>
    );
  }
}

export default withStyles(s, selectS)(S);
