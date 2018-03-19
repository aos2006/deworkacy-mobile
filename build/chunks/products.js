require("source-map-support").install();
exports.ids = [8];
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Breadcrumbs-root-1_JgR {\n  background-color: rgb(241, 243, 247);\n}\n\n.Breadcrumbs-list-3-b3p {\n  min-height: 63px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.Breadcrumbs-item-K2F3w {\n\n}\n\n.Breadcrumbs-arrow-29dRo {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n\n.Breadcrumbs-link-103LO {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 24px\n}\n\n.Breadcrumbs-link-103LO:hover {\n  text-decoration: underline;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Breadcrumbs/Breadcrumbs.css"],"names":[],"mappings":"AAAA;EACE,qCAAqC;CACtC;;AAED;EACE,iBAAiB;EACjB,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,qBAAqB;MACjB,4BAA4B;CACjC;;AAED;;CAEC;;AAED;EACE,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,uBAAuB;EACvB,iCAAiC;EACjC,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE,2BAA2B;CAC5B","file":"Breadcrumbs.css","sourcesContent":[".root {\n  background-color: rgb(241, 243, 247);\n}\n\n.list {\n  min-height: 63px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.item {\n\n}\n\n.arrow {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n\n.link {\n  color: rgb(51, 51, 51);\n  font-family: Poppins, sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 24px\n}\n\n.link:hover {\n  text-decoration: underline;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Breadcrumbs-root-1_JgR",
	"list": "Breadcrumbs-list-3-b3p",
	"item": "Breadcrumbs-item-K2F3w",
	"arrow": "Breadcrumbs-arrow-29dRo",
	"link": "Breadcrumbs-link-103LO"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/products/Products.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Products.css","sourceRoot":""}]);

// exports


/***/ }),

/***/ "./src/components/Breadcrumbs/Breadcrumbs.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

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
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Breadcrumbs/Breadcrumbs.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Link__ = __webpack_require__("./src/components/Link/Link.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css__ = __webpack_require__("./src/components/Breadcrumbs/Breadcrumbs.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Breadcrumbs/Breadcrumbs.js";









var Breadcrumbs = function Breadcrumbs(_ref) {
  var list = _ref.list;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", {
    className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.list,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, list.map(function (item, i) {
    if (i < list.length - 1) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
        to: item.to,
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.link,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      }, item.txt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_fontawesome___default.a, {
        name: "long-arrow-right",
        className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.arrow,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }));
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Link__["a" /* default */], {
      to: item.to,
      className: __WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a.link,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, item.txt));
  }))));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a)(Breadcrumbs));

/***/ }),

/***/ "./src/routes/products/Products.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/products/Products.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

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
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/products/Products.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/routes/products/Products.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/products/Products.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Breadcrumbs__ = __webpack_require__("./src/components/Breadcrumbs/Breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Products_css__ = __webpack_require__("./src/routes/products/Products.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Products_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Products_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/products/Products.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_5__Products_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Breadcrumbs__["a" /* default */], {
        list: [{
          txt: 'Home',
          to: '/'
        }, {
          txt: 'Shop',
          to: '/shop'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Container__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, "porducts"));
    }
  }]);

  return Products;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Products, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    news: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
      content: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    })).isRequired
  }
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Products_css___default.a)(Products));

/***/ }),

/***/ "./src/routes/products/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Products__ = __webpack_require__("./src/routes/products/Products.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__("./src/components/Layout/Layout.js");
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/products/index.js";

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
              component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */], {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19
                },
                __self: this
              }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Products__["a" /* default */], {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 20
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

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3Byb2R1Y3RzLmpzIiwic291cmNlcyI6WyIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmNzcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9wcm9kdWN0cy9Qcm9kdWN0cy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzPzZkYzkiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvcHJvZHVjdHMvUHJvZHVjdHMuY3NzPzhiMTYiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXMvcHJvZHVjdHMvUHJvZHVjdHMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9yb3V0ZXMvcHJvZHVjdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5CcmVhZGNydW1icy1yb290LTFfSmdSIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDEsIDI0MywgMjQ3KTtcXG59XFxuXFxuLkJyZWFkY3J1bWJzLWxpc3QtMy1iM3Age1xcbiAgbWluLWhlaWdodDogNjNweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LXBhY2s6IHN0YXJ0O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLkJyZWFkY3J1bWJzLWl0ZW0tSzJGM3cge1xcblxcbn1cXG5cXG4uQnJlYWRjcnVtYnMtYXJyb3ctMjlkUm8ge1xcbiAgbWFyZ2luLWxlZnQ6IDE4cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE4cHg7XFxufVxcblxcbi5CcmVhZGNydW1icy1saW5rLTEwM0xPIHtcXG4gIGNvbG9yOiByZ2IoNTEsIDUxLCA1MSk7XFxuICBmb250LWZhbWlseTogUG9wcGlucywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMjRweFxcbn1cXG5cXG4uQnJlYWRjcnVtYnMtbGluay0xMDNMTzpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsdUJBQXVCO01BQ25CLG9CQUFvQjtFQUN4QixxQkFBcUI7TUFDakIsNEJBQTRCO0NBQ2pDOztBQUVEOztDQUVDOztBQUVEO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtDQUNwQjs7QUFFRDtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBaUM7RUFDakMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSwyQkFBMkI7Q0FDNUJcIixcImZpbGVcIjpcIkJyZWFkY3J1bWJzLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIucm9vdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQxLCAyNDMsIDI0Nyk7XFxufVxcblxcbi5saXN0IHtcXG4gIG1pbi1oZWlnaHQ6IDYzcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG5cXG59XFxuXFxuLmFycm93IHtcXG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xcbn1cXG5cXG4ubGluayB7XFxuICBjb2xvcjogcmdiKDUxLCA1MSwgNTEpO1xcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnMsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHhcXG59XFxuXFxuLmxpbms6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJyb290XCI6IFwiQnJlYWRjcnVtYnMtcm9vdC0xX0pnUlwiLFxuXHRcImxpc3RcIjogXCJCcmVhZGNydW1icy1saXN0LTMtYjNwXCIsXG5cdFwiaXRlbVwiOiBcIkJyZWFkY3J1bWJzLWl0ZW0tSzJGM3dcIixcblx0XCJhcnJvd1wiOiBcIkJyZWFkY3J1bWJzLWFycm93LTI5ZFJvXCIsXG5cdFwibGlua1wiOiBcIkJyZWFkY3J1bWJzLWxpbmstMTAzTE9cIlxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiUHJvZHVjdHMuY3NzXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLXJ1bGVzLTIhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliPz9yZWYtLTEtcnVsZXMtMyEuL3NyYy9yb3V0ZXMvcHJvZHVjdHMvUHJvZHVjdHMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL3JvdXRlcy9wcm9kdWN0cy9Qcm9kdWN0cy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9CcmVhZGNydW1icy5jc3NcIik7XG4gICAgdmFyIGluc2VydENzcyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanNcIik7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q29udGVudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50LnRvU3RyaW5nKCk7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2luc2VydENzcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIGluc2VydENzcyhjb250ZW50LCBvcHRpb25zKSB9O1xuICAgIFxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQnJlYWRjcnVtYnMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQnJlYWRjcnVtYnMuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi93aXRoU3R5bGVzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBMaW5rIGZyb20gJy4uL0xpbmsnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgRm9udEF3ZXNvbWUgZnJvbSAncmVhY3QtZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHMgZnJvbSAnLi9CcmVhZGNydW1icy5jc3MnO1xuXG5jb25zdCBCcmVhZGNydW1icyA9ICh7IGxpc3QgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICA8Q29udGFpbmVyPlxuICAgICAgPHVsIGNsYXNzTmFtZT17cy5saXN0fT5cbiAgICAgICAge2xpc3QubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgaWYgKGkgPCBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgICAgICAgPExpbmsgdG89e2l0ZW0udG99IGNsYXNzTmFtZT17cy5saW5rfT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLnR4dH1cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPEZvbnRBd2Vzb21lIG5hbWU9XCJsb25nLWFycm93LXJpZ2h0XCIgY2xhc3NOYW1lPXtzLmFycm93fSAvPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17cy5pdGVtfT5cbiAgICAgICAgICAgICAgPExpbmsgdG89e2l0ZW0udG99IGNsYXNzTmFtZT17cy5saW5rfT5cbiAgICAgICAgICAgICAgICB7aXRlbS50eHR9XG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKVxuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgPC9Db250YWluZXI+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShCcmVhZGNydW1icyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuanMiLCJcbiAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL1Byb2R1Y3RzLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Qcm9kdWN0cy5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9Qcm9kdWN0cy5jc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNzcyA9IGluc2VydENzcyhjb250ZW50LCB7IHJlcGxhY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgcmVtb3ZlQ3NzKCk7IH0pO1xuICAgIH1cbiAgXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcm91dGVzL3Byb2R1Y3RzL1Byb2R1Y3RzLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvcm91dGVzL3Byb2R1Y3RzL1Byb2R1Y3RzLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdjb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgQnJlYWRjcnVtYnMgZnJvbSAnY29tcG9uZW50cy9CcmVhZGNydW1icyc7XG5pbXBvcnQgcyBmcm9tICcuL1Byb2R1Y3RzLmNzcyc7XG5cblxuY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5ld3M6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgbGluazogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjb250ZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgfSksXG4gICAgKS5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgICAgIDxCcmVhZGNydW1ic1xuICAgICAgICAgIGxpc3Q9e1tcbiAgICAgICAgICAgIHsgdHh0OiAnSG9tZScsIHRvOiAnLycgfSxcbiAgICAgICAgICAgIHsgdHh0OiAnU2hvcCcsIHRvOiAnL3Nob3AnIH1cbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICBwb3JkdWN0c1xuICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKFByb2R1Y3RzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL3Byb2R1Y3RzL1Byb2R1Y3RzLmpzIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2R1Y3RzIGZyb20gJy4vUHJvZHVjdHMnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGFjdGlvbih7IGZldGNoIH0pIHtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiAnUmVhY3QgU3RhcnRlciBLaXQnLFxuICAgIGNvbXBvbmVudDogKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPFByb2R1Y3RzIC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy9wcm9kdWN0cy9pbmRleC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQXZCQTtBQUNBO0FBNEJBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTs7OztBQXpCQTtBQUNBO0FBREE7Ozs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFGQTs7QUEyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQVlBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=