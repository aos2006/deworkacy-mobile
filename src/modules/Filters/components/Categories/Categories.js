
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Treebeard} from 'react-treebeard';
import theme from './theme';
import cx from 'classnames';
import s from './Categories.css';

const data = {
  name: 'Canvas Basket',
  toggled: false,
  children: [
    {
      name: 'Canvas Basket',
      children: [
        {name: 'Canvas Basket'},
        {name: 'Canvas Basket'}
      ]
    },
    {
      name: 'Canvas Basket',
      children: [
        {
          name: 'Canvas Basket',
          children: [
            {name: 'Canvas Basket'},
            {name: 'Canvas Basket'}
          ]
        }
      ]
    }
  ]
};



class Categories extends React.Component {

  state = {}

  onToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  render() {
    const decorators = {
      Loading: (props) => {
        return (
          <div style={props.style}>
            loading...
          </div>
        );
      },
      Toggle: (props) => {
        return (
          <div style={props.style}>
            <svg height={props.height} width={props.width}>
              // Vector Toggle Here
            </svg>
          </div>
        );
      },
      Header: (props) => {
        return (
          <div style={props.style}>
            {props.node.name}
          </div>
        );
      },
      Container: (props) => {
        return (
          <div onClick={props.onClick} className={s.link}>
            + {props.node.name}
          </div>
        );
      }
    };
    return (
      <div className={s.root}>
       <div className={s.category}>
         <Treebeard
           style={theme}
           data={data}
           onToggle={this.onToggle}
           decorators={decorators}
         />
       </div>
      </div>

    );
  }
}

export default withStyles(s)(Categories);
