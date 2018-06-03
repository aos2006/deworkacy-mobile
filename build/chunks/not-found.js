require("source-map-support").install();
exports.ids = [1];
exports.modules = {

/***/ 338:
/*!***************************************!*\
  !*** ./src/routes/not-found/index.js ***!
  \***************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__ = __webpack_require__(/*! @babel/runtime/helpers/jsx */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(/*! ../../components/Layout */ 83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound__ = __webpack_require__(/*! ./NotFound */ 342);


/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



var title = 'Page Not Found';

var _ref = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {}, void 0, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_3__NotFound__["a" /* default */], {
  title: title
}));

function action() {
  return {
    chunks: ['not-found'],
    title: title,
    component: _ref,
    status: 404
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ 342:
/*!******************************************!*\
  !*** ./src/routes/not-found/NotFound.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__ = __webpack_require__(/*! @babel/runtime/helpers/jsx */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! @babel/runtime/core-js/object/get-prototype-of */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_inherits__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__NotFound_css__ = __webpack_require__(/*! ./NotFound.css */ 343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__NotFound_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__NotFound_css__);







/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





var _ref = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()("p", {}, void 0, "Sorry, the page you were trying to view does not exist.");

var NotFound =
/*#__PURE__*/
function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_inherits___default()(NotFound, _React$Component);

  function NotFound() {
    __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default()(this, NotFound);

    return __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, (NotFound.__proto__ || __WEBPACK_IMPORTED_MODULE_1__babel_runtime_core_js_object_get_prototype_of___default()(NotFound)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass___default()(NotFound, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__NotFound_css___default.a.root
      }, void 0, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__NotFound_css___default.a.container
      }, void 0, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()("h1", {}, void 0, this.props.title), _ref));
    }
  }]);

  return NotFound;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_8_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_9__NotFound_css___default.a)(NotFound));

/***/ }),

/***/ 343:
/*!*******************************************!*\
  !*** ./src/routes/not-found/NotFound.css ***!
  \*******************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!./NotFound.css */ 344);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 1);

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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./NotFound.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./NotFound.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 344:
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./src/routes/not-found/NotFound.css ***!
  \***************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 2)(false);
// imports


// module
exports.push([module.i, ".hprJC{padding-left:20px;padding-right:20px}.m2ZQS{margin:0 auto;padding:0 0 40px;max-width:1170px}", ""]);

// exports
exports.locals = {
	"root": "hprJC",
	"container": "m2ZQS"
};

/***/ })

};;
//# sourceMappingURL=not-found.js.map