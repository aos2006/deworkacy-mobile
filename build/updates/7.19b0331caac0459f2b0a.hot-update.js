require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./src/modules/User/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Register__ = __webpack_require__("./src/modules/User/components/Register/Register.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Register__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__("./src/modules/User/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sagas__ = __webpack_require__("./src/modules/User/sagas.js");




/* harmony default export */ __webpack_exports__["b"] = ({
  reducer: __WEBPACK_IMPORTED_MODULE_1__reducer__["a" /* default */],
  types: __WEBPACK_IMPORTED_MODULE_2__actionTypes__,
  saga: __WEBPACK_IMPORTED_MODULE_3__sagas__["a" /* default */]
});

/***/ }),

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
          console.log(name);

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

/***/ }),

/***/ "./src/rootSagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_User__ = __webpack_require__("./src/modules/User/index.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);




function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["all"])([__WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].saga(), __WEBPACK_IMPORTED_MODULE_2_modules_User__["b" /* default */].saga()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjE5YjAzMzFjYWFjMDQ1OWYyYjBhLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9pbmRleC5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9zYWdhcy5qcyIsIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL3Jvb3RTYWdhcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkZWZhdWx0IGFzIFJlZ2lzdGVyRm9ybSB9IGZyb20gJy4vY29tcG9uZW50cy9SZWdpc3Rlcic7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgc2FnYSBmcm9tICcuL3NhZ2FzJztcblxuZXhwb3J0IGRlZmF1bHQgeyByZWR1Y2VyLCB0eXBlcywgc2FnYSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvaW5kZXguanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VFdmVyeSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCBBcGkgZnJvbSAnbW9kdWxlcy9BcGknO1xuLy8gVGhlIHdhdGNoZXI6IHdhdGNoIGFjdGlvbnMgYW5kIGNvb3JkaW5hdGUgd29ya2VyIHRhc2tzXG5cbmZ1bmN0aW9uKiB3YXRjaFJlZ2lzdGVyKGFjdGlvbikge1xuICBjb25zdCB7IHBheWxvYWQsIG5hbWUgfSA9IGFjdGlvbjtcbiAgY29uc29sZS5sb2cobmFtZSk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICB5aWVsZCB0YWtlRXZlcnkoQXBpLnR5cGVzLlJFUVVFU1RfU1RBUlQsIHdhdGNoUmVnaXN0ZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvc2FnYXMuanMiLCJpbXBvcnQgeyBhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IEFwaSBmcm9tICdtb2R1bGVzL0FwaSc7XG5pbXBvcnQgVXNlciBmcm9tICdtb2R1bGVzL1VzZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogcm9vdFNhZ2EoKSB7XG4gIHlpZWxkIGFsbChbXG4gICAgQXBpLnNhZ2EoKSxcbiAgICBVc2VyLnNhZ2EoKSxcbiAgXSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvcm9vdFNhZ2FzLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7OztBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUxBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9