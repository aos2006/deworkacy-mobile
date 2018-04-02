require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./src/modules/User/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return register; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");


var register = function register(_ref) {
  var email = _ref.email,
      password = _ref.password,
      name = _ref.name,
      phone = _ref.phone;
  return {
    type: __WEBPACK_IMPORTED_MODULE_1_modules_Api__["a" /* default */].types.REQUEST_START,
    name: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["REGISTER"],
    url: 'http://127.0.0.1:8000/user/',
    method: 'post',
    params: {
      body: {
        name: name,
        phone: phone,
        email: email,
        password: password
      }
    }
  };
};

/***/ }),

/***/ "./src/modules/User/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultState */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_utils__ = __webpack_require__("./src/modules/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionTypes__ = __webpack_require__("./src/modules/User/actionTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_Api__ = __webpack_require__("./src/modules/Api/index.js");
var _createReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var defaultState = {
  id: null,
  isActive: false,
  register: {
    isLoading: false,
    errors: {
      name: null,
      phone: null,
      email: null,
      password: null
    },
    fields: {
      name: null,
      phone: null,
      email: null,
      password: null
    }
  }
};

var create = function create(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], {});
};

var fail = function fail(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], false).setIn(['register', 'errors'], payload.data);
};

var start = function start(state, action) {
  var payload = action.payload;
  return state.setIn(['register', 'isLoading'], true).setIn(['register', 'errors'], {});
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["a" /* createReducer */])(defaultState, (_createReducer = {}, _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_FAIL, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(fail, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_SUCCESS, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(create, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _defineProperty(_createReducer, __WEBPACK_IMPORTED_MODULE_2_modules_Api__["a" /* default */].types.REQUEST_START, Object(__WEBPACK_IMPORTED_MODULE_0_modules_utils__["b" /* taggedReducer */])(start, __WEBPACK_IMPORTED_MODULE_1__actionTypes__["REGISTER"])), _createReducer)));

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjhlNzhiNDk4ZmI3ZGQ5MDU2N2Y5LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvVXNlci9hY3Rpb25zLmpzIiwiL2hvbWUvYW50b24vUHJvamVjdHMvbWRhZWNvbW1lcmNlLWNsaWVudC9zcmMvbW9kdWxlcy9Vc2VyL3JlZHVjZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgQXBpIGZyb20gJ21vZHVsZXMvQXBpJztcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKHsgZW1haWwsIHBhc3N3b3JkLCBuYW1lLCBwaG9uZSB9KSA9PiAoe1xuICB0eXBlOiBBcGkudHlwZXMuUkVRVUVTVF9TVEFSVCxcbiAgbmFtZTogdHlwZXMuUkVHSVNURVIsXG4gIHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyLycsXG4gIG1ldGhvZDogJ3Bvc3QnLFxuICBwYXJhbXM6IHtcbiAgICBib2R5OiB7XG4gICAgICBuYW1lLFxuICAgICAgcGhvbmUsXG4gICAgICBlbWFpbCxcbiAgICAgIHBhc3N3b3JkLFxuICAgIH1cbiAgfSxcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL1VzZXIvYWN0aW9ucy5qcyIsImltcG9ydCB7IGNyZWF0ZVJlZHVjZXIsIHRhZ2dlZFJlZHVjZXIgfSBmcm9tICdtb2R1bGVzL3V0aWxzJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IEFwaSBmcm9tICdtb2R1bGVzL0FwaSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gIGlkOiBudWxsLFxuICBpc0FjdGl2ZTogZmFsc2UsXG4gIHJlZ2lzdGVyOiB7XG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICBlcnJvcnM6IHtcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICBwaG9uZTogbnVsbCxcbiAgICAgIGVtYWlsOiBudWxsLFxuICAgICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgfSxcbiAgICBmaWVsZHM6IHtcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICBwaG9uZTogbnVsbCxcbiAgICAgIGVtYWlsOiBudWxsLFxuICAgICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IGNyZWF0ZSA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICByZXR1cm4gc3RhdGVcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdpc0xvYWRpbmcnXSwgZmFsc2UpXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnZXJyb3JzJ10sIHt9KTtcbn07XG5cbmNvbnN0IGZhaWwgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgcmV0dXJuIHN0YXRlXG4gICAgLnNldEluKFsncmVnaXN0ZXInLCAnaXNMb2FkaW5nJ10sIGZhbHNlKVxuICAgIC5zZXRJbihbJ3JlZ2lzdGVyJywgJ2Vycm9ycyddLCBwYXlsb2FkLmRhdGEpO1xufVxuXG5jb25zdCBzdGFydCA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICByZXR1cm4gc3RhdGVcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdpc0xvYWRpbmcnXSwgdHJ1ZSlcbiAgICAuc2V0SW4oWydyZWdpc3RlcicsICdlcnJvcnMnXSwge30pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoZGVmYXVsdFN0YXRlLCB7XG4gIFtBcGkudHlwZXMuUkVRVUVTVF9GQUlMXTogdGFnZ2VkUmVkdWNlcihmYWlsLCB0eXBlcy5SRUdJU1RFUiksXG4gIFtBcGkudHlwZXMuUkVRVUVTVF9TVUNDRVNTXTogdGFnZ2VkUmVkdWNlcihjcmVhdGUsIHR5cGVzLlJFR0lTVEVSKSxcbiAgW0FwaS50eXBlcy5SRVFVRVNUX1NUQVJUXTogdGFnZ2VkUmVkdWNlcihzdGFydCwgdHlwZXMuUkVHSVNURVIpLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvVXNlci9yZWR1Y2VyLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFMQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVJBO0FBSEE7QUFDQTtBQW1CQTtBQUFBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFFQTs7OztBIiwic291cmNlUm9vdCI6IiJ9