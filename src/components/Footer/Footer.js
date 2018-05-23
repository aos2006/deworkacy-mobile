

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Container from 'components/Container';
import Logo from 'components/Logo';
import SocialList from 'components/SocialList';
import Contacts from 'components/Contacts';
import s from './Footer.scss';
import Apple from './icons/apple.svg';
import Google from './icons/google.svg';
import Moscow from './icons/moscow.svg';

class Footer extends React.Component {
  render() {
    return (
      <div className={cx([
        s.root,
      ])}>
        <Container>
          <div className={s.row}>
            <Logo
              className={s.logo}
            />
            <Contacts
              className={s.contacts}
            />
            <SocialList
              className={s.socials}
            />
            <div className={s.sponcered}>
              <span className={s.label}>
                При поддержке
              </span>
              <Moscow />
            </div>
            <div className={s.apps}>
              <a href="" className={s.appLink}>
                <Apple />
              </a>
              <a href="" className={s.appLink}>
                <Google />
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
