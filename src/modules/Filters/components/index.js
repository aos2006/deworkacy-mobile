import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Range from './Range';
import Tags from './Tags';
import Colors from './Colors';
import Header from './Header';
import Categories from './Categories';
import s from './Filters.css';

class Filters extends PureComponent {

  render() {
    return (
      <div className={s.root}>
        <div className={s.categories}>
          <Header title="Filter Categories" />
          <Categories />
          <Categories />
          <Categories />
        </div>
        <div className={s.range}>
          <Header title="Filter by Price" />
          <Range />
        </div>
        <div className={s.colors}>
          <Header title="Filter Colors"/>
          <Colors/>
        </div>
        <div className={s.tags}>
          <Header title="Product Tags" />
          <Tags />
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Filters);
