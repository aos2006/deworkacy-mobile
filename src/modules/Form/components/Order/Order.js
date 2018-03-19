import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Simple from '../Simple/Simple';
import Express from '../Express/Express';
import { Tabs, TabPanel } from 'components/Tabs';

class Order extends Component {
  state = {
    index: 0,
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.defaultIndex !== this.state.index) {
  	  this.setState({
        index: nextProps.defaultIndex,
      });
    }
  }

  render() {
    return (
      <div>
        <Tabs
          onSelect={i => this.setState({
            index: i,
          })}
          selectedIndex={this.state.index}
          type="modern"
          fullWidth
          tabs={[
            {
              txt: 'Экспресс-заявка',
            },
            {
              txt: 'Заявка',
            },
        ]}>
          <TabPanel>
            <Express onSuccess={this.props.onSuccess} />
          </TabPanel>
          <TabPanel>
            <Simple onSuccess={this.props.onSuccess} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
Order.defaultProps = {
  defaultIndex: 0,
}

Order.propTypes = {
  defaultIndex: PropTypes.number,
}
export default Order;
