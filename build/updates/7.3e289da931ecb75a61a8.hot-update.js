require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./node_modules/css-loader/index.js??ref--1-rules-2!./node_modules/postcss-loader/lib/index.js??ref--1-rules-3!./src/components/Breadcrumbs/Breadcrumbs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Breadcrumbs-root-1_JgR {\n  background-color: rgb(241, 243, 247);\n}\n\n.Breadcrumbs-list-3-b3p {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.Breadcrumbs-item-K2F3w {\n\n}\n\n.Breadcrumbs-arrow-29dRo {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n\n.Breadcrumbs-link-103LO {\n  \n}\n", "", {"version":3,"sources":["/home/anton/Projects/mdaecommerce-client/src/components/Breadcrumbs/Breadcrumbs.css"],"names":[],"mappings":"AAAA;EACE,qCAAqC;CACtC;;AAED;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,qBAAqB;MACjB,4BAA4B;CACjC;;AAED;;CAEC;;AAED;EACE,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;;CAEC","file":"Breadcrumbs.css","sourcesContent":[".root {\n  background-color: rgb(241, 243, 247);\n}\n\n.list {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n.item {\n\n}\n\n.arrow {\n  margin-left: 18px;\n  margin-right: 18px;\n}\n\n.link {\n  \n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Breadcrumbs-root-1_JgR",
	"list": "Breadcrumbs-list-3-b3p",
	"item": "Breadcrumbs-item-K2F3w",
	"arrow": "Breadcrumbs-arrow-29dRo",
	"link": "Breadcrumbs-link-103LO"
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

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjNlMjg5ZGE5MzFlY2I3NWE2MWE4LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkJyZWFkY3J1bWJzLXJvb3QtMV9KZ1Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MSwgMjQzLCAyNDcpO1xcbn1cXG5cXG4uQnJlYWRjcnVtYnMtbGlzdC0zLWIzcCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5CcmVhZGNydW1icy1pdGVtLUsyRjN3IHtcXG5cXG59XFxuXFxuLkJyZWFkY3J1bWJzLWFycm93LTI5ZFJvIHtcXG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xcbn1cXG5cXG4uQnJlYWRjcnVtYnMtbGluay0xMDNMTyB7XFxuICBcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYnMvQnJlYWRjcnVtYnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUNBQXFDO0NBQ3RDOztBQUVEO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHFCQUFxQjtNQUNqQiw0QkFBNEI7Q0FDakM7O0FBRUQ7O0NBRUM7O0FBRUQ7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0NBQ3BCOztBQUVEOztDQUVDXCIsXCJmaWxlXCI6XCJCcmVhZGNydW1icy5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnJvb3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MSwgMjQzLCAyNDcpO1xcbn1cXG5cXG4ubGlzdCB7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5pdGVtIHtcXG5cXG59XFxuXFxuLmFycm93IHtcXG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xcbn1cXG5cXG4ubGluayB7XFxuICBcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInJvb3RcIjogXCJCcmVhZGNydW1icy1yb290LTFfSmdSXCIsXG5cdFwibGlzdFwiOiBcIkJyZWFkY3J1bWJzLWxpc3QtMy1iM3BcIixcblx0XCJpdGVtXCI6IFwiQnJlYWRjcnVtYnMtaXRlbS1LMkYzd1wiLFxuXHRcImFycm93XCI6IFwiQnJlYWRjcnVtYnMtYXJyb3ctMjlkUm9cIixcblx0XCJsaW5rXCI6IFwiQnJlYWRjcnVtYnMtbGluay0xMDNMT1wiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYj8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS1ydWxlcy0yIS4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xLXJ1bGVzLTMhLi9zcmMvY29tcG9uZW50cy9CcmVhZGNydW1icy9CcmVhZGNydW1icy5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgTGluayBmcm9tICcuLi9MaW5rJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnY29tcG9uZW50cy9Db250YWluZXInO1xuaW1wb3J0IEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcbmltcG9ydCBzIGZyb20gJy4vQnJlYWRjcnVtYnMuY3NzJztcblxuY29uc3QgQnJlYWRjcnVtYnMgPSAoeyBsaXN0IH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3Mucm9vdH0+XG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDx1bCBjbGFzc05hbWU9e3MubGlzdH0+XG4gICAgICAgIHtsaXN0Lm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgIGlmIChpIDwgbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzLml0ZW19PlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtpdGVtLnRvfSBjbGFzc05hbWU9e3MubGlua30+XG4gICAgICAgICAgICAgICAgICB7aXRlbS50eHR9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPVwibG9uZy1hcnJvdy1yaWdodFwiIGNsYXNzTmFtZT17cy5hcnJvd30gLz5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3MuaXRlbX0+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPXtpdGVtLnRvfSBjbGFzc05hbWU9e3MubGlua30+XG4gICAgICAgICAgICAgICAge2l0ZW0udHh0fVxuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIClcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgIDwvQ29udGFpbmVyPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMocykoQnJlYWRjcnVtYnMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0JyZWFkY3J1bWJzL0JyZWFkY3J1bWJzLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBdkJBO0FBQ0E7QUE0QkE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==