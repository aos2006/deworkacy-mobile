/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import * as base from 'modules/constants';

async function action({ fetch }) {
  const resp = await fetch(`${base.BASE_API}/mainpage/info`);
  const data = await resp.json();

  return {
    title: 'Home Page',
    component: (
      <Layout>
        <Home
          banner={data.banner}
          locations={data.locations}
          services={data.services}
          partners={data.trusted}
          reviews={data.reviewBlock}
        />
      </Layout>
    ),
  };
}

export default action;
