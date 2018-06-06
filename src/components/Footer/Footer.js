

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Container from 'components/Container';
import Logo from 'components/Logo';
import SocialList from 'components/SocialList';
import Contacts from 'components/Contacts';
import s from './Footer.scss';
// import Apple from './icons/apple.svg';
// import Google from './icons/google.svg';
import Link from 'components/Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={cx([
        s.root,
      ])}>
        <Container>
          <div className={s.row}>
            <Link to="/">
              <Logo
                className={s.logo}
              />
            </Link>
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
              <img src="moscow.svg" alt="" />
            </div>
            <div className={s.apps}>
              <a href='https://itunes.apple.com/ru/app/deworkacy/id1261089175?mt=8' className={s.appLink} target="_blank">
                <img src="apple-store.svg" className={s.appleImg} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=ru.mobsolutions.deworkacy" className={s.appLink} target="_blank">
                <img src="google-store.svg" alt="" className={s.googleImg} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
