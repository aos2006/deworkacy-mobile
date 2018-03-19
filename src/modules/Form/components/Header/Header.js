import React from 'react';
import cx from 'classnames';
import s from './Header.css';
import Title from 'components/Title/Title';
import Devider from 'components/Devider/Devider';
import Descr from 'components/Descr/Descr';

const Header = ({
  title,
  descr,
                }) => (
  <div className={cx([
    s.root,
  ])}>
    <Title type="h2" center>
      {title}
    </Title>
    <Devider blue style={{ marginTop: 27, marginBottom: 32 }} />
    <div className={s.descr}>
      <Descr medium center>
        {descr}
      </Descr>
    </div>
  </div>
);

export default Header;
