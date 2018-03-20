require("source-map-support").install();
exports.ids = [0];
exports.modules = {

/***/ 120:
/*!**************************************!*\
  !*** ./src/routes/products/index.js ***!
  \**************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Products__ = __webpack_require__(/*! ./Products */ 131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(/*! ../../components/Layout */ 19);
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

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1__Products__["a" /* default */], {}));

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
              component: _ref2
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

/***/ 131:
/*!*****************************************!*\
  !*** ./src/routes/products/Products.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Container__ = __webpack_require__(/*! components/Container */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Breadcrumbs__ = __webpack_require__(/*! components/Breadcrumbs */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_SpecialProducts__ = __webpack_require__(/*! components/SpecialProducts */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_modules_Filters_components__ = __webpack_require__(/*! modules/Filters/components */ 138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_CardGrid__ = __webpack_require__(/*! components/CardGrid */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Select__ = __webpack_require__(/*! components/Select */ 159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Products_css__ = __webpack_require__(/*! ./Products.css */ 164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Products_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Products_css__);
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











var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_6_modules_Filters_components__["a" /* default */], {});

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_8_components_Select__["a" /* default */], {});

var Products =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Products, _React$Component);

  function Products() {
    _classCallCheck(this, Products);

    return _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).apply(this, arguments));
  }

  _createClass(Products, [{
    key: "render",
    value: function render() {
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.root
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_components_Breadcrumbs__["a" /* default */], {
        list: [{
          txt: 'Home',
          to: '/'
        }, {
          txt: 'Shop',
          to: '/shop'
        }]
      }), _jsx(__WEBPACK_IMPORTED_MODULE_5_components_SpecialProducts__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.specials
        }
      }), _jsx(__WEBPACK_IMPORTED_MODULE_3_components_Container__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.container
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.filters
      }, void 0, _ref), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.grid
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__Products_css___default.a.sortingList
      }, void 0, _ref2), _jsx(__WEBPACK_IMPORTED_MODULE_7_components_CardGrid__["a" /* default */], {
        gridCount: "item-3",
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
          labelTxt: 'Out of Stock',
          labelType: 'stock'
        }, {
          name: 'Aiaiai TMA-1 Studio',
          brand: 'Headphones,Studio',
          price: '$125',
          labelTxt: 'New',
          labelType: 'tape'
        }]
      }))));
    }
  }]);

  return Products;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_9__Products_css___default.a)(Products));

/***/ }),

/***/ 132:
/*!***************************************************!*\
  !*** ./src/components/Breadcrumbs/Breadcrumbs.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__(/*! ../Link */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__(/*! components/Container */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_fontawesome__ = __webpack_require__(/*! react-fontawesome */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css__ = __webpack_require__(/*! ./Breadcrumbs.css */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }










var Breadcrumbs = function Breadcrumbs(_ref) {
  var list = _ref.list;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.root
  }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {}, void 0, _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.list
  }, void 0, list.map(function (item, i) {
    if (i < list.length - 1) {
      return _jsx("li", {
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.item
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
        to: item.to,
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.link
      }, void 0, item.txt), _jsx(__WEBPACK_IMPORTED_MODULE_6_react_fontawesome___default.a, {
        name: "long-arrow-right",
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.arrow
      }));
    }

    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.item
    }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
      to: item.to,
      className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.link
    }, void 0, item.txt));
  }))));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a)(Breadcrumbs));

/***/ }),

/***/ 133:
/*!****************************************************!*\
  !*** ./src/components/Breadcrumbs/Breadcrumbs.css ***!
  \****************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Breadcrumbs.css */ 134);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Breadcrumbs.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Breadcrumbs.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 134:
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css ***!
  \************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._1_JgR{background-color:#f1f3f7;margin-bottom:80px}._3-b3p{min-height:63px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start}._29dRo{margin-left:18px;margin-right:18px}._103LO{color:#333;font-family:Poppins,sans-serif;font-size:15px;font-weight:400;line-height:24px}._103LO:hover{text-decoration:underline}", ""]);

// exports
exports.locals = {
	"root": "_1_JgR",
	"list": "_3-b3p",
	"item": "K2F3w",
	"arrow": "_29dRo",
	"link": "_103LO"
};

/***/ }),

/***/ 135:
/*!***********************************************************!*\
  !*** ./src/components/SpecialProducts/SpecialProducts.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_fontawesome__ = __webpack_require__(/*! react-fontawesome */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__(/*! components/Container */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Link__ = __webpack_require__(/*! components/Link */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css__ = __webpack_require__(/*! ./SpecialProducts.css */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }










var SpecialProducts = function SpecialProducts(_ref) {
  var list = _ref.list,
      classes = _ref.classes;
  return _jsx(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {}, void 0, _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()([__WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.root, classes.root])
  }, void 0, list.map(function (item) {
    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.item
    }, void 0, _jsx("h3", {
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.title
    }, void 0, item.title), _jsx("p", {
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.descr
    }, void 0, item.descr), _jsx("footer", {
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.footer
    }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_4_react_fontawesome___default.a, {
      name: "play",
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.icon
    }), _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Link__["a" /* default */], {
      to: item.to,
      className: __WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a.link
    }, void 0, item.link)));
  })));
};

SpecialProducts.defaultProps = {
  classes: {
    root: ''
  },
  list: [{
    title: 'Formal Shoes',
    descr: 'Buying Guide',
    to: '/',
    link: 'Learn More'
  }, {
    title: 'Formal Shoes',
    descr: 'Buying Guide',
    to: '/',
    link: 'Learn More'
  }, {
    title: 'Formal Shoes',
    descr: 'Buying Guide',
    to: '/',
    link: 'Learn More'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__SpecialProducts_css___default.a)(SpecialProducts));

/***/ }),

/***/ 136:
/*!************************************************************!*\
  !*** ./src/components/SpecialProducts/SpecialProducts.css ***!
  \************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!./SpecialProducts.css */ 137);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./SpecialProducts.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./SpecialProducts.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 137:
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/components/SpecialProducts/SpecialProducts.css ***!
  \********************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, ".VDt4x{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:start;align-items:flex-start}._2Inb2{padding:52px 0 0 30px;min-height:247px;width:calc(33.3% - 20px);background-color:#f1f3f7}._2Inb2:nth-child(1n){float:left;margin-right:30px;clear:none}._2Inb2:last-child{margin-right:0}._2Inb2:nth-child(3n){margin-right:0;float:right}._2Inb2:nth-child(3n+1){clear:both}._1VEC2,._1vUcq,.TeVfA{color:#333;font-family:Poppins,sans-serif}._1VEC2{margin-top:0;margin-bottom:0;font-size:26px;font-weight:400;line-height:24px;text-transform:uppercase}._1vUcq{margin-bottom:30px;font-size:15px;font-weight:400;line-height:30px;letter-spacing:.15px}._1CjgN{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start}.NbNGh{display:inline-block;margin-right:10px}.TeVfA{font-size:15px;font-weight:400;line-height:30px;letter-spacing:.15px}", ""]);

// exports
exports.locals = {
	"root": "VDt4x",
	"item": "_2Inb2",
	"title": "_1VEC2",
	"descr": "_1vUcq",
	"link": "TeVfA",
	"footer": "_1CjgN",
	"icon": "NbNGh"
};

/***/ }),

/***/ 138:
/*!*************************************************!*\
  !*** ./src/modules/Filters/components/index.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Range__ = __webpack_require__(/*! ./Range */ 139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Tags__ = __webpack_require__(/*! ./Tags */ 144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Colors__ = __webpack_require__(/*! ./Colors */ 147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Header__ = __webpack_require__(/*! ./Header */ 150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Categories__ = __webpack_require__(/*! ./Categories */ 153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Filters_css__ = __webpack_require__(/*! ./Filters.css */ 157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Filters_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Filters_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_5__Header__["a" /* default */], {
  title: "Filter Categories"
});

var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_6__Categories__["a" /* default */], {});

var _ref3 = _jsx(__WEBPACK_IMPORTED_MODULE_6__Categories__["a" /* default */], {});

var _ref4 = _jsx(__WEBPACK_IMPORTED_MODULE_6__Categories__["a" /* default */], {});

var _ref5 = _jsx(__WEBPACK_IMPORTED_MODULE_5__Header__["a" /* default */], {
  title: "Filter by Price"
});

var _ref6 = _jsx(__WEBPACK_IMPORTED_MODULE_2__Range__["a" /* default */], {});

var _ref7 = _jsx(__WEBPACK_IMPORTED_MODULE_5__Header__["a" /* default */], {
  title: "Filter Colors"
});

var _ref8 = _jsx(__WEBPACK_IMPORTED_MODULE_4__Colors__["a" /* default */], {});

var _ref9 = _jsx(__WEBPACK_IMPORTED_MODULE_5__Header__["a" /* default */], {
  title: "Product Tags"
});

var _ref10 = _jsx(__WEBPACK_IMPORTED_MODULE_3__Tags__["a" /* default */], {});

var Filters =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Filters, _PureComponent);

  function Filters() {
    _classCallCheck(this, Filters);

    return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
  }

  _createClass(Filters, [{
    key: "render",
    value: function render() {
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a.root
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a.categories
      }, void 0, _ref, _ref2, _ref3, _ref4), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a.range
      }, void 0, _ref5, _ref6), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a.colors
      }, void 0, _ref7, _ref8), _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a.tags
      }, void 0, _ref9, _ref10));
    }
  }]);

  return Filters;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Filters_css___default.a)(Filters));

/***/ }),

/***/ 139:
/*!*******************************************************!*\
  !*** ./src/modules/Filters/components/Range/Range.js ***!
  \*******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider__ = __webpack_require__(/*! rc-slider */ 121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_slider_assets_index_css__ = __webpack_require__(/*! rc-slider/assets/index.css */ 140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Button__ = __webpack_require__(/*! components/Button */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Range_css__ = __webpack_require__(/*! ./Range.css */ 142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Range_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Range_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }










var _ref2 = _jsx(__WEBPACK_IMPORTED_MODULE_6_components_Button__["a" /* default */], {
  theme: "black"
}, void 0, "Filter");

var R = function R(_ref) {
  var from = _ref.from,
      to = _ref.to;
  return _jsx("div", {
    className: __WEBPACK_IMPORTED_MODULE_7__Range_css___default.a.root
  }, void 0, _jsx("p", {
    className: __WEBPACK_IMPORTED_MODULE_7__Range_css___default.a.label
  }, void 0, "Price ", from, " - ", to), _jsx(__WEBPACK_IMPORTED_MODULE_4_rc_slider__["Range"], {
    className: __WEBPACK_IMPORTED_MODULE_7__Range_css___default.a.range,
    handleStyle: [{
      backgroundColor: 'black',
      borderColor: 'black'
    }, {
      backgroundColor: 'black',
      borderColor: 'black'
    }],
    trackStyle: [{
      backgroundColor: 'black',
      height: '3px'
    }],
    min: 0,
    max: 5000
  }), _ref2);
};

R.defaultProps = {
  to: 10,
  from: 0
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Range_css___default.a, __WEBPACK_IMPORTED_MODULE_5_rc_slider_assets_index_css___default.a)(R));

/***/ }),

/***/ 140:
/*!*************************************************!*\
  !*** ./node_modules/rc-slider/assets/index.css ***!
  \*************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../css-loader??ref--1-rules-1!../../postcss-loader/lib??ref--1-rules-3!./index.css */ 141);
    var insertCss = __webpack_require__(/*! ../../isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../css-loader/index.js??ref--1-rules-1!../../postcss-loader/lib/index.js??ref--1-rules-3!./index.css", function() {
        content = require("!!../../css-loader/index.js??ref--1-rules-1!../../postcss-loader/lib/index.js??ref--1-rules-3!./index.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 141:
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-1!./node_modules/postcss-loader/lib??ref--1-rules-3!./node_modules/rc-slider/assets/index.css ***!
  \*********************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, ".rc-slider{position:relative;height:14px;padding:5px 0;width:100%;border-radius:6px;-ms-touch-action:none;touch-action:none}.rc-slider,.rc-slider *{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.rc-slider-rail{width:100%;background-color:#e9e9e9}.rc-slider-rail,.rc-slider-track{position:absolute;height:4px;border-radius:6px}.rc-slider-track{left:0;background-color:#abe2fb}.rc-slider-handle{position:absolute;margin-left:-7px;margin-top:-5px;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;cursor:grab;border-radius:50%;border:2px solid #96dbfa;background-color:#fff;-ms-touch-action:pan-x;touch-action:pan-x}.rc-slider-handle:hover{border-color:#57c5f7}.rc-slider-handle:active{border-color:#57c5f7;-webkit-box-shadow:0 0 5px #57c5f7;box-shadow:0 0 5px #57c5f7;cursor:-webkit-grabbing;cursor:grabbing}.rc-slider-handle:focus{border-color:#57c5f7;-webkit-box-shadow:0 0 0 5px #96dbfa;box-shadow:0 0 0 5px #96dbfa;outline:none}.rc-slider-mark{position:absolute;top:18px;left:0;width:100%;font-size:12px}.rc-slider-mark-text{position:absolute;display:inline-block;vertical-align:middle;text-align:center;cursor:pointer;color:#999}.rc-slider-mark-text-active{color:#666}.rc-slider-step{position:absolute;width:100%;height:4px;background:transparent}.rc-slider-dot{position:absolute;bottom:-2px;margin-left:-4px;width:8px;height:8px;border:2px solid #e9e9e9;background-color:#fff;cursor:pointer;border-radius:50%;vertical-align:middle}.rc-slider-dot-active{border-color:#96dbfa}.rc-slider-disabled{background-color:#e9e9e9}.rc-slider-disabled .rc-slider-track{background-color:#ccc}.rc-slider-disabled .rc-slider-dot,.rc-slider-disabled .rc-slider-handle{border-color:#ccc;-webkit-box-shadow:none;box-shadow:none;background-color:#fff;cursor:not-allowed}.rc-slider-disabled .rc-slider-dot,.rc-slider-disabled .rc-slider-mark-text{cursor:not-allowed!important}.rc-slider-vertical{width:14px;height:100%;padding:0 5px}.rc-slider-vertical .rc-slider-rail{height:100%;width:4px}.rc-slider-vertical .rc-slider-track{left:5px;bottom:0;width:4px}.rc-slider-vertical .rc-slider-handle{margin-left:-5px;margin-bottom:-7px;-ms-touch-action:pan-y;touch-action:pan-y}.rc-slider-vertical .rc-slider-mark{top:0;left:18px;height:100%}.rc-slider-vertical .rc-slider-step{height:100%;width:4px}.rc-slider-vertical .rc-slider-dot{left:2px;margin-bottom:-4px}.rc-slider-vertical .rc-slider-dot:first-child,.rc-slider-vertical .rc-slider-dot:last-child{margin-bottom:-4px}.rc-slider-tooltip-zoom-down-appear,.rc-slider-tooltip-zoom-down-enter,.rc-slider-tooltip-zoom-down-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;display:block!important;-webkit-animation-play-state:paused;animation-play-state:paused}.rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active,.rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active{-webkit-animation-name:rcSliderTooltipZoomDownIn;animation-name:rcSliderTooltipZoomDownIn;-webkit-animation-play-state:running;animation-play-state:running}.rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active{-webkit-animation-name:rcSliderTooltipZoomDownOut;animation-name:rcSliderTooltipZoomDownOut;-webkit-animation-play-state:running;animation-play-state:running}.rc-slider-tooltip-zoom-down-appear,.rc-slider-tooltip-zoom-down-enter{-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);-webkit-animation-timing-function:cubic-bezier(.23,1,.32,1);animation-timing-function:cubic-bezier(.23,1,.32,1)}.rc-slider-tooltip-zoom-down-leave{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06)}@-webkit-keyframes rcSliderTooltipZoomDownIn{0%{opacity:0;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(1);transform:scale(1)}}@keyframes rcSliderTooltipZoomDownIn{0%{opacity:0;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes rcSliderTooltipZoomDownOut{0%{-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(0);transform:scale(0)}}@keyframes rcSliderTooltipZoomDownOut{0%{-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(1);transform:scale(1)}to{opacity:0;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-transform:scale(0);transform:scale(0)}}.rc-slider-tooltip{position:absolute;left:-9999px;top:-9999px;visibility:visible}.rc-slider-tooltip,.rc-slider-tooltip *{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.rc-slider-tooltip-hidden{display:none}.rc-slider-tooltip-placement-top{padding:4px 0 8px}.rc-slider-tooltip-inner{padding:6px 2px;min-width:24px;height:24px;font-size:12px;line-height:1;color:#fff;text-align:center;text-decoration:none;background-color:#6c6c6c;border-radius:6px;-webkit-box-shadow:0 0 4px #d9d9d9;box-shadow:0 0 4px #d9d9d9}.rc-slider-tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow{bottom:4px;left:50%;margin-left:-4px;border-width:4px 4px 0;border-top-color:#6c6c6c}", ""]);

// exports


/***/ }),

/***/ 142:
/*!********************************************************!*\
  !*** ./src/modules/Filters/components/Range/Range.css ***!
  \********************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Range.css */ 143);
    var insertCss = __webpack_require__(/*! ../../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Range.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Range.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 143:
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Range/Range.css ***!
  \****************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._2pLM7{text-align:center}._2-1rx{margin-bottom:15px}.Wnzyb{margin-top:0;text-align:center;color:#333;font-family:Poppins,sans-serif;font-size:15px;font-weight:400;line-height:1;letter-spacing:.15px}", ""]);

// exports
exports.locals = {
	"root": "_2pLM7",
	"range": "_2-1rx",
	"label": "Wnzyb",
	"btn": "_1CXeY"
};

/***/ }),

/***/ 144:
/*!*****************************************************!*\
  !*** ./src/modules/Filters/components/Tags/Tags.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Tags_css__ = __webpack_require__(/*! ./Tags.css */ 145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Tags_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Tags_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Tags = function Tags(_ref) {
  var tags = _ref.tags;
  return _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_4__Tags_css___default.a.root
  }, void 0, tags.map(function (item) {
    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_4__Tags_css___default.a.tag
    }, void 0, item.txt);
  }));
};

Tags.defaultProps = {
  tags: [{
    txt: 'Contemporary'
  }, {
    txt: 'Classic'
  }, {
    txt: 'Decor'
  }, {
    txt: 'Minimal'
  }, {
    txt: 'Essentials'
  }, {
    txt: 'Lighting'
  }, {
    txt: 'Kitchen'
  }, {
    txt: 'Prectical'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Tags_css___default.a)(Tags));

/***/ }),

/***/ 145:
/*!******************************************************!*\
  !*** ./src/modules/Filters/components/Tags/Tags.css ***!
  \******************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Tags.css */ 146);
    var insertCss = __webpack_require__(/*! ../../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Tags.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Tags.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 146:
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Tags/Tags.css ***!
  \**************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._2o3Sl{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-left:-10px;margin-right:-10px}._3GbmW{display:inline-block;margin-left:10px;margin-bottom:10px;padding:12px 15px;background-color:#000;color:#fff;font-family:Poppins,sans-serif;font-size:14px;font-weight:300;line-height:1;letter-spacing:.14px}", ""]);

// exports
exports.locals = {
	"root": "_2o3Sl",
	"tag": "_3GbmW"
};

/***/ }),

/***/ 147:
/*!*********************************************************!*\
  !*** ./src/modules/Filters/components/Colors/Colors.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Colors_css__ = __webpack_require__(/*! ./Colors.css */ 148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Colors_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Colors_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Colors = function Colors(_ref) {
  var colors = _ref.colors;
  return _jsx("ul", {
    className: __WEBPACK_IMPORTED_MODULE_4__Colors_css___default.a.root
  }, void 0, colors.map(function (item) {
    return _jsx("li", {
      className: __WEBPACK_IMPORTED_MODULE_4__Colors_css___default.a.color
    }, void 0, _jsx("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__Colors_css___default.a.circle,
      style: {
        backgroundColor: item.color
      }
    }), _jsx("span", {
      className: __WEBPACK_IMPORTED_MODULE_4__Colors_css___default.a.label
    }, void 0, item.label));
  }));
};

Colors.defaultProps = {
  colors: [{
    color: 'black',
    label: 'Black'
  }, {
    color: 'blue',
    label: 'Blue'
  }, {
    color: 'brown',
    label: 'Brown'
  }, {
    color: 'green',
    label: 'Green'
  }]
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Colors_css___default.a)(Colors));

/***/ }),

/***/ 148:
/*!**********************************************************!*\
  !*** ./src/modules/Filters/components/Colors/Colors.css ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Colors.css */ 149);
    var insertCss = __webpack_require__(/*! ../../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Colors.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Colors.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 149:
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Colors/Colors.css ***!
  \******************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._2clOl{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:20px;cursor:pointer;-ms-flex-pack:start;justify-content:flex-start}._2clOl:last-child{margin-bottom:0}.rkLuY{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:10px}._1C-x-{font-family:Poppins,sans-serif;font-size:15px;font-weight:400;line-height:1;letter-spacing:.15px}", ""]);

// exports
exports.locals = {
	"root": "_2igpO",
	"color": "_2clOl",
	"circle": "rkLuY",
	"label": "_1C-x-"
};

/***/ }),

/***/ 150:
/*!*********************************************************!*\
  !*** ./src/modules/Filters/components/Header/Header.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Header_css__ = __webpack_require__(/*! ./Header.css */ 151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Header_css__);
var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }







var Header = function Header(_ref) {
  var title = _ref.title;
  return _jsx("header", {
    className: __WEBPACK_IMPORTED_MODULE_4__Header_css___default.a.root
  }, void 0, _jsx("h3", {
    className: __WEBPACK_IMPORTED_MODULE_4__Header_css___default.a.title
  }, void 0, title), _jsx("span", {
    className: __WEBPACK_IMPORTED_MODULE_4__Header_css___default.a.devider
  }));
};

Header.defaultProps = {
  title: ''
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Header_css___default.a)(Header));

/***/ }),

/***/ 151:
/*!**********************************************************!*\
  !*** ./src/modules/Filters/components/Header/Header.css ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Header.css */ 152);
    var insertCss = __webpack_require__(/*! ../../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Header.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Header.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 152:
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Header/Header.css ***!
  \******************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._2aN4d{margin-bottom:28px}.mktsI{margin-bottom:10px;margin-top:0;color:#333;font-family:Poppins,sans-serif;font-size:18px;font-weight:500;line-height:24px}.Op--I{display:block;width:61px;height:1px;background-color:#000}", ""]);

// exports
exports.locals = {
	"root": "_2aN4d",
	"title": "mktsI",
	"devider": "Op--I"
};

/***/ }),

/***/ 153:
/*!*****************************************************************!*\
  !*** ./src/modules/Filters/components/Categories/Categories.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_treebeard__ = __webpack_require__(/*! react-treebeard */ 122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_treebeard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_treebeard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__theme__ = __webpack_require__(/*! ./theme */ 154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Categories_css__ = __webpack_require__(/*! ./Categories.css */ 155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Categories_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Categories_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }








var data = {
  name: 'Canvas Basket',
  toggled: false,
  children: [{
    name: 'Canvas Basket',
    children: [{
      name: 'Canvas Basket'
    }, {
      name: 'Canvas Basket'
    }]
  }, {
    name: 'Canvas Basket',
    children: [{
      name: 'Canvas Basket',
      children: [{
        name: 'Canvas Basket'
      }, {
        name: 'Canvas Basket'
      }]
    }]
  }]
};

var Categories =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Categories, _React$Component);

  function Categories() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Categories);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Categories.__proto__ || Object.getPrototypeOf(Categories)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    }), Object.defineProperty(_assertThisInitialized(_this), "onToggle", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node, toggled) {
        if (_this.state.cursor) {
          _this.state.cursor.active = false;
        }

        node.active = true;

        if (node.children) {
          node.toggled = toggled;
        }

        _this.setState({
          cursor: node
        });
      }
    }), _temp));
  }

  _createClass(Categories, [{
    key: "render",
    value: function render() {
      var decorators = {
        Loading: function Loading(props) {
          return _jsx("div", {
            style: props.style
          }, void 0, "loading...");
        },
        Toggle: function Toggle(props) {
          return _jsx("div", {
            style: props.style
          }, void 0, _jsx("svg", {
            height: props.height,
            width: props.width
          }, void 0, "// Vector Toggle Here"));
        },
        Header: function Header(props) {
          return _jsx("div", {
            style: props.style
          }, void 0, props.node.name);
        },
        Container: function Container(props) {
          return _jsx("div", {
            onClick: props.onClick,
            className: __WEBPACK_IMPORTED_MODULE_6__Categories_css___default.a.link
          }, void 0, "+ ", props.node.name);
        }
      };
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_6__Categories_css___default.a.root
      }, void 0, _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_6__Categories_css___default.a.category
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_3_react_treebeard__["Treebeard"], {
        style: __WEBPACK_IMPORTED_MODULE_4__theme__["a" /* default */],
        data: data,
        onToggle: this.onToggle,
        decorators: decorators
      })));
    }
  }]);

  return Categories;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_6__Categories_css___default.a)(Categories));

/***/ }),

/***/ 154:
/*!************************************************************!*\
  !*** ./src/modules/Filters/components/Categories/theme.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      color: '#333333',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '15px',
      textTransform: 'capitalize'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        lineHeight: '40px',
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#fff'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#333333',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#333333'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
});

/***/ }),

/***/ 155:
/*!******************************************************************!*\
  !*** ./src/modules/Filters/components/Categories/Categories.css ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Categories.css */ 156);
    var insertCss = __webpack_require__(/*! ../../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Categories.css", function() {
        content = require("!!../../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Categories.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 156:
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Categories/Categories.css ***!
  \**************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._2UkMs,._2XUcZ ul{background-color:#fff}._3uRAU{cursor:pointer;margin-bottom:20px;color:#333;font-family:Poppins,sans-serif;font-size:15px;font-weight:400;line-height:1;letter-spacing:.15px}", ""]);

// exports
exports.locals = {
	"container": "_2UkMs",
	"tree": "_2XUcZ",
	"link": "_3uRAU"
};

/***/ }),

/***/ 157:
/*!****************************************************!*\
  !*** ./src/modules/Filters/components/Filters.css ***!
  \****************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--1-rules-2!../../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Filters.css */ 158);
    var insertCss = __webpack_require__(/*! ../../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Filters.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Filters.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 158:
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/modules/Filters/components/Filters.css ***!
  \************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._1grA6{padding-bottom:90px}._3Zvnk{margin-bottom:60px}._1VEB2,._2adpT{margin-bottom:50px}", ""]);

// exports
exports.locals = {
	"root": "_1grA6",
	"range": "_3Zvnk",
	"colors": "_1VEB2",
	"categories": "_2adpT"
};

/***/ }),

/***/ 159:
/*!*****************************************!*\
  !*** ./src/components/Select/Select.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(/*! classnames */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Select_css__ = __webpack_require__(/*! ./Select.css */ 160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Select_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Select_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_select__ = __webpack_require__(/*! react-select */ 123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_select_dist_react_select_css__ = __webpack_require__(/*! react-select/dist/react-select.css */ 162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_select_dist_react_select_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_select_dist_react_select_css__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }









var S =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(S, _React$PureComponent);

  function S() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, S);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = S.__proto__ || Object.getPrototypeOf(S)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        selectedOption: ''
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(selectedOption) {
        _this.setState({
          selectedOption: selectedOption
        });

        console.log("Selected: ".concat(selectedOption.label));
      }
    }), _temp));
  }

  _createClass(S, [{
    key: "render",
    value: function render() {
      var selectedOption = this.state.selectedOption;
      var value = selectedOption && selectedOption.value;
      return _jsx("div", {
        className: __WEBPACK_IMPORTED_MODULE_4__Select_css___default.a.root
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_5_react_select___default.a, {
        className: __WEBPACK_IMPORTED_MODULE_4__Select_css___default.a.select,
        clearable: false,
        menuStyle: {
          backgroundColor: 'white',
          padding: '20px 0 17px 0'
        },
        optionClassName: __WEBPACK_IMPORTED_MODULE_4__Select_css___default.a.option,
        value: value,
        onChange: this.handleChange,
        options: [{
          value: 'Sort By Popularity',
          label: 'Sort By Popularity'
        }, {
          value: 'Sort by Average Rating',
          label: 'Sort by Average Rating'
        }, {
          value: 'Sort by Newness',
          label: 'Sort by Newness'
        }, {
          value: 'Sort by Price: Low to High',
          label: 'Sort by Price: Low to High'
        }, {
          value: 'Sort by Price: High to Low',
          label: 'Sort by Price: High to Low'
        }]
      }));
    }
  }]);

  return S;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__Select_css___default.a, __WEBPACK_IMPORTED_MODULE_6_react_select_dist_react_select_css___default.a)(S));

/***/ }),

/***/ 160:
/*!******************************************!*\
  !*** ./src/components/Select/Select.css ***!
  \******************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Select.css */ 161);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Select.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Select.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 161:
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/components/Select/Select.css ***!
  \**************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._1q0ts{width:100%;color:#555;font-family:Poppins,sans-serif;background-color:#fff;font-size:14px;font-weight:300;line-height:35px;padding-right:27px;padding-left:12px;letter-spacing:.14px}._3b4Iw{outline:none!important}._3b4Iw:active,._3b4Iw:focus{outline:none}", ""]);

// exports
exports.locals = {
	"option": "_1q0ts",
	"select": "_3b4Iw"
};

/***/ }),

/***/ 162:
/*!*********************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.css ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../css-loader??ref--1-rules-1!../../postcss-loader/lib??ref--1-rules-3!./react-select.css */ 163);
    var insertCss = __webpack_require__(/*! ../../isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../css-loader/index.js??ref--1-rules-1!../../postcss-loader/lib/index.js??ref--1-rules-3!./react-select.css", function() {
        content = require("!!../../css-loader/index.js??ref--1-rules-1!../../postcss-loader/lib/index.js??ref--1-rules-3!./react-select.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 163:
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-1!./node_modules/postcss-loader/lib??ref--1-rules-3!./node_modules/react-select/dist/react-select.css ***!
  \*****************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, ".Select{position:relative}.Select input::-webkit-contacts-auto-fill-button,.Select input::-webkit-credentials-auto-fill-button{display:none!important}.Select input::-ms-clear,.Select input::-ms-reveal{display:none!important}.Select,.Select div,.Select input,.Select span{-webkit-box-sizing:border-box;box-sizing:border-box}.Select.is-disabled .Select-arrow-zone{cursor:default;pointer-events:none;opacity:.35}.Select.is-disabled>.Select-control{background-color:#f9f9f9}.Select.is-disabled>.Select-control:hover{-webkit-box-shadow:none;box-shadow:none}.Select.is-open>.Select-control{border-bottom-right-radius:0;border-bottom-left-radius:0;background:#fff;border-color:#b3b3b3 #ccc #d9d9d9}.Select.is-open>.Select-control .Select-arrow{top:-2px;border-color:transparent transparent #999;border-width:0 5px 5px}.Select.is-searchable.is-focused:not(.is-open)>.Select-control,.Select.is-searchable.is-open>.Select-control{cursor:text}.Select.is-focused>.Select-control{background:#fff}.Select.is-focused:not(.is-open)>.Select-control{border-color:#007eff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 3px rgba(0,126,255,.1);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 3px rgba(0,126,255,.1);background:#fff}.Select.has-value.is-clearable.Select--single>.Select-control .Select-value{padding-right:42px}.Select.has-value.is-pseudo-focused.Select--single>.Select-control .Select-value .Select-value-label,.Select.has-value.Select--single>.Select-control .Select-value .Select-value-label{color:#333}.Select.has-value.is-pseudo-focused.Select--single>.Select-control .Select-value a.Select-value-label,.Select.has-value.Select--single>.Select-control .Select-value a.Select-value-label{cursor:pointer;text-decoration:none}.Select.has-value.is-pseudo-focused.Select--single>.Select-control .Select-value a.Select-value-label:focus,.Select.has-value.is-pseudo-focused.Select--single>.Select-control .Select-value a.Select-value-label:hover,.Select.has-value.Select--single>.Select-control .Select-value a.Select-value-label:focus,.Select.has-value.Select--single>.Select-control .Select-value a.Select-value-label:hover{color:#007eff;outline:none;text-decoration:underline}.Select.has-value.is-pseudo-focused.Select--single>.Select-control .Select-value a.Select-value-label:focus,.Select.has-value.Select--single>.Select-control .Select-value a.Select-value-label:focus{background:#fff}.Select.has-value.is-pseudo-focused .Select-input{opacity:0}.Select.is-open .Select-arrow,.Select .Select-arrow-zone:hover>.Select-arrow{border-top-color:#666}.Select.Select--rtl{direction:rtl;text-align:right}.Select-control{background-color:#fff;border-color:#d9d9d9 #ccc #b3b3b3;border-radius:4px;border:1px solid #ccc;color:#333;cursor:default;display:table;border-spacing:0;border-collapse:separate;height:36px;outline:none;overflow:hidden;position:relative;width:100%}.Select-control:hover{-webkit-box-shadow:0 1px 0 rgba(0,0,0,.06);box-shadow:0 1px 0 rgba(0,0,0,.06)}.Select-control .Select-input:focus{outline:none;background:#fff}.Select--single>.Select-control .Select-value,.Select-placeholder{bottom:0;color:#aaa;left:0;line-height:34px;padding-left:10px;padding-right:10px;position:absolute;right:0;top:0;max-width:100%;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.Select-input{height:34px;padding-left:10px;padding-right:10px;vertical-align:middle}.Select-input>input{width:100%;background:none transparent;border:0 none;-webkit-box-shadow:none;box-shadow:none;cursor:default;display:inline-block;font-family:inherit;font-size:inherit;margin:0;outline:none;line-height:17px;padding:8px 0 12px;-webkit-appearance:none}.is-focused .Select-input>input{cursor:text}.has-value.is-pseudo-focused .Select-input{opacity:0}.Select-control:not(.is-searchable)>.Select-input{outline:none}.Select-loading-zone{cursor:pointer;display:table-cell;text-align:center}.Select-loading,.Select-loading-zone{position:relative;vertical-align:middle;width:16px}.Select-loading{-webkit-animation:Select-animation-spin .4s infinite linear;animation:Select-animation-spin .4s infinite linear;height:16px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50%;border:2px solid #ccc;border-right-color:#333;display:inline-block}.Select-clear-zone{-webkit-animation:Select-animation-fadeIn .2s;animation:Select-animation-fadeIn .2s;color:#999;cursor:pointer;display:table-cell;position:relative;text-align:center;vertical-align:middle;width:17px}.Select-clear-zone:hover{color:#d0021b}.Select-clear{display:inline-block;font-size:18px;line-height:1}.Select--multi .Select-clear-zone{width:17px}.Select-arrow-zone{cursor:pointer;display:table-cell;position:relative;text-align:center;vertical-align:middle;width:25px;padding-right:5px}.Select--rtl .Select-arrow-zone{padding-right:0;padding-left:5px}.Select-arrow{border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 2.5px;display:inline-block;height:0;width:0;position:relative}.Select-control>:last-child{padding-right:5px}.Select--multi .Select-multi-value-wrapper{display:inline-block}.Select .Select-aria-only{position:absolute;display:inline-block;height:1px;width:1px;margin:-1px;clip:rect(0,0,0,0);overflow:hidden;float:left}@-webkit-keyframes Select-animation-fadeIn{0%{opacity:0}to{opacity:1}}@keyframes Select-animation-fadeIn{0%{opacity:0}to{opacity:1}}.Select-menu-outer{border-bottom-right-radius:4px;border-bottom-left-radius:4px;background-color:#fff;border:1px solid #ccc;border-top-color:#e6e6e6;-webkit-box-shadow:0 1px 0 rgba(0,0,0,.06);box-shadow:0 1px 0 rgba(0,0,0,.06);-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:-1px;max-height:200px;position:absolute;left:0;top:100%;width:100%;z-index:1;-webkit-overflow-scrolling:touch}.Select-menu{max-height:198px;overflow-y:auto}.Select-option{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;color:#666;cursor:pointer;display:block;padding:8px 10px}.Select-option:last-child{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.Select-option.is-selected{background-color:#f5faff;background-color:rgba(0,126,255,.04);color:#333}.Select-option.is-focused{background-color:#ebf5ff;background-color:rgba(0,126,255,.08);color:#333}.Select-option.is-disabled{color:#ccc;cursor:default}.Select-noresults{-webkit-box-sizing:border-box;box-sizing:border-box;color:#999;cursor:default;display:block;padding:8px 10px}.Select--multi .Select-input{vertical-align:middle;margin-left:10px;padding:0}.Select--multi.Select--rtl .Select-input{margin-left:0;margin-right:10px}.Select--multi.has-value .Select-input{margin-left:5px}.Select--multi .Select-value{background-color:#ebf5ff;background-color:rgba(0,126,255,.08);border-radius:2px;border:1px solid #c2e0ff;border:1px solid rgba(0,126,255,.24);color:#007eff;display:inline-block;font-size:.9em;line-height:1.4;margin-left:5px;margin-top:5px;vertical-align:top}.Select--multi .Select-value-icon,.Select--multi .Select-value-label{display:inline-block;vertical-align:middle}.Select--multi .Select-value-label{border-bottom-right-radius:2px;border-top-right-radius:2px;cursor:default;padding:2px 5px}.Select--multi a.Select-value-label{color:#007eff;cursor:pointer;text-decoration:none}.Select--multi a.Select-value-label:hover{text-decoration:underline}.Select--multi .Select-value-icon{cursor:pointer;border-bottom-left-radius:2px;border-top-left-radius:2px;border-right:1px solid #c2e0ff;border-right:1px solid rgba(0,126,255,.24);padding:1px 5px 3px}.Select--multi .Select-value-icon:focus,.Select--multi .Select-value-icon:hover{background-color:#d8eafd;background-color:rgba(0,113,230,.08);color:#0071e6}.Select--multi .Select-value-icon:active{background-color:#c2e0ff;background-color:rgba(0,126,255,.24)}.Select--multi.Select--rtl .Select-value{margin-left:0;margin-right:5px}.Select--multi.Select--rtl .Select-value-icon{border-right:none;border-left:1px solid #c2e0ff;border-left:1px solid rgba(0,126,255,.24)}.Select--multi.is-disabled .Select-value{background-color:#fcfcfc;border:1px solid #e3e3e3;color:#333}.Select--multi.is-disabled .Select-value-icon{cursor:not-allowed;border-right:1px solid #e3e3e3}.Select--multi.is-disabled .Select-value-icon:active,.Select--multi.is-disabled .Select-value-icon:focus,.Select--multi.is-disabled .Select-value-icon:hover{background-color:#fcfcfc}@keyframes Select-animation-spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes Select-animation-spin{to{-webkit-transform:rotate(1turn)}}", ""]);

// exports


/***/ }),

/***/ 164:
/*!******************************************!*\
  !*** ./src/routes/products/Products.css ***!
  \******************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!./Products.css */ 165);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 2);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Products.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./Products.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 165:
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/routes/products/Products.css ***!
  \**************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 1)(false);
// imports


// module
exports.push([module.i, "._18B49{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:start;justify-content:flex-start}._25CUC{-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(24.975% - 22.5px);flex-basis:calc(24.975% - 22.5px);max-width:calc(24.975% - 22.5px);width:calc(24.975% - 22.5px)}._25CUC:nth-child(1n){margin-right:30px;margin-left:0}._25CUC:last-child{margin-right:0}._25CUC:nth-child(12n){margin-right:0;margin-left:auto}._3HNOl{margin-bottom:80px}.sKLHN{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:calc(74.925% - 7.5px);flex-basis:calc(74.925% - 7.5px);max-width:calc(74.925% - 7.5px);width:calc(74.925% - 7.5px)}.sKLHN:nth-child(1n){margin-right:30px;margin-left:0}.sKLHN:last-child{margin-right:0}.sKLHN:nth-child(1n){margin-right:0;margin-left:auto}._200y4{width:213px;margin-left:auto;margin-bottom:30px}", ""]);

// exports
exports.locals = {
	"root": "_2NKhe",
	"container": "_18B49",
	"filters": "_25CUC",
	"specials": "_3HNOl",
	"grid": "sKLHN",
	"sortingList": "_200y4"
};

/***/ })

};;
//# sourceMappingURL=products.js.map