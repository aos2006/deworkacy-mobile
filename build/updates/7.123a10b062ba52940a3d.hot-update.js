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
          console.log(action);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjEyM2ExMGIwNjJiYTUyOTQwYTNkLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9zYWdhcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuLy8gVGhlIHdhdGNoZXI6IHdhdGNoIGFjdGlvbnMgYW5kIGNvb3JkaW5hdGUgd29ya2VyIHRhc2tzXG5cbmZ1bmN0aW9uKiB3YXRjaFJlZ2lzdGVyKGFjdGlvbikge1xuICBjb25zdCB7IHBheWxvYWQsIG5hbWUgfSA9IGFjdGlvbjtcbiAgY29uc29sZS5sb2coYWN0aW9uKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiooKSB7XG4gIHlpZWxkIHRha2VFdmVyeShBcGkudHlwZXMuUkVRVUVTVF9TVEFSVCwgd2F0Y2hSZWdpc3Rlcik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9zYWdhcy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7Ozs7O0FBTEE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=