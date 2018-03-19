require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./src/routes/index.js":
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
      return new Promise(function(resolve) { resolve(__webpack_require__("./src/routes/home/index.js")); });
    }
  }, {
    path: '/products',
    load: function load() {
      return __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, "./src/routes/products/index.js"));
    }
  }, {
    path: '/contact',
    load: function load() {
      return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "./src/routes/contact/index.js"));
    }
  }, {
    path: '/about',
    load: function load() {
      return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, "./src/routes/about/index.js"));
    }
  }, {
    path: '/privacy',
    load: function load() {
      return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "./src/routes/privacy/index.js"));
    }
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: function load() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, "./src/routes/not-found/index.js"));
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

if (true) {
  routes.children.unshift({
    path: '/error',
    action: __webpack_require__("./src/routes/error/index.js").default
  });
}

/* harmony default export */ __webpack_exports__["a"] = (routes);

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83Ljg2MzQ2YjhmZDM4ZDdhOTMyNmYyLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3JvdXRlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG5cbi8vIFRoZSB0b3AtbGV2ZWwgKHBhcmVudCkgcm91dGVcbmNvbnN0IHJvdXRlcyA9IHtcbiAgcGF0aDogJycsXG5cbiAgLy8gS2VlcCBpbiBtaW5kLCByb3V0ZXMgYXJlIGV2YWx1YXRlZCBpbiBvcmRlclxuICBjaGlsZHJlbjogW1xuICAgIC8vIFRoZSBob21lIHJvdXRlIGlzIGFkZGVkIHRvIGNsaWVudC5qcyB0byBtYWtlIHN1cmUgc2hhcmVkIGNvbXBvbmVudHMgYXJlXG4gICAgLy8gYWRkZWQgdG8gY2xpZW50LmpzIGFzIHdlbGwgYW5kIG5vdCByZXBlYXRlZCBpbiBlYWNoIGluZGl2aWR1YWwgcm91dGUgY2h1bmsuXG4gICAge1xuICAgICAgcGF0aDogJycsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja01vZGU6ICdlYWdlcicgKi8gJy4vaG9tZScpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9wcm9kdWN0cycsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3Byb2R1Y3RzJyAqLyAnLi9wcm9kdWN0cycpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9jb250YWN0JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnY29udGFjdCcgKi8gJy4vY29udGFjdCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9hYm91dCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2Fib3V0JyAqLyAnLi9hYm91dCcpLFxuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy9wcml2YWN5JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAncHJpdmFjeScgKi8gJy4vcHJpdmFjeScpLFxuICAgIH0sXG4gICAgLy8gV2lsZGNhcmQgcm91dGVzLCBlLmcuIHsgcGF0aDogJyguKiknLCAuLi4gfSAobXVzdCBnbyBsYXN0KVxuICAgIHtcbiAgICAgIHBhdGg6ICcoLiopJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnbm90LWZvdW5kJyAqLyAnLi9ub3QtZm91bmQnKSxcbiAgICB9LFxuICBdLFxuXG4gIGFzeW5jIGFjdGlvbih7IG5leHQgfSkge1xuICAgIC8vIEV4ZWN1dGUgZWFjaCBjaGlsZCByb3V0ZSB1bnRpbCBvbmUgb2YgdGhlbSByZXR1cm4gdGhlIHJlc3VsdFxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgbmV4dCgpO1xuXG4gICAgLy8gUHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGl0bGUsIGRlc2NyaXB0aW9uIGV0Yy5cbiAgICByb3V0ZS50aXRsZSA9IGAke3JvdXRlLnRpdGxlIHx8ICdVbnRpdGxlZCBQYWdlJ30gLSB3d3cucmVhY3RzdGFydGVya2l0LmNvbWA7XG4gICAgcm91dGUuZGVzY3JpcHRpb24gPSByb3V0ZS5kZXNjcmlwdGlvbiB8fCAnJztcblxuICAgIHJldHVybiByb3V0ZTtcbiAgfSxcbn07XG5cbi8vIFRoZSBlcnJvciBwYWdlIGlzIGF2YWlsYWJsZSBieSBwZXJtYW5lbnQgdXJsIGZvciBkZXZlbG9wbWVudCBtb2RlXG5pZiAoX19ERVZfXykge1xuICByb3V0ZXMuY2hpbGRyZW4udW5zaGlmdCh7XG4gICAgcGF0aDogJy9lcnJvcicsXG4gICAgYWN0aW9uOiByZXF1aXJlKCcuL2Vycm9yJykuZGVmYXVsdCxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm91dGVzL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQU1BO0FBbENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQ0E7QUFsQ0E7QUFBQTtBQUNBO0FBREE7QUFvQ0E7QUFFQTtBQUNBO0FBQ0E7QUF4Q0E7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUE4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9