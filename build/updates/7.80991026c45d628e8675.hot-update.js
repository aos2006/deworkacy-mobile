require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./src/modules/User/sagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _callee;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history__ = __webpack_require__("./src/history.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchRegister),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(_callee);




 // The watcher: watch actions and coordinate worker tasks

function watchRegister(action) {
  var payload, name;
  return regeneratorRuntime.wrap(function watchRegister$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, name = action.name;

          if (name === __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"]) {
            __WEBPACK_IMPORTED_MODULE_3__history__["a" /* default */].push('/personal');
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, watchRegister);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjgwOTkxMDI2YzQ1ZDYyOGU4Njc1LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9zYWdhcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeSc7XG4vLyBUaGUgd2F0Y2hlcjogd2F0Y2ggYWN0aW9ucyBhbmQgY29vcmRpbmF0ZSB3b3JrZXIgdGFza3NcblxuZnVuY3Rpb24qIHdhdGNoUmVnaXN0ZXIoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcGF5bG9hZCwgbmFtZSB9ID0gYWN0aW9uO1xuICBpZiAobmFtZSA9PT0gdHlwZXMuUkVHSVNURVIpIHtcbiAgICBoaXN0b3J5LnB1c2goJy9wZXJzb25hbCcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKigpIHtcbiAgeWllbGQgdGFrZUV2ZXJ5KEFwaS50eXBlcy5SRVFVRVNUX1NUQVJULCB3YXRjaFJlZ2lzdGVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvbW9kdWxlcy9Vc2VyL3NhZ2FzLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7O0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==