const fs = require('fs');
var mkdirp = require('mkdirp');
const moduleName = process.argv[2];
const jsTemplate = `
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './${moduleName}.css';
const ${moduleName} = props => ();

export default withStyles(s)(${moduleName})`;

const packageTemplate = `
{
  "name": "${moduleName}",
  "version": "0.0.0",
  "private": true,
  "main": "./${moduleName}.js"
}`;


mkdirp(`./src/components/${moduleName}`, function (err) {
  fs.writeFile(`./src/components/${moduleName}/${moduleName}.js`, jsTemplate, function (err) {
    if (err) return console.log(err);
    console.log('Wrote Hello World in file helloworld.txt, just check it');
  });
  fs.writeFile(`./src/components/${moduleName}/${moduleName}.css`, '', function (err) {
    if (err) return console.log(err);
    console.log('Wrote Hello World in file helloworld.txt, just check it');
  });

  fs.writeFile(`./src/components/${moduleName}/package.json`, packageTemplate, function (err) {
    if (err) return console.log(err);
    console.log('Wrote Hello World in file helloworld.txt, just check it');
  });
});
