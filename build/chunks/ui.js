require("source-map-support").install();
exports.ids = [0];
exports.modules = {

/***/ 336:
/*!********************************!*\
  !*** ./src/routes/ui/index.js ***!
  \********************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__ = __webpack_require__(/*! @babel/runtime/helpers/jsx */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__ = __webpack_require__(/*! @babel/runtime/regenerator */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Ui__ = __webpack_require__(/*! ./Ui */ 338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Layout__ = __webpack_require__(/*! components/Layout */ 83);




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

var _ref2 = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_5_components_Layout__["a" /* default */], {
  noHeader: true,
  noFooter: true
}, void 0, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_4__Ui__["a" /* default */], {}));

function _action() {
  _action = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
    var fetch;
    return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch = _ref.fetch;
            return _context.abrupt("return", {
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

/***/ 338:
/*!*****************************!*\
  !*** ./src/routes/ui/Ui.js ***!
  \*****************************/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Ui_scss__ = __webpack_require__(/*! ./Ui.scss */ 339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Ui_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Title__ = __webpack_require__(/*! components/Title */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_Para__ = __webpack_require__(/*! components/Para */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_components_Button__ = __webpack_require__(/*! components/Button */ 32);







/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */








var _ref = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_12_components_Button__["a" /* default */], {}, void 0, "\u041A\u043D\u043E\u043F\u043A\u0430");

var _ref2 = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_12_components_Button__["a" /* default */], {
  fullWidth: true
}, void 0, "\u041A\u043D\u043E\u043F\u043A\u0430 \u043D\u0430 \u0432\u0441\u044E \u0448\u0438\u0440\u0438\u043D\u0443");

var _ref3 = __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_12_components_Button__["a" /* default */], {
  fullWidth: true,
  isLoading: true
}, void 0, "\u041A\u043D\u043E\u043F\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F");

var Ui =
/*#__PURE__*/
function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_inherits___default()(Ui, _React$Component);

  function Ui() {
    __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default()(this, Ui);

    return __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, (Ui.__proto__ || __WEBPACK_IMPORTED_MODULE_1__babel_runtime_core_js_object_get_prototype_of___default()(Ui)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_createClass___default()(Ui, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()("div", {
        className: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.root
      }, void 0, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_10_components_Title__["a" /* default */], {
        type: "h1",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.title
        }
      }, void 0, "h1"), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_10_components_Title__["a" /* default */], {
        type: "h2",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.title
        }
      }, void 0, "h2"), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_10_components_Title__["a" /* default */], {
        type: "h3",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.title
        }
      }, void 0, "h3"), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_10_components_Title__["a" /* default */], {
        type: "h4",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.title
        }
      }, void 0, "h4"), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_10_components_Title__["a" /* default */], {
        type: "h5",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.title
        }
      }, void 0, "h5"), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_11_components_Para__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.para
      }, void 0, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure molestiae officiis quibusdam reprehenderit sapiente."), __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_jsx___default()(__WEBPACK_IMPORTED_MODULE_11_components_Para__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a.para,
        type: "medium",
        theme: "gray"
      }, void 0, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure molestiae officiis quibusdam reprehenderit sapiente."), _ref, _ref2, _ref3);
    }
  }]);

  return Ui;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_8_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_9__Ui_scss___default.a)(Ui));

/***/ }),

/***/ 339:
/*!*******************************!*\
  !*** ./src/routes/ui/Ui.scss ***!
  \*******************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!../../../node_modules/sass-loader/lib/loader.js!./Ui.scss */ 340);
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
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!../../../node_modules/sass-loader/lib/loader.js!./Ui.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-rules-2!../../../node_modules/postcss-loader/lib/index.js??ref--1-rules-3!../../../node_modules/sass-loader/lib/loader.js!./Ui.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 340:
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./node_modules/sass-loader/lib/loader.js!./src/routes/ui/Ui.scss ***!
  \********************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 2)(false);
// imports


// module
exports.push([module.i, "._3z9qM{padding:40px;background-color:#000;height:100vh;width:100%}._2E92H{margin-bottom:15px}", ""]);

// exports
exports.locals = {
	"root": "_3z9qM",
	"title": "_2E92H"
};

/***/ })

};;
//# sourceMappingURL=ui.js.map