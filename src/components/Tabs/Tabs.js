import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from 'classnames';
import s from './Tabs.css';

const T = ({ tabs, panels, classes, defaultIndex }) => (
  <div className={cx([s.root, classes.root])}>
    <Tabs defaultIndex={defaultIndex || 0}>
      <TabList className={cx([s.list, classes.header])}>
        {tabs.map(item => <Tab selectedClassName={s.selected} className={s.tab}>{item.txt}</Tab>)}
      </TabList>
      {panels.map(item => (
        <TabPanel className={s.panel} selectedClassName={s.panelActive}>
          {item.render()}
        </TabPanel>
      ))}
    </Tabs>
  </div>
);

T.defaultProps = {
  defaultIndex: 0,
  classes: {
    root: '',
    header: '',
  },
  tabs: [
    { txt: 'New' },
    { txt: 'Arrivals' },
    { txt: 'Accessories' },
    { txt: 'Essentials' },
    { txt: 'Outdoor' },
    { txt: 'Kitchen' },
    { txt: 'Lighting' },
    ],
  panels: [
    { render: () => <span>panel1</span> },
    { render: () => <span>panel2</span> },
    { render: () => <span>panel3</span> },
  ],
};

export default withStyles(s)(T);
