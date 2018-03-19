require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Breadcrumbs-root-1_JgR {\n  background-color: rgb(241, 243, 247);\n}\n\n.Breadcrumbs-list-3-b3p {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.Breadcrumbs-item-K2F3w {\n\n}\n\n.Breadcrumbs-arrow-29dRo {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Breadcrumbs/Breadcrumbs.css"],"names":[],"mappings":"AAAA;EACE,qCAAqC;CACtC;;AAED;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,qBAAqB;MACjB,4BAA4B;CACjC;;AAED;;CAEC;;AAED;EACE,kBAAkB;EAClB,mBAAmB;CACpB","file":"Breadcrumbs.css","sourcesContent":[".root {\n  background-color: rgb(241, 243, 247);\n}\n\n.list {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.item {\n\n}\n\n.arrow {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Breadcrumbs-root-1_JgR",
	"list": "Breadcrumbs-list-3-b3p",
	"item": "Breadcrumbs-item-K2F3w",
	"arrow": "Breadcrumbs-arrow-29dRo"
};

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
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      }, item.txt), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_fontawesome___default.a, {
        name: "long-arrow-right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }));
    }
  }))));
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Breadcrumbs_css___default.a)(Breadcrumbs));

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
        list: [{
          to: '/',
          txt: ''
        }, {}, {}, {}, {}],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjM2ZGFmYjExOWQ5ZDhlZjhlZDJlLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9ob21lL0hvbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5CcmVhZGNydW1icy1yb290LTFfSmdSIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDEsIDI0MywgMjQ3KTtcXG59XFxuXFxuLkJyZWFkY3J1bWJzLWxpc3QtMy1iM3Age1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uQnJlYWRjcnVtYnMtaXRlbS1LMkYzdyB7XFxuXFxufVxcblxcbi5CcmVhZGNydW1icy1hcnJvdy0yOWRSbyB7XFxuICBtYXJnaW4tbGVmdDogMThweDtcXG4gIG1hcmdpbi1yaWdodDogMThweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHFCQUFxQjtNQUNqQiw0QkFBNEI7Q0FDakM7O0FBRUQ7O0NBRUM7O0FBRUQ7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0NBQ3BCXCIsXCJmaWxlXCI6XCJCcmVhZGNydW1icy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MSwgMjQzLCAyNDcpO1xcbn1cXG5cXG4ubGlzdCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG5cXG59XFxuXFxuLmFycm93IHtcXG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIkJyZWFkY3J1bWJzLXJvb3QtMV9KZ1JcIixcblx0XCJsaXN0XCI6IFwiQnJlYWRjcnVtYnMtbGlzdC0zLWIzcFwiLFxuXHRcIml0ZW1cIjogXCJCcmVhZGNydW1icy1pdGVtLUsyRjN3XCIsXG5cdFwiYXJyb3dcIjogXCJCcmVhZGNydW1icy1hcnJvdy0yOWRSb1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgTGluayBmcm9tICcuLi9MaW5rJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnY29tcG9uZW50cy9Db250YWluZXInO1xuaW1wb3J0IEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcbmltcG9ydCBzIGZyb20gJy4vQnJlYWRjcnVtYnMuY3NzJztcblxuY29uc3QgQnJlYWRjcnVtYnMgPSAoeyBsaXN0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDx1bCBjbGFzc05hbWU9e3MubGlzdH0+XG4gICAgICAgIHtsaXN0Lm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgIGlmIChpIDwgbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtpdGVtLnRvfT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLnR4dH1cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPEZvbnRBd2Vzb21lIG5hbWU9XCJsb25nLWFycm93LXJpZ2h0XCIgLz5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgPC9Db250YWluZXI+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShCcmVhZGNydW1icyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuanMiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXMnO1xuaW1wb3J0IEJhbm5lciBmcm9tICdjb21wb25lbnRzL0Jhbm5lcic7XG5pbXBvcnQgQ29udGVudCBmcm9tICdjb21wb25lbnRzL0Jhbm5lci9jb21wb25lbnRzL0NvbnRlbnQvQ29udGVudCc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ2NvbXBvbmVudHMvQ29udGFpbmVyJztcbmltcG9ydCBUYWJzIGZyb20gJ2NvbXBvbmVudHMvVGFicyc7XG5pbXBvcnQgQ2FyZEdyaWQgZnJvbSAnY29tcG9uZW50cy9DYXJkR3JpZCc7XG5pbXBvcnQgSnVtYm90cm9uIGZyb20gJ2NvbXBvbmVudHMvSnVtYm90cm9uJztcbmltcG9ydCBBY2NlbnRQcm9kdWN0cyBmcm9tICdjb21wb25lbnRzL0FjY2VudFByb2R1Y3RzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnY29tcG9uZW50cy9CdXR0b24nO1xuaW1wb3J0IEJyZWFkY3J1bWJzIGZyb20gJ2NvbXBvbmVudHMvQnJlYWRjcnVtYnMnO1xuaW1wb3J0IHMgZnJvbSAnLi9Ib21lLmNzcyc7XG5cblxuY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbmV3czogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBsaW5rOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB9KSxcbiAgICApLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy5yb290fT5cbiAgICAgICAgPEJyZWFkY3J1bWJzXG4gICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgeyB0bzogJy8nLCB0eHQ6ICcnICB9LFxuICAgICAgICAgICAgeyAgfSxcbiAgICAgICAgICAgIHsgIH0sXG4gICAgICAgICAgICB7ICB9LFxuICAgICAgICAgICAgeyAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgICA8QmFubmVyPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxDb250ZW50XG4gICAgICAgICAgICB0aXRsZT1cIk1pbmltYWwgRnVybml0dXJlIENoYWlyIGZvciBXb3Jrc3BhY2VcIlxuICAgICAgICAgICAgcHJpY2U9XCI3NC4yOFwiXG4gICAgICAgICAgICBidXR0b25MYWJlbD1cIlNob3cgTm93XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L0Jhbm5lcj5cbiAgICAgICAgPEFjY2VudFByb2R1Y3RzXG4gICAgICAgICAgY2xhc3Nlcz17eyByb290OiBzLmFjY2VudFByb2R1Y3RzIH19XG4gICAgICAgIC8+XG4gICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgIDxKdW1ib3Ryb24gY2xhc3Nlcz17e1xuICAgICAgICAgICByb290OiBzLmp1bWJvdHJvbixcbiAgICAgICAgIH19XG4gICAgICAgICAvPlxuICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3MuaGVhZGVyfT5cbiAgICAgICAgICAgPGgxIGNsYXNzTmFtZT17cy50aXRsZX0+XG4gICAgICAgICAgICAgVHJlbmRpbmcgUHJvZHVjdHNcbiAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzLmRldmlkZXJ9IC8+XG4gICAgICAgICAgIDxwIGNsYXNzTmFtZT17cy5kZXNjcn0+XG4gICAgICAgICAgICAgQSBjb2xsZWN0aW9uIG9mIHRleHRpbGUgc2FtcGxlcyBsYXkgc3ByZWFkIG91dCBvbiB0aGUgdGFibGUgU2Ftc2Egd2FzIGEgdHJhdmVsbGVkXG4gICAgICAgICAgIDwvcD5cbiAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgPFRhYnNcbiAgICAgICAgICBjbGFzc2VzPXt7XG4gICAgICAgICAgICBoZWFkZXI6IHMudGFic0hlYWRlcixcbiAgICAgICAgICAgIHJvb3Q6ICcnLFxuICAgICAgICAgIH19XG4gICAgICAgICAgcGFuZWxzPXtbXG4gICAgICAgICAgICB7IHJlbmRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgIDxDYXJkR3JpZFxuICAgICAgICAgICAgICAgICAgbGlzdD17W1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJy0yMCUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3RhcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FpYWlhaSBUTUEtMSBTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOiAnSGVhZHBob25lcyxTdHVkaW8nLFxuICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAnJDEyNScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeHQ6ICctMjAlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnLTIwJScsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWxUeXBlOiAndGFwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWlhaWFpIFRNQS0xIFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgYnJhbmQ6ICdIZWFkcGhvbmVzLFN0dWRpbycsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpY2U6ICckMTI1JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR4dDogJ091dFxcbm9mXFxuU3RvY2snLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHlwZTogJ3N0b2NrJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBaWFpYWkgVE1BLTEgU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBicmFuZDogJ0hlYWRwaG9uZXMsU3R1ZGlvJyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmljZTogJyQxMjUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsVHh0OiAnTmV3JyxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbFR5cGU6ICd0YXBlJyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIH1cbiAgICAgICAgICBdfVxuICAgICAgICAgLz5cbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmxvYWRNb3JlfT5cbiAgICAgICAgICAgPEJ1dHRvbj5cbiAgICAgICAgICAgICBMb2FkIE1vcmVcbiAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShIb21lKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2hvbWUvSG9tZS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBZkE7QUFDQTtBQW9CQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUE1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFBQTtBQU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BOzs7O0FBaElBO0FBQ0E7QUFEQTs7OztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUZBOztBQWtJQTs7OztBIiwic291cmNlUm9vdCI6IiJ9