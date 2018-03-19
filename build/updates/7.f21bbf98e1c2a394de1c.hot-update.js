require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Breadcrumbs.css","sourceRoot":""}]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome__ = __webpack_require__("react-fontawesome");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css__ = __webpack_require__("./src/components/Breadcrumbs/Breadcrumbs.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/components/Breadcrumbs/Breadcrumbs.js";








var Breadcrumbs = function Breadcrumbs(_ref) {
  var list = _ref.list;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    className: __WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css___default.a.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", {
    className: __WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css___default.a.list,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, list.map(function (item, i) {
    if (i < list.length - 1) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
        className: __WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css___default.a.item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_fontawesome___default.a, {
        name: "long-arrow-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }));
    }
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_6__Breadcrumbs_css___default.a)(Breadcrumbs));

/***/ }),

/***/ "./src/routes/home/Home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_Banner__ = __webpack_require__("./src/components/Banner/Banner.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__ = __webpack_require__("./src/components/Banner/components/Content/Content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_Container__ = __webpack_require__("./src/components/Container/Container.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_Tabs__ = __webpack_require__("./src/components/Tabs/Tabs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_CardGrid__ = __webpack_require__("./src/components/CardGrid/CardGrid.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__ = __webpack_require__("./src/components/Jumbotron/Jumbotron.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__ = __webpack_require__("./src/components/AccentProducts/AccentProducts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_components_Button__ = __webpack_require__("./src/components/Button/Button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_components_Breadcrumbs__ = __webpack_require__("./src/components/Breadcrumbs/Breadcrumbs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Home_css__ = __webpack_require__("./src/routes/home/Home.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__Home_css__);
var _jsxFileName = "/home/anton/Projects/mdaecommerce-client/src/routes/home/Home.js";

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
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11_components_Breadcrumbs__["a" /* default */], {
        list: [{}, {}, {}, {}, {}],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_Banner__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Banner_components_Content_Content__["a" /* default */], {
        title: "Minimal Furniture Chair for Workspace",
        price: "74.28",
        buttonLabel: "Show Now",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_components_AccentProducts__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.accentProducts
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_components_Container__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_components_Jumbotron__["a" /* default */], {
        classes: {
          root: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.jumbotron
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("header", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.header,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, "Trending Products"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.devider,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.descr,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, "A collection of textile samples lay spread out on the table Samsa was a travelled")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_components_Tabs__["a" /* default */], {
        classes: {
          header: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.tabsHeader,
          root: ''
        },
        panels: [{
          render: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_components_CardGrid__["a" /* default */], {
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
              }],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 89
              },
              __self: this
            });
          }
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        className: __WEBPACK_IMPORTED_MODULE_12__Home_css___default.a.loadMore,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_components_Button__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }, "Load More"))));
    }
  }]);

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Object.defineProperty(Home, "propTypes", {
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
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_12__Home_css___default.a)(Home));

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LmYyMWJiZjk4ZTFjMmEzOTRkZTFjLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmNzcz82ZGM5IiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL0hvbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJCcmVhZGNydW1icy5jc3NcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWI/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIlxuICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0zIS4vQnJlYWRjcnVtYnMuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0JyZWFkY3J1bWJzLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEtcnVsZXMtMyEuL0JyZWFkY3J1bWJzLmNzc1wiKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgTGluayBmcm9tICcuLi9MaW5rJztcbmltcG9ydCBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgcyBmcm9tICcuL0JyZWFkY3J1bWJzLmNzcyc7XG5cbmNvbnN0IEJyZWFkY3J1bWJzID0gKHsgbGlzdCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgIDx1bCBjbGFzc05hbWU9e3MubGlzdH0+XG4gICAgICB7bGlzdC5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaWYgKGkgPCBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17cy5pdGVtfT5cbiAgICAgICAgICAgICAgPEZvbnRBd2Vzb21lIG5hbWU9XCJsb25nLWFycm93LXJpZ2h0XCIgLz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSl9XG4gICAgPC91bD5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEJyZWFkY3J1bWJzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5qcyIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQmFubmVyIGZyb20gJ2NvbXBvbmVudHMvQmFubmVyJztcbmltcG9ydCBDb250ZW50IGZyb20gJ2NvbXBvbmVudHMvQmFubmVyL2NvbXBvbmVudHMvQ29udGVudC9Db250ZW50JztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnY29tcG9uZW50cy9Db250YWluZXInO1xuaW1wb3J0IFRhYnMgZnJvbSAnY29tcG9uZW50cy9UYWJzJztcbmltcG9ydCBDYXJkR3JpZCBmcm9tICdjb21wb25lbnRzL0NhcmRHcmlkJztcbmltcG9ydCBKdW1ib3Ryb24gZnJvbSAnY29tcG9uZW50cy9KdW1ib3Ryb24nO1xuaW1wb3J0IEFjY2VudFByb2R1Y3RzIGZyb20gJ2NvbXBvbmVudHMvQWNjZW50UHJvZHVjdHMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdjb21wb25lbnRzL0J1dHRvbic7XG5pbXBvcnQgQnJlYWRjcnVtYnMgZnJvbSAnY29tcG9uZW50cy9CcmVhZGNydW1icyc7XG5pbXBvcnQgcyBmcm9tICcuL0hvbWUuY3NzJztcblxuXG5jbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBuZXdzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGxpbms6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgY29udGVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIH0pLFxuICAgICkuaXNSZXF1aXJlZCxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgICAgICA8QnJlYWRjcnVtYnNcbiAgICAgICAgICBsaXN0PXtbXG4gICAgICAgICAgICB7ICB9LFxuICAgICAgICAgICAgeyAgfSxcbiAgICAgICAgICAgIHsgIH0sXG4gICAgICAgICAgICB7ICB9LFxuICAgICAgICAgICAgeyAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgICA8QmFubmVyPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L0Jhbm5lcj5cbiAgICAgICAgPEFjY2VudFByb2R1Y3RzXG4gICAgICAgICAgY2xhc3Nlcz17eyByb290OiBzLmFjY2VudFByb2R1Y3RzIH19XG4gICAgICAgIC8+XG4gICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgIDxKdW1ib3Ryb24gY2xhc3Nlcz17e1xuICAgICAgICAgICByb290OiBzLmp1bWJvdHJvbixcbiAgICAgICAgIH19XG4gICAgICAgICAvPlxuICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3MuaGVhZGVyfT5cbiAgICAgICAgICAgPGgxIGNsYXNzTmFtZT17cy50aXRsZX0+XG4gICAgICAgICAgICAgVHJlbmRpbmcgUHJvZHVjdHNcbiAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmRldmlkZXJ9IC8+XG4gICAgICAgICAgIDxwIGNsYXNzTmFtZT17cy5kZXNjcn0+XG4gICAgICAgICAgICAgQSBjb2xsZWN0aW9uIG9mIHRleHRpbGUgc2FtcGxlcyBsYXkgc3ByZWFkIG91dCBvbiB0aGUgdGFibGUgU2Ftc2Egd2FzIGEgdHJhdmVsbGVkXG4gICAgICAgICAgIDwvcD5cbiAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgPFRhYnNcbiAgICAgICAgICBjbGFzc2VzPXt7XG4gICAgICAgICAgICBoZWFkZXI6IHMudGFic0hlYWRlcixcbiAgICAgICAgICAgIHJvb3Q6ICcnLFxuICAgICAgICAgIH19XG4gICAgICAgICAgcGFuZWxzPXtbXG4gICAgICAgICAgICB7IHJlbmRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgIDxDYXJkR3JpZFxuICAgICAgICAgICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJ091dFxcbm9mXFxuU3RvY2snLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3N0b2NrJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnTmV3JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIH1cbiAgICAgICAgICBdfVxuICAgICAgICAgLz5cbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmxvYWRNb3JlfT5cbiAgICAgICAgICAgPEJ1dHRvbj5cbiAgICAgICAgICAgICBMb2FkIE1vcmVcbiAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShIb21lKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2hvbWUvSG9tZS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBWEE7QUFDQTtBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQTVDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7Ozs7QUFoSUE7QUFDQTtBQURBOzs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBRkE7O0FBa0lBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=