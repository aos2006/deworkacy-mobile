webpackJsonp([0],{

/***/ 1382:
/*!********************************!*\
  !*** ./src/routes/ui/index.js ***!
  \********************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(/*! @babel/runtime/regenerator */ 79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Ui__ = __webpack_require__(/*! ./Ui */ 1384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Layout__ = __webpack_require__(/*! components/Layout */ 581);


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

/***/ 1384:
/*!*****************************!*\
  !*** ./src/routes/ui/Ui.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! @babel/runtime/core-js/object/get-prototype-of */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(/*! prop-types */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Ui_scss__ = __webpack_require__(/*! ./Ui.scss */ 1385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Ui_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__Ui_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_Title__ = __webpack_require__(/*! components/Title */ 65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Para__ = __webpack_require__(/*! components/Para */ 120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_Button__ = __webpack_require__(/*! components/Button */ 121);





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

/***/ 1385:
/*!*******************************!*\
  !*** ./src/routes/ui/Ui.scss ***!
  \*******************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--1-rules-2!../../../node_modules/postcss-loader/lib??ref--1-rules-3!../../../node_modules/sass-loader/lib/loader.js!./Ui.scss */ 1386);
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/lib/insertCss.js */ 4);

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

/***/ 1386:
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--1-rules-2!./node_modules/postcss-loader/lib??ref--1-rules-3!./node_modules/sass-loader/lib/loader.js!./src/routes/ui/Ui.scss ***!
  \********************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 9)(true);
// imports


// module
exports.push([module.i, ".Ui-root-3z9qM {\n  padding: 40px;\n  background-color: black;\n  height: 100vh;\n  width: 100%; }\n\n.Ui-title-2E92H {\n  margin-bottom: 15px; }\n", "", {"version":3,"sources":["/Users/anton/projects/deworkacy-mobile/src/routes/ui/Ui.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,wBAAwB;EACxB,cAAc;EACd,YAAY,EAAE;;AAEhB;EACE,oBAAoB,EAAE","file":"Ui.scss","sourcesContent":[".root {\n  padding: 40px;\n  background-color: black;\n  height: 100vh;\n  width: 100%; }\n\n.title {\n  margin-bottom: 15px; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Ui-root-3z9qM",
	"title": "Ui-title-2E92H"
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkuY2h1bmsuanMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbi9wcm9qZWN0cy9kZXdvcmthY3ktbW9iaWxlL3NyYy9yb3V0ZXMvdWkvaW5kZXguanMiLCIvVXNlcnMvYW50b24vcHJvamVjdHMvZGV3b3JrYWN5LW1vYmlsZS9zcmMvcm91dGVzL3VpL1VpLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvdWkvVWkuc2Nzcz8yYzA1IiwiL1VzZXJzL2FudG9uL3Byb2plY3RzL2Rld29ya2FjeS1tb2JpbGUvc3JjL3JvdXRlcy91aS9VaS5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVaSBmcm9tICcuL1VpJztcbmltcG9ydCBMYXlvdXQgZnJvbSAnY29tcG9uZW50cy9MYXlvdXQnO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb24oeyBmZXRjaCB9KSB7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21wb25lbnQ6IChcbiAgICAgIDxMYXlvdXQgbm9IZWFkZXIgbm9Gb290ZXI+XG4gICAgICAgIDxVaS8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy91aS9pbmRleC5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL1VpLnNjc3MnO1xuaW1wb3J0IFRpdGxlIGZyb20gJ2NvbXBvbmVudHMvVGl0bGUnO1xuaW1wb3J0IFBhcmEgZnJvbSAnY29tcG9uZW50cy9QYXJhJztcbmltcG9ydCBCdXR0b24gZnJvbSAnY29tcG9uZW50cy9CdXR0b24nO1xuXG5jbGFzcyBVaSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxUaXRsZSB0eXBlPVwiaDFcIiBjbGFzc2VzPXt7IHJvb3Q6IHMudGl0bGUgfX0+XG4gICAgICAgICAgaDFcbiAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgPFRpdGxlIHR5cGU9XCJoMlwiIGNsYXNzZXM9e3tyb290OiBzLnRpdGxlfX0+XG4gICAgICAgICAgaDJcbiAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgPFRpdGxlIHR5cGU9XCJoM1wiIGNsYXNzZXM9e3tyb290OiBzLnRpdGxlfX0+XG4gICAgICAgICAgaDNcbiAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgPFRpdGxlIHR5cGU9XCJoNFwiIGNsYXNzZXM9e3tyb290OiBzLnRpdGxlfX0+XG4gICAgICAgICAgaDRcbiAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgPFRpdGxlIHR5cGU9XCJoNVwiIGNsYXNzZXM9e3tyb290OiBzLnRpdGxlfX0+XG4gICAgICAgICAgaDVcbiAgICAgICAgPC9UaXRsZT5cbiAgICAgICAgPFBhcmEgY2xhc3NOYW1lPXtzLnBhcmF9PlxuICAgICAgICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBbGlxdWlkIGN1bSBtYWduYW0gbm9iaXMgcXVpYSBxdWlidXNkYW0uIEl1cmUgbW9sZXN0aWFlIG9mZmljaWlzIHF1aWJ1c2RhbSByZXByZWhlbmRlcml0IHNhcGllbnRlLlxuICAgICAgICA8L1BhcmE+XG4gICAgICAgIDxQYXJhIGNsYXNzTmFtZT17cy5wYXJhfSB0eXBlPVwibWVkaXVtXCIgdGhlbWU9XCJncmF5XCI+XG4gICAgICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEFsaXF1aWQgY3VtIG1hZ25hbSBub2JpcyBxdWlhIHF1aWJ1c2RhbS4gSXVyZVxuICAgICAgICAgIG1vbGVzdGlhZSBvZmZpY2lpcyBxdWlidXNkYW0gcmVwcmVoZW5kZXJpdCBzYXBpZW50ZS5cbiAgICAgICAgPC9QYXJhPlxuICAgICAgICA8QnV0dG9uPlxuICAgICAgICAgINCa0L3QvtC/0LrQsFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiBmdWxsV2lkdGg+XG4gICAgICAgICAg0JrQvdC+0L/QutCwINC90LAg0LLRgdGOINGI0LjRgNC40L3Rg1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiBmdWxsV2lkdGggaXNMb2FkaW5nPlxuICAgICAgICAgINCa0L3QvtC/0LrQsCDQt9Cw0LPRgNGD0LbQsNC10YLRgdGPXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFVpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL3VpL1VpLmpzIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9VaS5zY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL1VpLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9VaS5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JvdXRlcy91aS9VaS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuVWktcm9vdC0zejlxTSB7XFxuICBwYWRkaW5nOiA0MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uVWktdGl0bGUtMkU5Mkgge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvYW50b24vcHJvamVjdHMvZGV3b3JrYWN5LW1vYmlsZS9zcmMvcm91dGVzL3VpL1VpLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxjQUFjO0VBQ2Qsd0JBQXdCO0VBQ3hCLGNBQWM7RUFDZCxZQUFZLEVBQUU7O0FBRWhCO0VBQ0Usb0JBQW9CLEVBQUVcIixcImZpbGVcIjpcIlVpLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgcGFkZGluZzogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnRpdGxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlVpLXJvb3QtM3o5cU1cIixcblx0XCJ0aXRsZVwiOiBcIlVpLXRpdGxlLTJFOTJIXCJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3JjL3JvdXRlcy91aS9VaS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7Ozs7QUFyQ0E7QUFDQTtBQXVDQTs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9