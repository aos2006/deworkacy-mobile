require("source-map-support").install();
exports.id = 7;
exports.modules = {

/***/ "./src/modules/Api/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hideReporter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/modules/Api/constants.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var handling = function handling(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  var error = new Error();
  error.resp = resp;
  throw error;
};

var parse = function parse(json) {
  return json.json();
};

var api = function api(_ref) {
  var url = _ref.url,
      params = _ref.params;
  return fetch(url, _extends({}, params, {
    body: JSON.stringify(params.body) || null,
    headers: _extends({
      // 'Access-Control-Allow-Headers': 'X-Requested-With',
      'Content-Type': 'application/json'
    }, params.headers)
  })).then(handling).then(parse);
};

var parametred = function parametred(method) {
  return function (_ref2) {
    var url = _ref2.url,
        params = _ref2.params;
    return api({
      url: url,
      params: _extends({}, params, {
        method: method
      })
    });
  };
};

var hideReporter = function hideReporter() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["HIDE_REPORTER"],
    payload: {}
  };
};
/* harmony default export */ __webpack_exports__["a"] = ({
  get: parametred('GET'),
  post: parametred('POST'),
  put: parametred('PUT'),
  delete: parametred('DELETE')
});

/***/ }),

/***/ "./src/modules/Api/sagas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = watchFetchRequests;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/modules/Api/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__("./src/modules/Api/actions.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetch),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFetchRequests);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



 // The watcher: watch actions and coordinate worker tasks

function getErrorData(data) {
  return data.json().then(function (data) {
    return data;
  });
}

function fetch(_ref) {
  var url, params, _ref$method, method, _ref$name, name, resp, data;

  return regeneratorRuntime.wrap(function fetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url, params = _ref.params, _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, _ref$name = _ref.name, name = _ref$name === void 0 ? 'NOTHING_TYPE' : _ref$name;
          _context.prev = 1;
          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* default */][method.toLowerCase()], {
            url: url,
            params: params
          });

        case 4:
          resp = _context.sent;
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_SUCCESS"],
            name: name,
            payload: _extends({}, resp)
          });

        case 7:
          _context.next = 16;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["call"])(getErrorData, _context.t0.resp);

        case 13:
          data = _context.sent;
          _context.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_FAIL"],
            name: name,
            payload: {
              statusText: _context.t0.resp.statusText,
              ok: _context.t0.resp.ok,
              status: _context.t0.resp.status,
              data: data
            }
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 9]]);
}

function watchFetchRequests() {
  return regeneratorRuntime.wrap(function watchFetchRequests$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_0_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_1__constants__["REQUEST_START"], fetch);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy83LjI4NDY1MDEwYmMxNTg4ZjVkMDBiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIi9ob21lL2FudG9uL1Byb2plY3RzL21kYWVjb21tZXJjZS1jbGllbnQvc3JjL21vZHVsZXMvQXBpL2FjdGlvbnMuanMiLCIvaG9tZS9hbnRvbi9Qcm9qZWN0cy9tZGFlY29tbWVyY2UtY2xpZW50L3NyYy9tb2R1bGVzL0FwaS9zYWdhcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2lzb21vcnBoaWMtZmV0Y2gnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBoYW5kbGluZyA9IHJlc3AgPT4ge1xuICBpZiAocmVzcC5zdGF0dXMgPj0gMjAwICYmIHJlc3Auc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIHJlc3A7XG4gIH1cbiAgbGV0IGVycm9yID0gbmV3IEVycm9yKCk7XG4gIGVycm9yLnJlc3AgPSByZXNwO1xuICB0aHJvdyBlcnJvcjtcbn07XG5cbmNvbnN0IHBhcnNlID0ganNvbiA9PiBqc29uLmpzb24oKTtcblxuY29uc3QgYXBpID0gKHsgdXJsLCBwYXJhbXMgfSkgPT4ge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgLi4ucGFyYW1zLFxuICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zLmJvZHkpIHx8IG51bGwsXG4gICAgaGVhZGVyczoge1xuICAgICAgLy8gJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnWC1SZXF1ZXN0ZWQtV2l0aCcsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgLi4ucGFyYW1zLmhlYWRlcnMsXG4gICAgfSxcbiAgfSlcbiAgICAudGhlbihoYW5kbGluZylcbiAgICAudGhlbihwYXJzZSlcbn1cblxuY29uc3QgcGFyYW1ldHJlZCA9IG1ldGhvZCA9PiAoeyB1cmwsIHBhcmFtcyB9KSA9PlxuICBhcGkoeyB1cmwsIHBhcmFtczogeyAuLi5wYXJhbXMsIG1ldGhvZCB9IH0pO1xuXG5leHBvcnQgY29uc3QgaGlkZVJlcG9ydGVyID0gKCkgPT4gKHtcbiAgdHlwZTogdHlwZXMuSElERV9SRVBPUlRFUixcbiAgcGF5bG9hZDoge30sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXQ6IHBhcmFtZXRyZWQoJ0dFVCcpLFxuICBwb3N0OiBwYXJhbWV0cmVkKCdQT1NUJyksXG4gIHB1dDogcGFyYW1ldHJlZCgnUFVUJyksXG4gIGRlbGV0ZTogcGFyYW1ldHJlZCgnREVMRVRFJyksXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9tb2R1bGVzL0FwaS9hY3Rpb25zLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlRXZlcnkgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGFwaSBmcm9tICcuL2FjdGlvbnMnO1xuLy8gVGhlIHdhdGNoZXI6IHdhdGNoIGFjdGlvbnMgYW5kIGNvb3JkaW5hdGUgd29ya2VyIHRhc2tzXG5mdW5jdGlvbiBnZXRFcnJvckRhdGEoZGF0YSl7XG4gIHJldHVybiBkYXRhLmpzb24oKS50aGVuKGRhdGEgPT4gZGF0YSk7XG59XG5mdW5jdGlvbiogZmV0Y2goeyB1cmwsIHBhcmFtcywgbWV0aG9kID0gJ2dldCcsIG5hbWUgPSAnTk9USElOR19UWVBFJyB9KSB7XG4gIHRyeSB7XG4gICAgLy8geWllbGQgcHV0KHsgdHlwZTogYCR7bmFtZX1fJHt0eXBlcy5SRVFVRVNUX1NUQVJUfWAsIG5hbWUgfSk7XG4gICAgY29uc3QgcmVzcCA9IHlpZWxkIGNhbGwoYXBpW21ldGhvZC50b0xvd2VyQ2FzZSgpXSwgeyB1cmwsIHBhcmFtcyB9KTtcbiAgICB5aWVsZCBwdXQoe1xuICAgICAgdHlwZTogdHlwZXMuUkVRVUVTVF9TVUNDRVNTLFxuICAgICAgbmFtZSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgLi4ucmVzcCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGV0IGRhdGEgPSB5aWVsZCBjYWxsKGdldEVycm9yRGF0YSwgZXJyb3IucmVzcCk7XG4gICAgeWllbGQgcHV0KHtcbiAgICAgIHR5cGU6IHR5cGVzLlJFUVVFU1RfRkFJTCxcbiAgICAgIG5hbWUsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3Auc3RhdHVzVGV4dCxcbiAgICAgICAgb2s6IGVycm9yLnJlc3Aub2ssXG4gICAgICAgIHN0YXR1czogZXJyb3IucmVzcC5zdGF0dXMsXG4gICAgICAgIGRhdGEsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiB3YXRjaEZldGNoUmVxdWVzdHMoKSB7XG4gIHlpZWxkIHRha2VFdmVyeSh0eXBlcy5SRVFVRVNUX1NUQVJULCBmZXRjaCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL21vZHVsZXMvQXBpL3NhZ2FzLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFIQTtBQVdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7QUEwQkE7QUFDQTs7O0FBbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBSkE7QUFHQTtBQUhBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVlBO0FBWkE7QUFBQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFIQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQXlCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==