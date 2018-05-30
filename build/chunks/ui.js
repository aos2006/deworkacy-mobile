require("source-map-support").install();
exports.ids = [0];
exports.modules = {

/***/ 332:
/*!********************************!*\
  !*** ./src/routes/ui/index.js ***!
  \********************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(/*! @babel/runtime/regenerator */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Ui__ = __webpack_require__(/*! ./Ui */ 334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Layout__ = __webpack_require__(/*! components/Layout */ 77);


var _jsxFileName = "/Users/anton/projects/deworkacy-mobile/src/routes/ui/index.js";

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
  _action = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
    var fetch;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch = _ref.fetch;
            return _context.abrupt("return", {
              component: __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Layout__["a" /* default */], {
                noHeader: true,
                noFooter: true,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 18
                },
                __self: this
              }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Ui__["a" /* default */], {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19
                },
                __self: this
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

/***/ 334:
/*!*****************************!*\
  !*** ./src/routes/ui/Ui.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! @babel/runtime/core-js/object/get-prototype-of */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(/*! prop-types */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Ui_scss__ = __webpack_require__(/*! ./Ui.scss */ 335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__Ui_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_Title__ = __webpack_require__(/*! components/Title */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Para__ = __webpack_require__(/*! components/Para */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_Button__ = __webpack_require__(/*! components/Button */ 31);





var _jsxFileName = "/Users/anton/projects/deworkacy-mobile/src/routes/ui/Ui.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */








var Ui =
/*#__PURE__*/
function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits___default()(Ui, _React$Component);

  function Ui() {
    __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck___default()(this, Ui);

    return __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn___default()(this, (Ui.__proto__ || __WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of___default()(Ui)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass___default()(Ui, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_Title__["a" /* default */], {
        type: "h1",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, "h1"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_Title__["a" /* default */], {
        type: "h2",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, "h2"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_Title__["a" /* default */], {
        type: "h3",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, "h3"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_Title__["a" /* default */], {
        type: "h4",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, "h4"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_Title__["a" /* default */], {
        type: "h5",
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.title
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, "h5"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_Para__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.para,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure molestiae officiis quibusdam reprehenderit sapiente."), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_Para__["a" /* default */], {
        className: __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a.para,
        type: "medium",
        theme: "gray",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum magnam nobis quia quibusdam. Iure molestiae officiis quibusdam reprehenderit sapiente."), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_components_Button__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, "\u041A\u043D\u043E\u043F\u043A\u0430"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_components_Button__["a" /* default */], {
        fullWidth: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, "\u041A\u043D\u043E\u043F\u043A\u0430 \u043D\u0430 \u0432\u0441\u044E \u0448\u0438\u0440\u0438\u043D\u0443"), __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_components_Button__["a" /* default */], {
        fullWidth: true,
        isLoading: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, "\u041A\u043D\u043E\u043F\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F"));
    }
  }]);

  return Ui;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_8__Ui_scss___default.a)(Ui));

/***/ }),

/***/ 335:
/*!*******************************!*\
  !*** ./src/routes/ui/Ui.scss ***!
  \*******************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!../../../node_modules/sass-loader/lib/loader.js!./Ui.scss */ 336);
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

/***/ 336:
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./node_modules/sass-loader/lib/loader.js!./src/routes/ui/Ui.scss ***!
  \********************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 2)(true);
// imports


// module
exports.push([module.i, ".Ui-root-3z9qM {\n  padding: 40px;\n  background-color: black;\n  height: 100vh;\n  width: 100%; }\n\n.Ui-title-2E92H {\n  margin-bottom: 15px; }\n", "", {"version":3,"sources":["/Users/anton/projects/deworkacy-mobile/src/routes/ui/Ui.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,wBAAwB;EACxB,cAAc;EACd,YAAY,EAAE;;AAEhB;EACE,oBAAoB,EAAE","file":"Ui.scss","sourcesContent":[".root {\n  padding: 40px;\n  background-color: black;\n  height: 100vh;\n  width: 100%; }\n\n.title {\n  margin-bottom: 15px; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Ui-root-3z9qM",
	"title": "Ui-title-2E92H"
};

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3VpLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW50b24vcHJvamVjdHMvZGV3b3JrYWN5LW1vYmlsZS9zcmMvcm91dGVzL3VpL2luZGV4LmpzIiwiL1VzZXJzL2FudG9uL3Byb2plY3RzL2Rld29ya2FjeS1tb2JpbGUvc3JjL3JvdXRlcy91aS9VaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL3VpL1VpLnNjc3M/MmMwNSIsIi9Vc2Vycy9hbnRvbi9wcm9qZWN0cy9kZXdvcmthY3ktbW9iaWxlL3NyYy9yb3V0ZXMvdWkvVWkuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgTGF5b3V0IGZyb20gJ2NvbXBvbmVudHMvTGF5b3V0JztcblxuYXN5bmMgZnVuY3Rpb24gYWN0aW9uKHsgZmV0Y2ggfSkge1xuXG4gIHJldHVybiB7XG4gICAgY29tcG9uZW50OiAoXG4gICAgICA8TGF5b3V0IG5vSGVhZGVyIG5vRm9vdGVyPlxuICAgICAgICA8VWkvPlxuICAgICAgPC9MYXlvdXQ+XG4gICAgKSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWN0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9yb3V0ZXMvdWkvaW5kZXguanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9VaS5zY3NzJztcbmltcG9ydCBUaXRsZSBmcm9tICdjb21wb25lbnRzL1RpdGxlJztcbmltcG9ydCBQYXJhIGZyb20gJ2NvbXBvbmVudHMvUGFyYSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ2NvbXBvbmVudHMvQnV0dG9uJztcblxuY2xhc3MgVWkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgICAgICA8VGl0bGUgdHlwZT1cImgxXCIgY2xhc3Nlcz17eyByb290OiBzLnRpdGxlIH19PlxuICAgICAgICAgIGgxXG4gICAgICAgIDwvVGl0bGU+XG4gICAgICAgIDxUaXRsZSB0eXBlPVwiaDJcIiBjbGFzc2VzPXt7cm9vdDogcy50aXRsZX19PlxuICAgICAgICAgIGgyXG4gICAgICAgIDwvVGl0bGU+XG4gICAgICAgIDxUaXRsZSB0eXBlPVwiaDNcIiBjbGFzc2VzPXt7cm9vdDogcy50aXRsZX19PlxuICAgICAgICAgIGgzXG4gICAgICAgIDwvVGl0bGU+XG4gICAgICAgIDxUaXRsZSB0eXBlPVwiaDRcIiBjbGFzc2VzPXt7cm9vdDogcy50aXRsZX19PlxuICAgICAgICAgIGg0XG4gICAgICAgIDwvVGl0bGU+XG4gICAgICAgIDxUaXRsZSB0eXBlPVwiaDVcIiBjbGFzc2VzPXt7cm9vdDogcy50aXRsZX19PlxuICAgICAgICAgIGg1XG4gICAgICAgIDwvVGl0bGU+XG4gICAgICAgIDxQYXJhIGNsYXNzTmFtZT17cy5wYXJhfT5cbiAgICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWxpcXVpZCBjdW0gbWFnbmFtIG5vYmlzIHF1aWEgcXVpYnVzZGFtLiBJdXJlIG1vbGVzdGlhZSBvZmZpY2lpcyBxdWlidXNkYW0gcmVwcmVoZW5kZXJpdCBzYXBpZW50ZS5cbiAgICAgICAgPC9QYXJhPlxuICAgICAgICA8UGFyYSBjbGFzc05hbWU9e3MucGFyYX0gdHlwZT1cIm1lZGl1bVwiIHRoZW1lPVwiZ3JheVwiPlxuICAgICAgICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBbGlxdWlkIGN1bSBtYWduYW0gbm9iaXMgcXVpYSBxdWlidXNkYW0uIEl1cmVcbiAgICAgICAgICBtb2xlc3RpYWUgb2ZmaWNpaXMgcXVpYnVzZGFtIHJlcHJlaGVuZGVyaXQgc2FwaWVudGUuXG4gICAgICAgIDwvUGFyYT5cbiAgICAgICAgPEJ1dHRvbj5cbiAgICAgICAgICDQmtC90L7Qv9C60LBcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gZnVsbFdpZHRoPlxuICAgICAgICAgINCa0L3QvtC/0LrQsCDQvdCwINCy0YHRjiDRiNC40YDQuNC90YNcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b24gZnVsbFdpZHRoIGlzTG9hZGluZz5cbiAgICAgICAgICDQmtC90L7Qv9C60LAg0LfQsNCz0YDRg9C20LDQtdGC0YHRj1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShVaSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy91aS9VaS5qcyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vVWkuc2Nzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9VaS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vVWkuc2Nzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yb3V0ZXMvdWkvVWkuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuVWktcm9vdC0zejlxTSB7XFxuICBwYWRkaW5nOiA0MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uVWktdGl0bGUtMkU5Mkgge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvYW50b24vcHJvamVjdHMvZGV3b3JrYWN5LW1vYmlsZS9zcmMvcm91dGVzL3VpL1VpLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxjQUFjO0VBQ2Qsd0JBQXdCO0VBQ3hCLGNBQWM7RUFDZCxZQUFZLEVBQUU7O0FBRWhCO0VBQ0Usb0JBQW9CLEVBQUVcIixcImZpbGVcIjpcIlVpLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcGFkZGluZzogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnRpdGxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlVpLXJvb3QtM3o5cU1cIixcblx0XCJ0aXRsZVwiOiBcIlVpLXRpdGxlLTJFOTJIXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3JvdXRlcy91aS9VaS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBOzs7O0FBckNBO0FBQ0E7QUF1Q0E7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==