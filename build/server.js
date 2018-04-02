require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		7: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"0":"products","1":"register","2":"privacy","3":"about","4":"not-found","5":"lk","6":"contact"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(45);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(46);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Container_css__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Container_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Container_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }






var Container = function Container(props) {
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Container_css___default.a.root, props.className])
  }, void 0, props.children);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Container_css___default.a)(Container));

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTER", function() { return REGISTER; });
var NAME = 'user';
var REGISTER = "".concat(NAME, "_register");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_START", function() { return REQUEST_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_SUCCESS", function() { return REQUEST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_FAIL", function() { return REQUEST_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIDE_REPORTER", function() { return HIDE_REPORTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_REPORTER", function() { return SHOW_REPORTER; });
var NAME = 'api';
var REQUEST_START = 'REQUEST_START';
var REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAIL = 'REQUEST_FAIL';
var HIDE_REPORTER = "".concat(NAME, "_HIDE_REPORTER");
var SHOW_REPORTER = "".concat(NAME, "_SHOW_REPORTER");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Button_css__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Button_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Button_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }








var _ref3 = _jsx(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
  pulse: true,
  name: "spinner"
});

var Button = function Button(_ref) {
  var classes = _ref.classes,
      onClick = _ref.onClick,
      children = _ref.children,
      theme = _ref.theme,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      rest = _objectWithoutProperties(_ref, ["classes", "onClick", "children", "theme", "fullWidth", "isLoading"]);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button", _extends({
    onClick: onClick,
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a.root, [__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a[theme]], _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__Button_css___default.a.fullWidth, fullWidth), classes.root])
  }, rest), isLoading ? _ref3 : children);
};

Button.defaultProps = {
  classes: {
    root: ''
  },
  theme: '',
  fullWidth: false,
  isLoading: false
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Button_css___default.a)(Button));

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sagas__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducer__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__(133);





/* harmony default export */ __webpack_exports__["a"] = ({
  api: __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* default */],
  types: __WEBPACK_IMPORTED_MODULE_1__constants__,
  saga: __WEBPACK_IMPORTED_MODULE_2__sagas__["a" /* default */],
  reducer: __WEBPACK_IMPORTED_MODULE_3__reducer__["a" /* default */],
  selectors: __WEBPACK_IMPORTED_MODULE_4__selectors__["a" /* default */]
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Register__ = __webpack_require__(114);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Register__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sagas__ = __webpack_require__(139);




/* harmony default export */ __webpack_exports__["b"] = ({
  reducer: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* default */],
  types: __WEBPACK_IMPORTED_MODULE_2__actionTypes__,
  saga: __WEBPACK_IMPORTED_MODULE_3__sagas__["a" /* default */]
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
if (false) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || "http://localhost:".concat(process.env.PORT || 3000)
  },
  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X

  },
  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit'
    },
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(44);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ErrorPage.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons_stock_svg__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons_stock_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__icons_stock_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CardLabel_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__CardLabel_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var CardLabel = function CardLabel(_ref) {
  var type = _ref.type,
      txt = _ref.txt,
      children = _ref.children;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a[type], true)])
  }, void 0, children);
};

CardLabel.defaultProps = {
  txt: 'sale',
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['tape', 'circle'])
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__CardLabel_css___default.a)(CardLabel));

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/assign");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logo_css__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Logo_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Logo = function Logo(_ref) {
  var classes = _ref.classes,
      theme = _ref.theme;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a.root, __WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a[theme], classes.root])
  }, void 0, "Shippon");
};

Logo.defaultProps = {
  theme: '',
  classes: {
    root: ''
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Logo_css___default.a)(Logo));

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Navigation_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(28);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






var Navigation =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Navigation, _React$PureComponent);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          classes = _props.classes;
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.root, __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a[theme], classes.root]),
        role: "navigation"
      }, void 0, this.props.list.map(function (item) {
        return _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
          className: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.link,
          to: item.to,
          activeClassName: __WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a.activeLink
        }, void 0, item.txt);
      }));
    }
  }]);

  return Navigation;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

Navigation.defaultProps = {
  theme: '',
  classes: {
    root: ''
  },
  list: [{
    txt: 'Home',
    to: '/'
  }, {
    txt: 'Shop',
    to: '/shop'
  }, {
    txt: 'About',
    to: '/about'
  }, {
    txt: 'Blog',
    to: '/blog'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Navigation_css___default.a)(Navigation));

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
 // Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history

/* harmony default export */ __webpack_exports__["a"] = (false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()());

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SocialsList_css__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var SocialsList = function SocialsList(_ref) {
  var list = _ref.list,
      classes = _ref.classes,
      center = _ref.center,
      type = _ref.type;
  return _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.center, center), classes.root)
  }, void 0, list.map(function (item) {
    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.item, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a[type], true)])
    }, void 0, _jsx("a", {
      href: item.href,
      target: "_blank"
    }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
      name: item.icon,
      className: __WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a.icon
    })));
  }));
};

SocialsList.defaultProps = {
  center: false,
  type: '',
  classes: {
    root: ''
  },
  list: [{
    icon: 'facebook-f'
  }, {
    icon: 'twitter'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__SocialsList_css___default.a)(SocialsList));

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hideReporter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(9);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var handling = function handling(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  var error = new Error();
  error.resp = resp;
  throw error;
};

var parse = function parse(json) {
  return json.json();
};

var api = function api(_ref) {
  var url = _ref.url,
      params = _ref.params;
  return fetch(url, _extends({}, params, {
    body: JSON.stringify(params.body) || null,
    headers: _extends({
      // 'Access-Control-Allow-Headers': 'X-Requested-With',
      'Content-Type': 'application/json'
    }, params.headers)
  })).then(handling).then(parse);
};

var parametred = function parametred(method) {
  return function (_ref2) {
    var url = _ref2.url,
        params = _ref2.params;
    return api({
      url: url,
      params: _extends({}, params, {
        method: method
      })
    });
  };
};

var hideReporter = function hideReporter() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["HIDE_REPORTER"],
    payload: {}
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  get: parametred('GET'),
  post: parametred('POST'),
  put: parametred('PUT'),
  delete: parametred('DELETE')
});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("seamless-immutable");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Footer__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Layout_css__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Layout_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Header__ = __webpack_require__(108);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



 // external-global styles must be imported in your JS.





var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_6__Header__["a" /* default */], {});

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_3_components_Footer__["a" /* default */], {});

var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      return _jsx("div", {}, void 0, _ref, this.props.children, _ref2);
    }
  }]);

  return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_5__Layout_css___default.a)(Layout));

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }

        if (event.defaultPrevented === true) {
          return;
        }

        event.preventDefault();
        __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */].push(_this.props.to);
      }
    }), _temp));
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          to = _props.to,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["to", "children"]);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", _extends({
        href: to
      }, props, {
        onClick: this.handleClick,
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([props.className, {// [props.activeClassName]: to === this.context.pathname || to === history.location.pathname,
        }])
      }), children);
    }
  }]);

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Link, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    onClick: null
  }
});
Link.defaultProps = {
  activeClassName: ''
};
Link.contextTypes = {
  pathname: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CardGrid_css__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__CardGrid_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Card__ = __webpack_require__(73);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var CardGrid = function CardGrid(_ref) {
  var list = _ref.list,
      gridCount = _ref.gridCount;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a[gridCount], true)])
  }, void 0, list.map(function (item) {
    return _jsx("div", {
      className: __WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a.item
    }, void 0, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Card__["a" /* default */], item));
  }));
};

CardGrid.defaultProps = {};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__CardGrid_css___default.a)(CardGrid));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
module.exports = __webpack_require__(32);


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom_server__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pretty_error__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_App__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Html__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__createFetch__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__router__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__assets_json__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__store_configureStore__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_seamless_immutable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_seamless_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_seamless_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_modules_User__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__config__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */














 // eslint-disable-line import/no-unresolved





process.on('unhandledRejection', function (reason, p) {
  console.error('Unhandled Rejection at:', p, 'reason:', reason); // send entire app down. Process manager will restart it

  process.exit(1);
}); //
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
var app = __WEBPACK_IMPORTED_MODULE_1_express___default()(); //
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------

app.set('trust proxy', __WEBPACK_IMPORTED_MODULE_18__config___default.a.trustProxy); //
// Register Node.js middleware
// -----------------------------------------------------------------------------

app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({
  extended: true
}));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
app.get('*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var css, insertCss, initialState, store, context, route, data, _data$scripts, html;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            css = new Set(); // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader

            insertCss = function insertCss() {
              for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
                styles[_key] = arguments[_key];
              }

              // eslint-disable-next-line no-underscore-dangle
              styles.forEach(function (style) {
                return css.add(style._getCss());
              });
            }; // Universal HTTP client


            initialState = _defineProperty({
              currency: {
                symbol: '$',
                type: 'usd'
              }
            }, __WEBPACK_IMPORTED_MODULE_17_modules_User__["b" /* default */].types.NAME, __WEBPACK_IMPORTED_MODULE_16_seamless_immutable___default()(__WEBPACK_IMPORTED_MODULE_17_modules_User__["b" /* default */].reducer.defaultState));
            store = Object(__WEBPACK_IMPORTED_MODULE_15__store_configureStore__["a" /* default */])(initialState, {}); // Global (context) variables that can be easily accessed from any React component
            // https://facebook.github.io/react/docs/context.html

            context = {
              insertCss: insertCss,
              // The twins below are wild, be careful!
              pathname: req.path,
              query: req.query,
              // You can access redux through react-redux connect
              store: store,
              storeSubscription: null
            };
            _context.next = 8;
            return __WEBPACK_IMPORTED_MODULE_13__router__["a" /* default */].resolve(context);

          case 8:
            route = _context.sent;

            if (!route.redirect) {
              _context.next = 12;
              break;
            }

            res.redirect(route.status || 302, route.redirect);
            return _context.abrupt("return");

          case 12:
            data = _extends({}, route);
            data.children = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToString(_jsx(__WEBPACK_IMPORTED_MODULE_8__components_App__["a" /* default */], {
              context: context
            }, void 0, route.component));
            data.styles = [{
              id: 'css',
              cssText: _toConsumableArray(css).join('')
            }];
            data.scripts = [__WEBPACK_IMPORTED_MODULE_14__assets_json___default.a.vendor.js];

            if (route.chunks) {
              (_data$scripts = data.scripts).push.apply(_data$scripts, _toConsumableArray(route.chunks.map(function (chunk) {
                return __WEBPACK_IMPORTED_MODULE_14__assets_json___default.a[chunk].js;
              })));
            }

            data.scripts.push(__WEBPACK_IMPORTED_MODULE_14__assets_json___default.a.client.js);
            data.app = {
              apiUrl: __WEBPACK_IMPORTED_MODULE_18__config___default.a.api.clientUrl,
              state: context.store.getState()
            };
            html = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Html__["a" /* default */], data));
            res.status(route.status || 200);
            res.send("<!doctype html>".concat(html));
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 24]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //
// Error handling
// -----------------------------------------------------------------------------

var pe = new __WEBPACK_IMPORTED_MODULE_7_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express'); // eslint-disable-next-line no-unused-vars

app.use(function (err, req, res, next) {
  console.error(pe.render(err));
  var html = __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToStaticMarkup(_jsx(__WEBPACK_IMPORTED_MODULE_9__components_Html__["a" /* default */], {
    title: "Internal Server Error",
    description: err.message,
    styles: [{
      id: 'css',
      cssText: __WEBPACK_IMPORTED_MODULE_11__routes_error_ErrorPage_css___default.a._getCss()
    }] // eslint-disable-line no-underscore-dangle

  }, void 0, __WEBPACK_IMPORTED_MODULE_6_react_dom_server___default.a.renderToString(_jsx(__WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], {
    error: err
  }))));
  res.status(err.status || 500);
  res.send("<!doctype html>".concat(html));
}); //
// Launch the server
// -----------------------------------------------------------------------------

if (true) {
  app.listen(__WEBPACK_IMPORTED_MODULE_18__config___default.a.port, function () {
    console.info("The server is running at http://localhost:".concat(__WEBPACK_IMPORTED_MODULE_18__config___default.a.port, "/"));
  });
} //
// Hot Module Replacement
// -----------------------------------------------------------------------------


if (false) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




var ContextType = _extends({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  pathname: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  query: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  currency: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
}, __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"].childContextTypes);
/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */


var App =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      return this.props.context;
    }
  }, {
    key: "render",
    value: function render() {
      // NOTE: If you need to add or modify header, footer etc. of the app,
      // please do that inside the Layout component.
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

Object.defineProperty(App, "childContextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: ContextType
});
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* eslint-disable react/no-danger */

var _ref = _jsx("meta", {
  charSet: "utf-8"
});

var _ref2 = _jsx("meta", {
  httpEquiv: "x-ua-compatible",
  content: "ie=edge"
});

var _ref3 = _jsx("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1"
});

var _ref4 = _jsx("link", {
  rel: "manifest",
  href: "/site.webmanifest"
});

var _ref5 = _jsx("link", {
  rel: "stylesheet",
  href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
});

var _ref6 = _jsx("link", {
  href: "https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,500i,600",
  rel: "stylesheet"
});

var _ref7 = _jsx("link", {
  href: "https://fonts.googleapis.com/css?family=Niconne:400",
  rel: "stylesheet"
});

var _ref8 = _jsx("link", {
  href: "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700",
  rel: "stylesheet"
});

var _ref9 = _jsx("link", {
  rel: "apple-touch-icon",
  href: "/icon.png"
});

var _ref10 = _jsx("script", {
  src: "https://www.google-analytics.com/analytics.js",
  async: true,
  defer: true
});

var Html =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Html, _React$Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
  }

  _createClass(Html, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          styles = _props.styles,
          scripts = _props.scripts,
          app = _props.app,
          children = _props.children;
      return _jsx("html", {
        className: "no-js",
        lang: "en"
      }, void 0, _jsx("head", {}, void 0, _ref, _ref2, _jsx("title", {}, void 0, title), _jsx("meta", {
        name: "description",
        content: description
      }), _ref3, scripts.map(function (script) {
        return _jsx("link", {
          rel: "preload",
          href: script,
          as: "script"
        }, script);
      }), _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, styles.map(function (style) {
        return _jsx("style", {
          id: style.id,
          dangerouslySetInnerHTML: {
            __html: style.cssText
          }
        }, style.id);
      })), _jsx("body", {}, void 0, _jsx("div", {
        id: "app",
        dangerouslySetInnerHTML: {
          __html: children
        }
      }), _jsx("script", {
        dangerouslySetInnerHTML: {
          __html: "window.App=".concat(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app))
        }
      }), scripts.map(function (script) {
        return _jsx("script", {
          src: script
        }, script);
      }), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && _jsx("script", {
        dangerouslySetInnerHTML: {
          __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + "ga('create','".concat(__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId, "','auto');ga('send','pageview')")
        }
      }), __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && _ref10));
    }
  }]);

  return Html;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Html, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    styles: [],
    scripts: []
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = _jsx("div", {}, void 0, _jsx("h1", {}, void 0, "Error"), _jsx("p", {}, void 0, "Sorry, a critical error occurred on this page."));

var ErrorPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorPage, _React$Component);

  function ErrorPage() {
    _classCallCheck(this, ErrorPage);

    return _possibleConstructorReturn(this, (ErrorPage.__proto__ || Object.getPrototypeOf(ErrorPage)).apply(this, arguments));
  }

  _createClass(ErrorPage, [{
    key: "render",
    value: function render() {
      if (false) {
        return _jsx("div", {}, void 0, _jsx("h1", {}, void 0, this.props.error.name), _jsx("pre", {}, void 0, this.props.error.stack));
      }

      return _ref;
    }
  }]);

  return ErrorPage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(ErrorPage, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    error: null
  }
});

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default.a)(ErrorPage));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "html{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0 32px;padding:0 2rem;height:100%;font-family:sans-serif;text-align:center;color:#888}body{margin:0}h1{font-weight:400;color:#555}pre{white-space:pre-wrap;text-align:left}", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, baseUrl, cookie) {
  // NOTE: Tweak the default options to suite your application needs
  var defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? {
      Cookie: cookie
    } : null)
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, options) {
        var isGraphQL;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isGraphQL = url.startsWith('/');
                return _context.abrupt("return", isGraphQL || url.startsWith('/api') ? fetch("".concat(baseUrl).concat(url), _extends({}, defaults, options, {
                  headers: _extends({}, defaults.headers, options && options.headers)
                })) : fetch(url, options));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

/* unused harmony default export */ var _unused_webpack_default_export = (createFetch);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(50);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_universal_router___default.a(__WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */], {
  resolveRoute: function resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(function (action) {
        return action.default(context, params);
      });
    }

    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }

    return undefined;
  }
}));

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
// The top-level (parent) route
var routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [// The home route is added to client.js to make sure shared components are
  // added to client.js as well and not repeated in each individual route chunk.
  {
    path: '',
    load: function load() {
      return new Promise(function(resolve) { resolve(__webpack_require__(51)); });
    }
  }, {
    path: '/shop',
    load: function load() {
      return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 151));
    }
  }, {
    path: '/register',
    load: function load() {
      return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 155));
    }
  }, {
    path: '/contact',
    load: function load() {
      return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 156));
    }
  }, {
    path: '/personal',
    load: function load() {
      return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 157));
    }
  }, {
    path: '/about',
    load: function load() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 158));
    }
  }, {
    path: '/privacy',
    load: function load() {
      return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 159));
    }
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: function load() {
      return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 160));
    }
  }],
  action: function () {
    var _action = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var next, route;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              next = _ref.next;
              _context.next = 3;
              return next();

            case 3:
              route = _context.sent;
              // Provide default values for title, description etc.
              route.title = "".concat(route.title || 'Untitled Page', " - www.reactstarterkit.com");
              route.description = route.description || '';
              return _context.abrupt("return", route);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function action(_x) {
      return _action.apply(this, arguments);
    };
  }()
}; // The error page is available by permanent url for development mode

if (false) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default
  });
}

/* harmony default export */ __webpack_exports__["a"] = (routes);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(27);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function action(_x) {
  return _action.apply(this, arguments);
}

function _action() {
  _action = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var fetch;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch = _ref.fetch;
            return _context.abrupt("return", {
              title: 'React Starter Kit',
              component: _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Home__["a" /* default */], {
                news: []
              }))
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _action.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Banner__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Tabs__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_CardGrid__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Button__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Home_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__Home_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */













var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_3_components_Banner__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
  title: "Minimal Furniture Chair for Workspace",
  price: "74.28",
  buttonLabel: "Show Now"
}), _jsx(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
  title: "Minimal Furniture Chair for Workspace",
  price: "74.28",
  buttonLabel: "Show Now"
}), _jsx(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
  title: "Minimal Furniture Chair for Workspace",
  price: "74.28",
  buttonLabel: "Show Now"
}));

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_10_components_Button__["a" /* default */], {}, void 0, "Load More");

var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.root
      }, void 0, _ref, _jsx(__WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.accentProducts
        }
      }), _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.jumbotron
        }
      }), _jsx("header", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.header
      }, void 0, _jsx("h1", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.title
      }, void 0, "Trending Products"), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.devider
      }), _jsx("p", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.descr
      }, void 0, "A collection of textile samples lay spread out on the table Samsa was a travelled")), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Tabs__["a" /* default */], {
        classes: {
          header: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.tabsHeader,
          root: ''
        },
        panels: [{
          render: function render() {
            return _jsx(__WEBPACK_IMPORTED_MODULE_7_components_CardGrid__["a" /* default */], {
              list: [{
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: '-20%',
                labelType: 'tape'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: 'Out\nof\nStock',
                labelType: 'stock'
              }, {
                name: 'Aiaiai TMA-1 Studio',
                brand: 'Headphones,Studio',
                price: '$125',
                labelTxt: 'New',
                labelType: 'tape'
              }]
            });
          }
        }]
      }), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_11__Home_css___default.a.loadMore
      }, void 0, _ref2)));
    }
  }]);

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_11__Home_css___default.a)(Home));

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuka_carousel__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuka_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuka_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Banner_css__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Banner_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Banner_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Banner = function Banner(props) {
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.root
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_nuka_carousel___default.a, {
    cellAlign: "left",
    className: __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.slider,
    renderBottomCenterControls: function renderBottomCenterControls(props) {
      var box = [];

      var _loop = function _loop(i) {
        box.push(_jsx("div", {
          onClick: function onClick() {
            return props.goToSlide(i);
          },
          className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.dots, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.activeDot, i === props.currentSlide)])
        }));
      };

      for (var i = 0; i < props.slideCount; i++) {
        _loop(i);
      }

      return box;
    },
    renderCenterLeftControls: function renderCenterLeftControls(_ref2) {
      var previousSlide = _ref2.previousSlide;
      return _jsx(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
        onClick: previousSlide,
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrow, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrowLeft]),
        size: "2x",
        name: "long-arrow-left"
      });
    },
    renderCenterRightControls: function renderCenterRightControls(_ref3) {
      var nextSlide = _ref3.nextSlide;
      return _jsx(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
        onClick: nextSlide,
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrow, __WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a.arrowRight]),
        size: "2x",
        name: "long-arrow-right"
      });
    }
  }, void 0, props.children));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Banner_css___default.a)(Banner));

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("nuka-carousel");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(56);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Banner.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Banner.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3r1jc{position:relative;background-color:#f3f6f9}.uv5LH{cursor:pointer;position:absolute;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}._1c5RB{right:40px}._19l2c{left:40px}._12QJT{margin-bottom:40px;cursor:pointer;margin-right:10px;display:inline-block;width:11px;height:11px;border-radius:50%;border:2px solid #333}._12QJT:lst-child{margin-right:0}._1o7FJ{background-color:#333}", ""]);

// exports
exports.locals = {
	"root": "_3r1jc",
	"arrow": "uv5LH",
	"arrowRight": "_1c5RB",
	"arrowLeft": "_19l2c",
	"dots": "_12QJT",
	"activeDot": "_1o7FJ"
};

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_Button__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Rating__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Content_css__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Content_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Content_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__(7);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }








var Content = function Content(_ref) {
  var title = _ref.title,
      price = _ref.price,
      buttonLabel = _ref.buttonLabel;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.root
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {}, void 0, _jsx("h1", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.title
  }, void 0, title), _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.priceWrapper
  }, void 0, _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.currency
  }, void 0, "$"), _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.price
  }, void 0, price)), _jsx(__WEBPACK_IMPORTED_MODULE_3_components_Rating__["a" /* default */], {
    classes: {
      root: __WEBPACK_IMPORTED_MODULE_4__Content_css___default.a.rating
    }
  }), _jsx(__WEBPACK_IMPORTED_MODULE_2_components_Button__["a" /* default */], {}, void 0, buttonLabel)));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Content_css___default.a)(Content));

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(59);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Button.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Button.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1Z5Y8{display:inline-block;vertical-align:middle;padding:16px 36px;color:#fff;font-family:Poppins,sans-serif;font-size:16px;font-weight:500;letter-spacing:.16px;border-radius:24px;background-color:#333;outline:none;border:none;cursor:pointer}._2n9rU{background-color:#000}._2qGn_{background-color:#eee;color:#000}._1C0oJ{width:100%}", ""]);

// exports
exports.locals = {
	"root": "_1Z5Y8",
	"black": "_2n9rU",
	"gray": "_2qGn_",
	"fullWidth": "_1C0oJ"
};

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating_css__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Rating_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Rating_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Rating = function Rating(_ref) {
  var list = _ref.list,
      classes = _ref.classes;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a.root, classes.root])
  }, void 0, list.map(function (item) {
    return _jsx(__WEBPACK_IMPORTED_MODULE_2_react_fontawesome___default.a, {
      className: __WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a.star,
      name: item.name
    });
  }));
};

Rating.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star'
  }, {
    name: 'star-half-o'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Rating_css___default.a)(Rating));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(62);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Rating.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Rating.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3nDex{color:#333;font-size:15px;margin-right:5px}._3nDex:last-child{margin-right:0}", ""]);

// exports
exports.locals = {
	"root": "_3l1Po",
	"star": "_3nDex"
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(64);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Content.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Content.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".LiT7r{margin-left:calc(8.325% + 2.5px)!important;position:relative;min-height:514px}.LiT7r>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}._1eG1Z{margin:0 0 10px;font-size:32px;font-weight:500;line-height:34px}._1dUrS,._1eG1Z{color:#333;font-family:Poppins,sans-serif}._1dUrS{margin-bottom:16px;font-weight:600;line-height:24px}._1S-D9{font-size:50px}._1NrBt{font-size:35px}.SX5Y5{margin-bottom:51px}", ""]);

// exports
exports.locals = {
	"root": "LiT7r",
	"title": "_1eG1Z",
	"priceWrapper": "_1dUrS",
	"price": "_1S-D9",
	"currency": "_1NrBt",
	"rating": "SX5Y5"
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(66);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Container.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Container.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".l_-B9{max-width:1170px;width:100%;margin-left:auto;margin-right:auto}", ""]);

// exports
exports.locals = {
	"root": "l_-B9"
};

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tabs__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs_css__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Tabs_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }








var T = function T(_ref) {
  var tabs = _ref.tabs,
      panels = _ref.panels,
      classes = _ref.classes,
      defaultIndex = _ref.defaultIndex;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.root, classes.root])
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["Tabs"], {
    defaultIndex: defaultIndex || 0
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["TabList"], {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.list, classes.header])
  }, void 0, tabs.map(function (item) {
    return _jsx(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["Tab"], {
      selectedClassName: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.selected,
      className: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.tab
    }, void 0, item.txt);
  })), panels.map(function (item) {
    return _jsx(__WEBPACK_IMPORTED_MODULE_3_react_tabs__["TabPanel"], {
      className: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.panel,
      selectedClassName: __WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a.panelActive
    }, void 0, item.render());
  })));
};

var _ref2 = _jsx("span", {}, void 0, "panel1");

var _ref3 = _jsx("span", {}, void 0, "panel2");

var _ref4 = _jsx("span", {}, void 0, "panel3");

T.defaultProps = {
  defaultIndex: 0,
  classes: {
    root: '',
    header: ''
  },
  tabs: [{
    txt: 'New'
  }, {
    txt: 'Arrivals'
  }, {
    txt: 'Accessories'
  }, {
    txt: 'Essentials'
  }, {
    txt: 'Outdoor'
  }, {
    txt: 'Kitchen'
  }, {
    txt: 'Lighting'
  }],
  panels: [{
    render: function render() {
      return _ref2;
    }
  }, {
    render: function render() {
      return _ref3;
    }
  }, {
    render: function render() {
      return _ref4;
    }
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Tabs_css___default.a)(T));

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("react-tabs");

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(70);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Tabs.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Tabs.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._22jMM{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:46px}.SaViI{color:#111;font-family:Poppins,sans-serif;font-size:16px;font-weight:300;line-height:24px;letter-spacing:.16px;cursor:pointer}._3qg1L,.SaViI:hover{text-decoration:underline}.Qq_04{opacity:0;-webkit-transition:opacity .2s linear;-o-transition:opacity .2s linear;transition:opacity .2s linear}._3o4MT{opacity:1}", ""]);

// exports
exports.locals = {
	"root": "_2ct5S",
	"list": "_22jMM",
	"tab": "SaViI",
	"selected": "_3qg1L",
	"panel": "Qq_04",
	"panelActive": "_3o4MT"
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(72);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./CardGrid.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./CardGrid.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._4KRfw{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap}.k2HYK{width:calc(24.975% - 22.5px);margin-bottom:40px}.k2HYK:nth-child(1n){float:left;margin-right:30px;clear:none}.k2HYK:last-child{margin-right:0}.k2HYK:nth-child(4n){margin-right:0;float:right}.k2HYK:nth-child(4n+1){clear:both}._30gei .k2HYK{width:calc(33.3% - 20px)}._30gei .k2HYK:nth-child(1n){float:left;margin-right:30px;clear:none}._30gei .k2HYK:last-child{margin-right:0}._30gei .k2HYK:nth-child(3n){margin-right:0;float:right}._30gei .k2HYK:nth-child(3n+1){clear:both}", ""]);

// exports
exports.locals = {
	"root": "_4KRfw",
	"item": "k2HYK",
	"item-3": "_30gei"
};

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_CardLabel_CardLabel__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_AddToCard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Card_css__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Card_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Card_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }










var Card =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Card, _PureComponent);

  function Card() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Card.__proto__ || Object.getPrototypeOf(Card)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        visibleAddTo: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleVisibleAddTo", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.props.labelType !== 'stock') {
          _this.setState({
            visibleAddTo: !_this.state.visibleAddTo
          });
        }
      }
    }), _temp));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          name = _props.name,
          price = _props.price,
          brand = _props.brand,
          labelType = _props.labelType,
          labelTxt = _props.labelTxt;
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.root,
        onMouseEnter: this.toggleVisibleAddTo,
        onMouseLeave: this.toggleVisibleAddTo
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.inner
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_AddToCard__["a" /* default */], {
        visible: this.state.visibleAddTo
      }), _jsx("header", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.header
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_components_CardLabel_CardLabel__["a" /* default */], {
        type: labelType
      }, void 0, labelTxt), _jsx(__WEBPACK_IMPORTED_MODULE_3_react_fontawesome___default.a, {
        name: "heart",
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.like
      }))), _jsx("footer", {
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.footer, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.disabled, labelType === 'stock')])
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.footerHeader
      }, void 0, _jsx("span", {}, void 0, name), _jsx("span", {}, void 0, price)), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Card_css___default.a.brand
      }, void 0, brand)));
    }
  }]);

  return Card;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Card_css___default.a)(Card));

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(18);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _extends = _assign.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return _react.default.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "132",
    height: "120",
    viewBox: "0 0 132 120"
  }, props), _react.default.createElement("defs", null, _react.default.createElement("path", {
    id: "a",
    d: "M720.5 2532.9c.5-1.55 2.58-2.23 4.9-1.77 2.67.53 7.03 7 2.29 8.11-4.21-.75-8.33-2.78-7.18-6.34zm49.31 5.83c.01-1.33 1.82-2.24 4.25-1.52 2.86 3.4-4.26 4.49-4.25 1.52zm-45.39 3.8c-2.07-.75-2.43-2.84-3.59-4.3 1.8.96 2.84 2.53 3.6 4.3zm-62.37 9.38c-4.27-3.94 6.49-3.85 2.29 0zm113.97 0c.46-.85 2.4-.94 3.6-.5 1.99 2.7-4.22 3.57-3.6.5zm-55.52 4.56c-1.23 1.92-1.34 4.7-3.26 6.08.73-2.13 1.07-4.57 2.29-6.33.52-.07.56.24.97.25zm-41.47 19c.23-.9 1.54-.35 1.96 0-.33.72-1.39-.06-1.96 0zm93.07 5.33c-.12-1.36.81-1.9 2.61-1.78-.06 1.23-1.12 1.67-2.61 1.78zm-105.8 1.77c-2.14-.37-3.87-1.05-4.57-2.53 1.89.56 3.57 1.28 4.57 2.53zm78.04 9.63c1.86-.95 5.76-1.57 8.17-1.27-1.7.76-5.44.64-8.17 1.27zm11.76 25.6c-2.3-.16-4.05-.75-5.23-1.78 1.6.7 4.42.45 5.23 1.77zm-98.62 1.26c-.71-.36-1.63-1.4-.98-2.03 1.22-.01.94 1.13.98 2.03zm102.86 8.62c-.53-1.64 1.01-2.98 3.92-2.79 5 2.7-2.8 6.22-3.92 2.79zm-94.7-1.02c-.34-.94.82-.72.66-1.52 1.04-.28.38 1.8-.66 1.52zm82.62-1.01c-.08.45-.56.58-1.3.5v-.75c.68-.11.86.17 1.3.25zm-71.19 8.62c.57-3.2 4.1-4.08 5.55-6.6.39.05.28.47.33.77-2.04 1.88-3.3 4.37-5.88 5.83zm76.42-4.06v1.27c-.78.46-1.9.66-2.94.25-.59-2.04 1.56-2.32 2.94-1.52zm23.18 4.06c.2 1.08-.29 1.63-.98 2.02-1.42.18-1.8-.45-2.28-1.01.08-1.48 1.99-1.8 3.26-1.01zm-37.88 2.02c.1.59-.05.98-.33 1.27-1.02.12-1.45-.22-1.3-1.01.79.1.7-.47 1.63-.26zm-40.16 1.02c.58-.04.68.3 1.3.25-1.55 4.7-2.1 10.19-5.55 13.43.46-1.16.34-2.6.98-4.06.3-.7 1.32-1.27 1.63-2.02 1.02-2.44-.42-6.13 1.64-7.6zm-9.15 1.52c1.65 1.76 2.64 4.03 4.57 5.57-1.5 1.37-4 1.96-4.57 4.06-2.69.83-4.55.6-7.84.25-1.17-.95-2.24-1.97-3.59-2.79-1.93-5.96 4.85-9.24 11.43-7.1zm32.98 4.05c.34 1.36-.44 1.85-1.3 2.28-.96.07-1-.57-1.96-.5-1.47-1.72 1.72-3.18 3.26-1.78zm-27.1 0c1.5.04-.21 1.14 0 1.77-.97-.36.43-.98 0-1.77zm-28.41-60.3c1.83.6 3.28 1.5 4.9 2.27-.22.12-4.1-1.17-4.9-2.28zm-10.78 25.33c.25-.95-1.24-.55-1.3-1.27.04-.8.74-1.11 1.96-1 .29.53 1 .74.98 1.51-1.92.1-.81.22-1.64.76zm86.87 6.08c-2.69-.02-4-1.11-6.2-1.52-.29.46-.73.8-1.31 1.02-2.81-.5-2.8-2.46-6.53-1.78-6.1 1.12.54 7.8.97 11.4.78.5 2.28.44 2.95 1.02-.74 3.9 2.52 6.09 3.26 10.14-2.64-.83-3.72-2.86-4.57-5.07-3.2-2.6-5.6-5.8-10.13-7.35-1.3-1.52-2.23-3.34-5.22-3.55-1.26.68-.79 1.2-.98 2.79-1.93-.27-2.43 1.95-3.26 3.3-1.94.09-3.32.18-4.9 1-.48 1.58 0 3.89-1.96 4.32-2.87.1-2.77-2.08-2.62-4.31-2.74 1.25-.64 6.25-2.93 7.85.3-3.33.45-6.65.97-9.88-1.2-2.03-3.34-3.32-4.9-5.07-3 .96-2.68 4.5-5.87 5.32-.11-2.48 3.83-3.07 2.94-5.32-3.3.92-3.54 5.51-6.53 5.83.2-1.27 1.26-1.9 1.96-2.79-3.22-.08-4.19 2.82-6.2 4.82-2.57 2.53-6.14 4.5-8.17 6.84-1.91.36-3.59.2-5.23-.26-1.36-4.9 4.42-7.63 8.82-10.38 3.05-1.91 6.32-4.22 6.86-7.35-1.17-.77-2.1 1.53-3.27.76.9-1.84 3.96-1.71 3.6-3.8-.48-2.75-4.66-1.63-7.19-1.02-4.38 1.06-9.53 2.5-12.4 2.79.27-.97 1.95-.85 2.93-1.27-1.34-.78-4.98-.97-4.25-2.53 1.12.97.2-.26 2.29-.25.73-.04-.42-.64 0-1.27.76.08 1.35.3 1.96.5-.71-1.57-2.76-.9-4.57-1.26-2.98 2.32-10.46 4.5-15.35 5.32 2.04-1.54 5.45-2.02 8.16-3.04.77-1.6 4.2-3.1 5.56-5.07-.56-1.05-2.58.01-3.27-.5 3.79-1.63 5.55-4.82 9.47-6.34-.9-1.2-.9-1.53-.98-3.3.39-.29 1.15-.28 1.96-.25-4.08-2.57-14.21-.46-16-4.81.38-.04.27-.47.32-.76 2.25-.31 2.51-1.86 4.58-1.27.23.69-1.54-.18-1.3.5 6.18 2.49 17.49 4.61 24.16 1.02-1.96-1.86-6.12-2.01-7.84-4.05 2.2 1.16 5.1 1.77 7.5 2.78.91-1.47-.02-3.69 0-5.32-5.67-4.96-15.09-7.04-18.6-13.68 5.7.05 8.14 4.82 13.71 5.83.12 2.22 1.14 2.85 3.92 4.05 3.36 1.45 9.17 4 11.43.25 2-7.15-3.07-12.73-6.86-19.5-1.45-2.61-3.61-8.42-5.22-11.92-.7-1.5-1.5-4.44 2.6-4.05 5.1.48 3.98 10.47 7.2 12.16 2.27 9.05 8.08 15.35 15.01 20.78 3.98.89 2.67-2.62 2.94-4.56 1.67-.36 1.4.77 2.29 1.01 2.7.6 6.8-3.47 3.27-2.28.26-1.66-2.64-2.98-1.64-5.07 2.8.2 3.03 2.38 3.92 4.06 2.53-.15.5-3.84 2.61-4.31-.23 1.39-.65 1.23-.65 2.53 2.57-1.02 2.25-6.97 6.86-4.05.95 3.87-.67 7.03 1.3 10.64 1.15-.12.8-1.41 1.64-1.77 2.86.25.56 2.6.98 4.05-.76.34-1.86.42-2.62.76-1.2 2.17.6 2.96 1.31 4.31.5.95-.6 2.63 1.3 2.79.5 0-1.28-1.84.33-2.03 1.13-.08 1.2 1.33.66 1.78 4-1.2 5.6-4.27 9.47-5.58 4.42.35 7.16-4.6 10.45-1.27-.1 2.24-2.43 3.3-4.58 4.31-4.34 2.03-6.84 5.88-11.75 7.86-.56 4 3.87 3.7 7.83 3.04-.22 1.18-2.75.56-3.26 1.52.4 1.2 1 .88 2.29.5.6.49-.2.46 0 1.27 2.28.17 3.1-.8 5.55-.5.18.36.5.61.98.76-3.8 5.57 7.06 4.8 6.2 8.36-.7 2.9-9.66.38-9.47 4.56-1.42.16-3.1.13-3.92.76.25.65.8 1.07 1.63 1.27-1.09.91-1.41-.92-2.6-.76-2.22 1.42 1.69 1.9 2.93 2.28.8-.03.07-.84-.33-.76 1.4-.49 2.9 1.12 3.6 2.02zm-66.95-4.81c-1.82-.58-4.52 1.37-6.53 0-1.25.97-1.31 2.27-.65 3.04 2.28-1.1 6.2-.93 7.18-3.04zm-2.6-3.3c-1.17-.05-1.97.18-2.3.76 1.3.16 1.7-.37 2.3-.76zm4.89-3.29c-2.08-1.89-5.95.33-7.51 1.27.24.57.29 1.3.65 1.77 2.02-.46 4.74-.37 5.88-1.52-.57-.14-1.92.3-1.96-.25 1.4-.1 2.37-.53 2.94-1.27zm1.63-3.04c-.6-.55-1.75-.67-2.28-1.27.12-3.58-6.55-4.5-6.2-.25 2.13.28 3.1 1.48 4.24 2.53.64-.93 3.84.11 4.24-1.01zm-8.16 21.54h-.02.02zm-.02 0c-.22.14-3.18 3.05-4.88 2.53 1.2-1.18 2.96-1.91 4.88-2.53zm13.73 4.3c-.68.66-.79 1.76-1.96 2.03.69-.65.8-1.75 1.96-2.02z"
  })), _react.default.createElement("g", {
    clipPath: "url(#clip-4801)",
    transform: "translate(-648 -2531)"
  }, _react.default.createElement("use", {
    fill: "#111",
    xlinkHref: "#a"
  })));
};

exports.default = _default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(76);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./CardLabel.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./CardLabel.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".nk7G1{position:absolute;background-color:#000;color:#fff;font-family:Roboto,sans-serif;font-size:20px;font-weight:300;letter-spacing:.13px;height:34px;line-height:34px;left:-45px;top:20px;width:160px;text-align:center;text-transform:capitalize}._2ONDI,.z4Krs{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}._2ZAtq{top:20px;left:20px;border-radius:50%;width:37px;height:37px;font-size:10px;line-height:37px;-webkit-transform:none;-ms-transform:none;transform:none}._2ONDI{font-size:12px}", ""]);

// exports
exports.locals = {
	"root": "nk7G1",
	"tape": "z4Krs",
	"stock": "_2ONDI",
	"circle": "_2ZAtq"
};

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AddToCard_css__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__AddToCard_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var AddToCard = function AddToCard(_ref) {
  var handleClick = _ref.handleClick,
      visible = _ref.visible;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.visible, visible)]),
    onClick: handleClick
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "shopping-cart",
    className: __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.icon
  }), _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a.label
  }, void 0, "Add to Cart"));
};

AddToCard.defaultProps = {
  handleClick: function handleClick() {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__AddToCard_css___default.a)(AddToCard));

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(79);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./AddToCard.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./AddToCard.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".zbRFr{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:101px;height:101px;background-color:rgba(0,0,0,.5);border-radius:50%;color:#fff;text-align:center;opacity:0;-webkit-transition:opacity .2s linear;-o-transition:opacity .2s linear;transition:opacity .2s linear}._1BxHX{display:block;margin-top:26px}._2EJFs{color:#fff;font-family:Poppins,sans-serif;font-size:14px;font-weight:400;line-height:24px;letter-spacing:.14px}._2y-gj{opacity:1;cursor:pointer}", ""]);

// exports
exports.locals = {
	"root": "zbRFr",
	"icon": "_1BxHX",
	"label": "_2EJFs",
	"visible": "_2y-gj"
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(81);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Card.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Card.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3DP_V{max-width:270px;overflow:hidden}._1WclK,.bcFZ3{position:relative}.bcFZ3{height:382px;background-color:#f3f6f9}._3fzXP{padding-top:20px;background-color:#fff}._1hmIv{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:#111;font-size:16px;font-weight:500;letter-spacing:.16px}._1hmIv,._2Pc-G{font-family:Poppins,sans-serif;line-height:24px}._2Pc-G{color:#999;font-size:14px;font-weight:400;letter-spacing:.14px}._1pRDE{position:absolute;right:21px;top:21px;-webkit-transition:color .2s linear;-o-transition:color .2s linear;transition:color .2s linear;color:rgba(0,0,0,.5);cursor:pointer}._1pRDE:hover{color:#000}._3R6fb ._1hmIv{color:hsla(0,0%,7%,.2)}._3R6fb ._2Pc-G{color:hsla(0,0%,60%,.2)}", ""]);

// exports
exports.locals = {
	"root": "_3DP_V",
	"header": "_1WclK",
	"inner": "bcFZ3",
	"footer": "_3fzXP",
	"footerHeader": "_1hmIv",
	"brand": "_2Pc-G",
	"like": "_1pRDE",
	"disabled": "_3R6fb"
};

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Button__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }








var Jumbotron = function Jumbotron(_ref) {
  var title = _ref.title,
      descr = _ref.descr,
      link = _ref.link,
      btn = _ref.btn,
      classes = _ref.classes;
  return _jsx("article", {
    className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.root, classes.root])
  }, void 0, _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.inner
  }, void 0, _jsx("h2", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.title
  }, void 0, title), _jsx("p", {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.descr
  }, void 0, descr), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", _extends({}, link, {
    className: __WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a.link
  }), link.txt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Button__["a" /* default */], btn, btn.label)));
};

Jumbotron.defaultProps = {
  classes: {
    root: ''
  },
  title: 'Explore great apps for Productivity, including office for iPad',
  descr: 'Start editing a phone on your iPad and finish it on your Macbook.Sync a Playlist from your iPhone to your Apple Watch.',
  link: {
    txt: 'Learn More about iPad Mini'
  },
  btn: {
    label: 'Buy Now',
    onClick: function onClick() {}
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Jumbotron_css___default.a)(Jumbotron));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(84);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Jumbotron.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Jumbotron.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2IXwH{padding:60px 0 60px 50px;background-color:#f2f2f2}._2AoJt{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(41.625% - 17.5px);flex-basis:calc(41.625% - 17.5px);max-width:calc(41.625% - 17.5px);width:calc(41.625% - 17.5px)}._2AoJt:nth-child(1n){margin-right:30px;margin-left:0}._2AoJt:last-child{margin-right:0}._2AoJt:nth-child(12n){margin-right:0;margin-left:auto}._3k946{color:#333;font-size:24px;font-weight:500;line-height:35px;margin-top:0;margin-bottom:23px}._1RlOE,._3k946,._3MacZ{font-family:Poppins,sans-serif}._1RlOE{margin-bottom:30px;color:#555}._1RlOE,._3MacZ{font-size:12px;font-weight:400;line-height:24px}._3MacZ{display:block;color:#000;margin-bottom:34px;text-decoration:underline}._3MacZ:hover{text-decoration:none;color:#000}", ""]);

// exports
exports.locals = {
	"root": "_2IXwH",
	"inner": "_2AoJt",
	"title": "_3k946",
	"descr": "_1RlOE",
	"link": "_3MacZ"
};

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_CardLabel__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var _ref = _jsx("span", {}, void 0, "$");

var _ref2 = _jsx("span", {}, void 0, "$");

var _ref3 = _jsx("span", {}, void 0, "$");

var _ref4 = _jsx(__WEBPACK_IMPORTED_MODULE_4_components_CardLabel__["a" /* default */], {
  type: "tape"
}, void 0, "Hot");

var _ref5 = _jsx("span", {}, void 0, "$");

var _ref6 = _jsx("span", {}, void 0, "$");

var _ref7 = _jsx("span", {}, void 0, "$");

var AccentProducts =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AccentProducts, _React$PureComponent);

  function AccentProducts() {
    _classCallCheck(this, AccentProducts);

    return _possibleConstructorReturn(this, (AccentProducts.__proto__ || Object.getPrototypeOf(AccentProducts)).apply(this, arguments));
  }

  _createClass(AccentProducts, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          list = _props.list,
          classes = _props.classes;
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.root, classes.root])
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall])
      }, void 0, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[0].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref, list[0].price)), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall])
      }, void 0, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[1].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref2, list[1].price))), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productBig])
      }, void 0, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[2].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref3, " ", list[2].price))), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productBig])
      }, void 0, _ref4, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[3].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref5, list[3].price))), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.item
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.right])
      }, void 0, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[4].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref6, list[4].price)), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.product, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.productSmall, __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.right])
      }, void 0, _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.name
      }, void 0, list[5].name), _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a.price
      }, void 0, _ref7, list[5].price))));
    }
  }]);

  return AccentProducts;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

AccentProducts.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }, {
    name: 'Exco 4 8ft Matte Black',
    price: '24.00'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__AccentProducts_css___default.a)(AccentProducts));

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(87);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./AccentProducts.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./AccentProducts.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2panu{padding:30px;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:justify;justify-content:space-between}._3VZ8y{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(24.975% - 22.5px);flex-basis:calc(24.975% - 22.5px);max-width:calc(24.975% - 22.5px);width:calc(24.975% - 22.5px)}._3VZ8y:nth-child(1n){margin-right:30px;margin-left:0}._3VZ8y:last-child{margin-right:0}._3VZ8y:nth-child(4n){margin-right:0;margin-left:auto}._1v6Sp{overflow:hidden;position:relative;min-height:620px;background-color:#f3f6f9}._2uOqG{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center;padding-left:40px;max-height:344px;margin-bottom:30px;min-height:344px}._2uOqG:last-child{margin-bottom:0}.ji7hM{text-align:center;padding-top:100px;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}._2zpAh{-ms-flex-align:end;align-items:flex-end;text-align:right;padding-right:40px}._2MPWr,._2WsJ1{width:100%;display:block;color:#333;font-family:Poppins,sans-serif}._2MPWr{margin-bottom:20px;font-size:18px;font-weight:500;line-height:24px}._2WsJ1{font-size:24px;font-weight:500;line-height:30px}._2WsJ1 span{font-size:18px;letter-spacing:.18px}", ""]);

// exports
exports.locals = {
	"root": "_2panu",
	"item": "_3VZ8y",
	"product": "_1v6Sp",
	"productSmall": "_2uOqG",
	"productBig": "ji7hM",
	"right": "_2zpAh",
	"name": "_2MPWr",
	"price": "_2WsJ1"
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(89);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Home.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Home.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1avl7{padding-bottom:100px}.witsc{margin-bottom:56px;text-align:center}._2Rav6{margin:0;color:#111;font-family:Poppins,sans-serif;font-size:28px;font-weight:600;line-height:24px;letter-spacing:.28px}._1afBP{display:inline-block;width:70px;height:1px;margin-bottom:15px;margin-top:20px;background-color:#111}._11vug{color:#555;font-family:Poppins,sans-serif;font-size:14px;font-weight:300;line-height:24px;letter-spacing:.14px}._1Jdr9{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(83.25% - 5px);flex-basis:calc(83.25% - 5px);max-width:calc(83.25% - 5px);width:calc(83.25% - 5px);margin-left:calc(8.325% + 2.5px)!important}._1Jdr9:nth-child(1n){margin-right:30px;margin-left:0}._1Jdr9:last-child{margin-right:0}._1Jdr9:nth-child(12n){margin-right:0;margin-left:auto}._1JFOP{margin-bottom:77px}._2Qvsy{margin-bottom:100px}._1QqaL{margin-top:77px;text-align:center}", ""]);

// exports
exports.locals = {
	"root": "_1avl7",
	"header": "witsc",
	"title": "_2Rav6",
	"devider": "_1afBP",
	"descr": "_11vug",
	"tabsHeader": "_1Jdr9",
	"jumbotron": "_1JFOP",
	"accentProducts": "_2Qvsy",
	"loadMore": "_1QqaL"
};

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_ServiceFeatures__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Logo__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Navigation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_SocialsList__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Footer_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Footer_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









var Footer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.root
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3_components_Container__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_2_components_ServiceFeatures__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.services
        }
      }), _jsx(__WEBPACK_IMPORTED_MODULE_4_components_Logo__["a" /* default */], {
        theme: "white",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.logo
        }
      }), _jsx("p", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.descr
      }, void 0, "A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame."), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_SocialsList__["a" /* default */], {
        type: "circle",
        center: true,
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.socials
        }
      }), _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Navigation__["a" /* default */], {
        theme: "white",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.navigation
        }
      }), _jsx("p", {
        className: __WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a.terms
      }, void 0, "\xA9 2017 Shippon.All rights reserved.")));
    }
  }]);

  return Footer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Footer_css___default.a)(Footer));

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icons_plan_svg__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }









var ServiceFeatures = function ServiceFeatures(_ref) {
  var list = _ref.list,
      classes = _ref.classes;
  return _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {}, void 0, _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.root, classes.root])
  }, void 0, list.map(function (item) {
    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.item
    }, void 0, _jsx("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.icon
    }, void 0, item.icon), _jsx("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a.title
    }, void 0, item.title), _jsx("p", {}, void 0, item.descr));
  })));
};

ServiceFeatures.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: _jsx(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {})
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: _jsx(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {})
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: _jsx(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {})
  }, {
    title: 'Free shipping',
    descr: 'Free Shipping for all US Order',
    icon: _jsx(__WEBPACK_IMPORTED_MODULE_6__icons_plan_svg___default.a, {})
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__ServiceFeatures_css___default.a)(ServiceFeatures));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(93);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ServiceFeatures.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ServiceFeatures.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2UOba,._3gAgd{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}._2UOba{position:relative;-ms-flex-direction:column;flex-direction:column;text-align:center;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(24.975% - 22.5px);flex-basis:calc(24.975% - 22.5px);max-width:calc(24.975% - 22.5px);width:calc(24.975% - 22.5px);height:139px;padding-top:10px;background-color:#fff}._2UOba:nth-child(1n){margin-right:30px;margin-left:0}._2UOba:last-child{margin-right:0}._2UOba:nth-child(12n){margin-right:0;margin-left:auto}._3W9LW{font-size:18px;font-weight:500;letter-spacing:.18px}._3hGAB,._3W9LW{color:#333;font-family:Poppins,sans-serif;line-height:24px}._3hGAB{font-size:15px;font-weight:300;letter-spacing:.15px}.vKteh{position:absolute;top:5px;right:5px}", ""]);

// exports
exports.locals = {
	"root": "_3gAgd",
	"item": "_2UOba",
	"title": "_3W9LW",
	"descr": "_3hGAB",
	"icon": "vKteh"
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(18);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _extends = _assign.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return _react.default.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "53",
    height: "53",
    viewBox: "0 0 53 53"
  }, props), _react.default.createElement("defs", null, _react.default.createElement("path", {
    id: "a",
    d: "M638.04 3739.13l-5.6 2.55c-.36.17-.7.4-.98.67l-9.14 9.15-31.47-3.77a1.87 1.87 0 0 0-1.55.53l-1.75 1.75c-.93.93-.64 2.5.56 3.04l22.55 10.1-6.47 6.48h-11.31c-.5 0-.98.2-1.33.55l-.94.95c-.94.94-.63 2.53.58 3.05l9.54 4.09 4.1 9.54a1.87 1.87 0 0 0 3.04.58l.95-.95c.35-.35.55-.83.55-1.32v-11.31l6.47-6.48 10.11 22.56a1.87 1.87 0 0 0 3.04.56l1.75-1.75c.4-.41.6-.98.53-1.55l-3.78-31.47 9.15-9.15c.28-.28.5-.6.67-.97l2.56-5.6a1.37 1.37 0 0 0-1.83-1.83z"
  })), _react.default.createElement("use", {
    xlinkHref: "#a",
    opacity: ".1",
    transform: "translate(-587 -3739)"
  }));
};

exports.default = _default;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(96);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Logo.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Logo.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1RJ-1{width:119px;color:#000;font-family:Niconne,cursive;font-size:40px;font-weight:400;line-height:1;letter-spacing:.4px}.fpi9W{color:#fff}", ""]);

// exports
exports.locals = {
	"root": "_1RJ-1",
	"white": "fpi9W"
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(98);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Navigation.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Navigation.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".Ntl35{display:inline-block;text-decoration:none;color:#111;font-family:Poppins,sans-serif;font-size:18px;line-height:24px;font-weight:400;letter-spacing:.18px;margin-right:35px}.Ntl35:last-child{margin-right:0}.Ntl35:active,.Ntl35:hover,.Ntl35:visited{text-decoration:underline;color:#111}._2Qhfn .Ntl35{color:#f1f1f1;font-size:16px;font-weight:300;line-height:24px}._3fFw0{text-decoration:underline}", ""]);

// exports
exports.locals = {
	"root": "_2gcJx",
	"link": "Ntl35",
	"white": "_2Qhfn",
	"activeLink": "_3fFw0"
};

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(101);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./SocialsList.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./SocialsList.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2IRYf{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start}._1dG3e{margin-right:20px}._36WMn{color:#fff}._1gfcl{-ms-flex-pack:center;justify-content:center}._1p_LG a{display:inline-block;border:1px solid #fff;border-radius:50%;width:36px;height:36px;text-align:center;line-height:36px}", ""]);

// exports
exports.locals = {
	"root": "_2IRYf",
	"item": "_1dG3e",
	"icon": "_36WMn",
	"center": "_1gfcl",
	"circle": "_1p_LG"
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(103);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Footer.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Footer.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1UUMy{padding:30px 0 46px;background-color:#232323;text-align:center}._34Amj{display:block;margin-left:auto;margin-right:auto;margin-bottom:20px}.qXJlN{margin-bottom:60px}._3q-5_{margin-bottom:26px;color:#f1f1f1;font-family:Poppins,sans-serif;font-size:14px;font-weight:400;line-height:24px;text-align:center}._2fG-x{margin-bottom:40px}._3qOQi{margin-bottom:47px}._3gek3{color:#f1f1f1;font-family:Poppins,sans-serif;font-size:16px;font-weight:300;line-height:24px}", ""]);

// exports
exports.locals = {
	"root": "_1UUMy",
	"logo": "_34Amj",
	"services": "qXJlN",
	"descr": "_3q-5_",
	"socials": "_2fG-x",
	"navigation": "_3qOQi",
	"terms": "_3gek3"
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(105);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../css-loader/index.js??ref--1-rules-1!../postcss-loader/lib/index.js??ref--1-rules-3!./normalize.css", function() {
        content = require("!!../css-loader/index.js??ref--1-rules-1!../postcss-loader/lib/index.js??ref--1-rules-3!./normalize.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}", ""]);

// exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(107);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Layout.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Layout.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}body{margin:0}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}a{text-decoration:none;cursor:pointer}a:hover{color:currentColor}ul{list-style:none;padding:0;margin:0}*{line-height:1;-webkit-box-sizing:border-box;box-sizing:border-box}", ""]);

// exports


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SocialsList__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Container__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Logo__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Navigation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ToolBar__ = __webpack_require__(111);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */









var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_4__Container__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3__SocialsList__["a" /* default */], {}));

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_5__Logo__["a" /* default */], {});

var _ref3 = _jsx(__WEBPACK_IMPORTED_MODULE_6__Navigation__["a" /* default */], {});

var _ref4 = _jsx(__WEBPACK_IMPORTED_MODULE_7__ToolBar__["a" /* default */], {});

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.root
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.top
      }, void 0, _ref), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.middle
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__Container__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_2__Header_css___default.a.row
      }, void 0, _ref2, _ref3, _ref4)));
    }
  }]);

  return Header;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Header_css___default.a)(Header));

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(110);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Header.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Header.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2cC8B,.O9oW9{background:#fff}._2AeG3{background-color:#000;height:50px}._2AeG3,._2cC8B{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}._2cC8B{height:93px}.tZOyY{display:-ms-flexbox;display:flex;-ms-flex-align:baseline;align-items:baseline;-ms-flex-pack:justify;justify-content:space-between}", ""]);

// exports
exports.locals = {
	"root": "O9oW9",
	"middle": "_2cC8B",
	"top": "_2AeG3",
	"row": "tZOyY"
};

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToolBar_css__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ToolBar_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }








var ToolBar = function ToolBar(props) {
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.root
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "search",
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.action
  }), _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.bag
  }, void 0, _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.count
  }, void 0, "2"), _jsx(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
    name: "shopping-bag",
    className: __WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a.action
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__ToolBar_css___default.a)(ToolBar));

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(113);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ToolBar.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./ToolBar.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3zg3p{cursor:pointer;margin-right:27px}._3zg3p:last-child{margin-right:0}._1T9Wf{position:relative;cursor:pointer}.jkgLr{position:absolute;top:-12px;border-radius:50%;text-align:center;line-height:18px;right:-9px;width:18px;height:18px;background-color:#000;color:#fff;font-family:Poppins,sans-serif;font-size:9px;font-weight:500;letter-spacing:.09px}", ""]);

// exports
exports.locals = {
	"action": "_3zg3p",
	"bag": "_1T9Wf",
	"count": "jkgLr"
};

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Register_css__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Register_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Register_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Form__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_Title__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Button__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_modules_Validator__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_formik___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_formik__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }















var _ref4 = _jsx(__WEBPACK_IMPORTED_MODULE_7_components_Title__["a" /* default */], {
  type: "h2",
  center: true
}, void 0, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F");

var _ref6 = _jsx("span", {});

var _ref7 = _jsx("span", {}, void 0, "Already have an account?");

var _ref8 = _jsx(__WEBPACK_IMPORTED_MODULE_8_components_Button__["a" /* default */], {
  type: "submit",
  theme: "gray",
  fullWidth: true
}, void 0, "Login");

var Register = function Register(_ref) {
  var register = _ref.register,
      serverErrors = _ref.serverErrors,
      isLoading = _ref.isLoading;

  var _ref5 = _jsx(__WEBPACK_IMPORTED_MODULE_8_components_Button__["a" /* default */], {
    type: "submit",
    isLoading: isLoading,
    theme: "black",
    fullWidth: true
  }, void 0, "Register");

  return _jsx(__WEBPACK_IMPORTED_MODULE_12_formik__["Formik"], {
    validationSchema: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].object().shape({
      email: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().email('Некорректный email').required('Email обязательное поле'),
      phone: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Телефон обязательное поле').phone('Некорректный номер телефона'),
      password: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Пароль обязательное поле').min(8, 'Пароль должен быть минимум из 8 символов'),
      name: __WEBPACK_IMPORTED_MODULE_11_modules_Validator__["a" /* default */].string().required('Имя обязательное поле')
    }),
    initialValues: {
      email: '',
      phone: '',
      password: '',
      name: ''
    },
    onSubmit: function onSubmit(values, _ref2) {
      var props = _ref2.props,
          setSubmitting = _ref2.setSubmitting,
          setErrors = _ref2.setErrors;
      register({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password
      });
      setTimeout(function () {
        return setSubmitting(false);
      }, 1000);
    },
    render: function render(_ref3) {
      var values = _ref3.values,
          errors = _ref3.errors,
          handleSubmit = _ref3.handleSubmit,
          handleChange = _ref3.handleChange;
      var errs = Object.assign({}, serverErrors, errors);
      console.log(isLoading);
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Register_css___default.a.root
      }, void 0, _ref4, _jsx("form", {
        action: "",
        onSubmit: handleSubmit
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0412\u0430\u0448\u0435 \u0418\u043C\u044F*",
        placeholder: "\u0412\u0430\u0448\u0435 \u0418\u043C\u044F",
        value: values.name,
        error: errs.name,
        onChange: handleChange,
        name: "name"
      })), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        name: "email",
        label: "Email*",
        placeholder: "Email",
        type: "text",
        value: values.email,
        onChange: handleChange,
        error: errs.email
      })), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D*",
        placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
        type: "tel",
        name: "phone",
        error: errs.phone,
        value: values.phone,
        onChange: handleChange
      })), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["a" /* Group */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Form__["b" /* Input */], {
        label: "Password*",
        placeholder: "Password",
        name: "password",
        type: "password",
        error: errs.password,
        value: values.password,
        onChange: handleChange
      })), _ref5, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Register_css___default.a.already
      }, void 0, _ref6, _ref7), _ref8));
    }
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) {
  return {
    isLoading: state[__WEBPACK_IMPORTED_MODULE_10__actionTypes__["NAME"]].register.isLoading,
    serverErrors: _extends({}, state[__WEBPACK_IMPORTED_MODULE_10__actionTypes__["NAME"]].register.errors)
  };
}, {
  register: __WEBPACK_IMPORTED_MODULE_9__actions__["a" /* register */]
})(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Register_css___default.a)(Register)));

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(116);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Register.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Register.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3kv3t{max-width:570px;padding-bottom:100px;margin-left:auto;margin-right:auto}.-LFy3{margin-bottom:27px}.-LFy3 span:first-child{margin-top:30px;height:1px;background-color:#eaeaea;display:block}.-LFy3 span:nth-child(2){display:block;text-align:center;color:#333;font-family:Poppins,sans-serif;font-size:14px;font-weight:300;line-height:30px;letter-spacing:.14px}", ""]);

// exports
exports.locals = {
	"root": "_3kv3t",
	"already": "-LFy3"
};

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Input__ = __webpack_require__(118);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__Input__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Group__ = __webpack_require__(121);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Group__["a"]; });



/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Input_css__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Input_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Input_css__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var renderErrors = function renderErrors(error) {
  var isArray = Array.isArray(error);

  if (isArray) {
    return error.map(function (err) {
      return _jsx("span", {
        className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.error
      }, void 0, err);
    });
  }

  return _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.error
  }, void 0, error);
};

var Input = function Input(_ref) {
  var label = _ref.label,
      type = _ref.type,
      value = _ref.value,
      handlers = _ref.handlers,
      error = _ref.error,
      rest = _objectWithoutProperties(_ref, ["label", "type", "value", "handlers", "error"]);

  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.root
  }, void 0, _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.label
  }, void 0, label), error ? renderErrors(error) : null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", _extends({
    type: type,
    value: value,
    className: __WEBPACK_IMPORTED_MODULE_4__Input_css___default.a.input
  }, handlers, rest)));
};

Input.defaultProps = {
  label: '',
  type: 'text',
  error: null,
  handlers: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Input_css___default.a)(Input));

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(120);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Input.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Input.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2na58{display:block;max-width:100%;width:100%;height:50px;border:1px solid #eaeaea;background-color:transparent;font-family:Poppins,sans-serif;font-size:14px;font-weight:300;letter-spacing:.14px;padding:0 10px}._2na58,._2na58:focus{outline:none}._2na58::-webkit-input-placeholder{color:#999}._2na58::-moz-placeholder{color:#999}._2na58:-ms-input-placeholder{color:#999}._2na58:-moz-placeholder{color:#999}._1K2tY{color:#555;font-family:Poppins,sans-serif;font-size:15px;font-weight:400;line-height:30px;letter-spacing:.15px}.SpBb3{font-size:12px;color:red}", ""]);

// exports
exports.locals = {
	"input": "_2na58",
	"label": "_1K2tY",
	"error": "SpBb3"
};

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Group_css__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Group_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Group_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Group = function Group(_ref) {
  var children = _ref.children;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_4__Group_css___default.a.root
  }, void 0, children);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Group_css___default.a)(Group));

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(123);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Group.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Group.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._2Ebct{margin-bottom:20px}", ""]);

// exports
exports.locals = {
	"root": "_2Ebct"
};

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Title_css__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Title_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Title_css__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Title = function Title(_ref) {
  var type = _ref.type,
      children = _ref.children,
      classes = _ref.classes,
      center = _ref.center,
      id = _ref.id;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(type, {
    id: id,
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_4__Title_css___default.a.title, classes.root, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_4__Title_css___default.a.center, center)])
  }, children);
};

Title.defaultProps = {
  children: '',
  id: '',
  type: 'h3',
  center: false,
  classes: {
    root: ''
  }
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Title_css___default.a)(Title));

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(126);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Title.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Title.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3s3DD{color:#111;font-family:Poppins,sans-serif;font-weight:600;letter-spacing:.28px}h1._3s3DD{font-size:92.8px;font-size:5.8rem;font-weight:400;line-height:66px}h2._3s3DD{font-size:28px;line-height:24px}._7NXQ0{text-align:center}", ""]);

// exports
exports.locals = {
	"title": "_3s3DD",
	"center": "_7NXQ0"
};

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return register; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__(11);


var register = function register(_ref) {
  var email = _ref.email,
      password = _ref.password,
      name = _ref.name,
      phone = _ref.phone;
  return {
    type: __WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].types.REQUEST_START,
    name: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["REGISTER"],
    url: 'http://127.0.0.1:8000/user/',
    method: 'post',
    params: {
      body: {
        name: name,
        phone: phone,
        email: email,
        password: password
      }
    }
  };
};

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = watchFetchRequests;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(24);
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetch),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFetchRequests);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



 // The watcher: watch actions and coordinate worker tasks

function getErrorData(data) {
  return data.json().then(function (data) {
    return data;
  });
}

function fetch(_ref) {
  var url, params, _ref$method, method, _ref$name, name, resp, data;

  return regeneratorRuntime.wrap(function fetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url, params = _ref.params, _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, _ref$name = _ref.name, name = _ref$name === void 0 ? 'NOTHING_TYPE' : _ref$name;
          _context.prev = 1;
          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* default */][method.toLowerCase()], {
            url: url,
            params: params
          });

        case 4:
          resp = _context.sent;
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_SUCCESS"],
            name: name,
            payload: _extends({}, resp)
          });

        case 7:
          _context.next = 16;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(getErrorData, _context.t0.resp);

        case 13:
          data = _context.sent;
          _context.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_FAIL"],
            name: name,
            payload: {
              statusText: _context.t0.resp.statusText,
              ok: _context.t0.resp.ok,
              status: _context.t0.resp.status,
              data: data
            }
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 9]]);
}

function watchFetchRequests() {
  return regeneratorRuntime.wrap(function watchFetchRequests$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_START"], fetch);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model__ = __webpack_require__(131);



var ApiReporter = function ApiReporter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_1__model__["a" /* default */];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload,
      type = action.type;
  console.log(type);

  switch (type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["HIDE_REPORTER"]:
      return state.set('isError', false).set('status', null).set('message', null);

    case __WEBPACK_IMPORTED_MODULE_0__constants__["SHOW_REPORTER"]:
      return state.set('isError', true).set('status', payload.status).set('message', payload.message);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ApiReporter);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);

var ds = new __WEBPACK_IMPORTED_MODULE_0_immutable__["Map"]({
  isError: false,
  status: null,
  message: null
});
/* harmony default export */ __webpack_exports__["a"] = (ds);

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getState */
/* unused harmony export getModel */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(9);

var getState = function getState(state) {
  return state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]];
};
var getModel = function getModel(state) {
  return {
    status: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('status'),
    message: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('message'),
    show: state[__WEBPACK_IMPORTED_MODULE_0__constants__["NAME"]].get('isError')
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  getModel: getModel
});

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yup__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_yup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_yup__);

__WEBPACK_IMPORTED_MODULE_0_yup___default.a.addMethod(__WEBPACK_IMPORTED_MODULE_0_yup___default.a.string, 'phone', function () {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Некорректный телефон';
  return this.test({
    name: 'phone',
    exclusive: true,
    message: msg,
    test: function test(value) {
      try {
        var isValid = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value);
        return isValid;
      } catch (e) {
        return false;
      }
    }
  });
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_yup___default.a);

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("formik");

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultState */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_utils__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__(11);
var _createReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var defaultState = {
  id: null,
  isActive: false,
  register: {
    isLoading: false,
    errors: {
      name: null,
      phone: null,
      email: null,
      password: null
    },
    fields: {
      name: null,
      phone: null,
      email: null,
      password: null
    }
  }
};

var create = function create(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], {});
};

var fail = function fail(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], payload.data);
};

var start = function start(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], true).setIn(['register', 'errors'], {});
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["a" /* createReducer */])(defaultState, (_createReducer = {}, _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_FAIL, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(fail, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(create, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(start, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _createReducer)));

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return taggedReducer; });
var createReducer = function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};
var taggedReducer = function taggedReducer(reducer, rName) {
  return function (state, action) {
    var name = action.name;
    var isInitializationCall = state === undefined;
    if (name !== rName && !isInitializationCall) return state;
    return reducer(state, action);
  };
};

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _callee;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history__ = __webpack_require__(22);
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchRegister),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(_callee);




 // The watcher: watch actions and coordinate worker tasks

function watchRegister(action) {
  var payload, name;
  return regeneratorRuntime.wrap(function watchRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, name = action.name;

          if (name === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"]) {
            __WEBPACK_IMPORTED_MODULE_3__history__["a" /* default */].push('/personal');
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, watchRegister);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension_developmentOnly__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__package_json__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createHelpers__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logger__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rootSagas__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rootReducer__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_seamless_immutable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_seamless_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_seamless_immutable__);










function configureStore(initialState, helpersConfig) {
  var helpers = Object(__WEBPACK_IMPORTED_MODULE_5__createHelpers__["a" /* default */])(helpersConfig);
  var sagaMiddleware = __WEBPACK_IMPORTED_MODULE_3_redux_saga___default()();
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers), sagaMiddleware];
  var enhancer;

  if (false) {
    middleware.push(createLogger()); // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production

    var composeEnhancers = composeWithDevTools({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: "".concat(name, "@").concat(version)
    }); // https://redux.js.org/docs/api/applyMiddleware.html

    enhancer = composeEnhancers(applyMiddleware.apply(void 0, middleware));
  } else {
    enhancer = __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(void 0, middleware);
  } // https://redux.js.org/docs/api/createStore.html


  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_8__rootReducer__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9_seamless_immutable___default()(initialState), enhancer); // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)

  if (false) {
    module.hot.accept('../reducers', function () {
      return (// eslint-disable-next-line global-require
        store.replaceReducer(require('../reducers').default)
      );
    });
  }

  sagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_7__rootSagas__["a" /* default */]);
  return store;
}

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension/developmentOnly");

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = {"name":"web","version":"0.0.0","private":true,"engines":{"node":">=6.5","npm":">=3.10"},"browserslist":[">1%","last 4 versions","Firefox ESR","not ie < 9"],"dependencies":{"@babel/plugin-transform-runtime":"^7.0.0-beta.42","@babel/polyfill":"7.0.0-beta.39","@babel/runtime":"^7.0.0-beta.42","antd":"^3.3.0","babel-plugin-import":"^1.6.7","babel-plugin-transform-runtime":"^6.23.0","bluebird":"^3.5.1","body-parser":"^1.18.2","classnames":"^2.2.5","cookie-parser":"^1.4.3","core-js":"^2.5.3","express":"^4.16.2","express-graphql":"^0.6.11","express-jwt":"^5.3.0","formik":"^0.11.11","graphql":"^0.12.3","history":"^4.7.2","isomorphic-style-loader":"^4.0.0","jsonwebtoken":"^8.1.0","lost":"^8.2.1","node-fetch":"^2.0.0","normalize.css":"^7.0.0","nuka-carousel":"^4.0.0","passport":"^0.4.0","passport-facebook":"^2.1.1","pretty-error":"^2.1.1","prop-types":"^15.6.0","query-string":"^5.0.1","rc-slider":"^8.6.1","react":"^16.2.0","react-dom":"^16.2.0","react-fontawesome":"^1.6.1","react-redux":"^5.0.6","react-select":"^1.2.1","react-svg-loader":"^2.1.0","react-tabs":"^2.2.1","react-treebeard":"^2.1.0","redux":"^3.7.2","redux-devtools-extension":"^2.13.2","redux-logger":"^3.0.6","redux-saga":"^0.16.0","redux-thunk":"^2.2.0","reselect":"^3.0.1","seamless-immutable":"^7.1.3","semantic-ui-react":"^0.78.3","sequelize":"^4.28.6","serialize-javascript":"^1.3.0","source-map-support":"^0.5.0","sqlite3":"^3.1.13","universal-router":"^6.0.0","whatwg-fetch":"^2.0.3","yup":"^0.24.1"},"devDependencies":{"@babel/core":"^7.0.0-beta.42","@babel/node":"7.0.0-beta.39","@babel/plugin-transform-react-constant-elements":"7.0.0-beta.39","@babel/plugin-transform-react-inline-elements":"7.0.0-beta.39","@babel/preset-env":"7.0.0-beta.39","@babel/preset-flow":"7.0.0-beta.39","@babel/preset-react":"7.0.0-beta.39","@babel/preset-stage-2":"7.0.0-beta.39","assets-webpack-plugin":"^3.5.1","autoprefixer":"^7.2.3","babel-core":"^7.0.0-0","babel-eslint":"^8.1.2","babel-jest":"^22.0.4","babel-loader":"8.0.0-beta.0","babel-plugin-transform-react-remove-prop-types":"^0.4.12","browser-sync":"^2.21.0","chokidar":"^2.0.0","css-loader":"^0.28.7","enzyme":"^3.2.0","eslint":"^4.14.0","eslint-config-airbnb":"^16.1.0","eslint-config-prettier":"^2.9.0","eslint-import-resolver-node":"^0.3.1","eslint-loader":"^1.9.0","eslint-plugin-css-modules":"^2.7.5","eslint-plugin-flowtype":"^2.40.1","eslint-plugin-import":"^2.8.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-prettier":"^2.4.0","eslint-plugin-react":"^7.5.1","file-loader":"^1.1.6","flow-bin":"^0.65.0","front-matter":"^2.3.0","glob":"^7.1.2","husky":"^0.14.3","identity-obj-proxy":"^3.0.0","jest":"^22.0.4","lint-staged":"^6.0.0","markdown-it":"^8.4.0","mkdirp":"^0.5.1","null-loader":"^0.1.1","opn-cli":"^3.1.0","pixrem":"^4.0.1","pleeease-filters":"^4.0.0","postcss":"^6.0.14","postcss-calc":"^6.0.1","postcss-color-function":"^4.0.1","postcss-custom-media":"^6.0.0","postcss-custom-properties":"^6.2.0","postcss-custom-selectors":"^4.0.1","postcss-flexbugs-fixes":"^3.2.0","postcss-import":"^11.0.0","postcss-loader":"^2.0.9","postcss-media-minmax":"^3.0.0","postcss-nested":"^3.0.0","postcss-nesting":"^4.2.1","postcss-pseudoelements":"^5.0.0","postcss-selector-matches":"^3.0.1","postcss-selector-not":"^3.0.1","prettier":"^1.9.2","raw-loader":"^0.5.1","react-deep-force-update":"^2.1.1","react-dev-utils":"^5.0.0","react-error-overlay":"^4.0.0","react-test-renderer":"^16.2.0","redux-mock-store":"^1.4.0","rimraf":"^2.6.2","stylelint":"^8.4.0","stylelint-config-standard":"^18.0.0","stylelint-order":"^0.8.0","svg-url-loader":"^2.3.1","url-loader":"^0.6.2","webpack":"^3.10.0","webpack-bundle-analyzer":"^2.9.1","webpack-dev-middleware":"^2.0.3","webpack-hot-middleware":"^2.21.0","webpack-node-externals":"^1.6.0"},"scripts":{"lint-js":"eslint --ignore-path .gitignore --ignore-pattern \"!**/.*\" .","lint-css":"stylelint \"src/**/*.{css,less,styl,scss,sass,sss}\"","lint":"yarn run lint-js && yarn run lint-css","fix-js":"yarn run lint-js --fix","fix-css":"yarn run lint-css --fix","fix":"yarn run fix-js && yarn run fix-css","check":"flow check","test":"jest","test-watch":"yarn run test --watch --notify","test-cover":"yarn run test --coverage","coverage":"yarn run test-cover && opn coverage/lcov-report/index.html","clean":"babel-node tools/run clean","copy":"babel-node tools/run copy","bundle":"babel-node tools/run bundle","build":"babel-node tools/run build","build-stats":"yarn run build --release --analyse","deploy":"babel-node tools/run deploy","render":"babel-node tools/run render","serve":"babel-node tools/run runServer","start":"babel-node tools/run start"}}

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function createGraphqlRequest(fetch) {
  return (
    /*#__PURE__*/
    function () {
      var _graphqlRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query, variables) {
        var fetchConfig, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: variables
                  }),
                  credentials: 'include'
                };
                _context.next = 3;
                return fetch('/graphql', fetchConfig);

              case 3:
                resp = _context.sent;

                if (!(resp.status !== 200)) {
                  _context.next = 6;
                  break;
                }

                throw new Error(resp.statusText);

              case 6:
                return _context.abrupt("return", resp.json());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function graphqlRequest(_x, _x2) {
        return _graphqlRequest.apply(this, arguments);
      };
    }()
  );
}

function createHelpers(_ref) {
  var fetch = _ref.fetch,
      history = _ref.history;
  return {
    fetch: fetch,
    history: history,
    graphqlRequest: createGraphqlRequest(fetch)
  };
}

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);


function inspectObject(object) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

var actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: function APOLLO_QUERY_INIT(a) {
    return "queryId:".concat(a.queryId, " variables:").concat(inspectObject(a.variables), "\n   ").concat(singleLine(a.queryString));
  },
  APOLLO_QUERY_RESULT: function APOLLO_QUERY_RESULT(a) {
    return "queryId:".concat(a.queryId, "\n   ").concat(singleLine(inspectObject(a.result)));
  },
  APOLLO_QUERY_STOP: function APOLLO_QUERY_STOP(a) {
    return "queryId:".concat(a.queryId);
  }
}; // Server side redux action logger

function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return function (store) {
    return function (next) {
      return function (action) {
        var formattedPayload = '';
        var actionFormatter = actionFormatters[action.type];

        if (typeof actionFormatter === 'function') {
          formattedPayload = actionFormatter(action);
        } else if (action.toString !== Object.prototype.toString) {
          formattedPayload = action.toString();
        } else if (typeof action.payload !== 'undefined') {
          formattedPayload = inspectObject(action.payload);
        } else {
          formattedPayload = inspectObject(action);
        }

        console.log(" * ".concat(action.type, ": ").concat(formattedPayload)); // eslint-disable-line no-console

        return next(action);
      };
    };
  };
}

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_User__ = __webpack_require__(12);
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);




function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["all"])([__WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].saga(), __WEBPACK_IMPORTED_MODULE_2_modules_User__["b" /* default */].saga()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_User__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  user: __WEBPACK_IMPORTED_MODULE_1_modules_User__["b" /* default */].reducer
}));

/***/ }),
/* 151 */,
/* 152 */
/***/ (function(module, exports) {

module.exports = require("rc-slider");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("react-treebeard");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("react-select");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map