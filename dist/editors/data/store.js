"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createStore = void 0;
var redux = _interopRequireWildcard(require("redux"));
var _reduxThunk = _interopRequireDefault(require("redux-thunk"));
var _logOnlyInProduction = require("redux-devtools-extension/logOnlyInProduction");
var _reduxLogger = require("redux-logger");
var _redux2 = _interopRequireWildcard(require("./redux"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const createStore = () => {
  const loggerMiddleware = (0, _reduxLogger.createLogger)();
  const middleware = [_reduxThunk.default, loggerMiddleware];
  const store = redux.createStore(_redux2.default, (0, _logOnlyInProduction.composeWithDevTools)(redux.applyMiddleware(...middleware)));

  /**
   * Dev tools for redux work
   */
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
    window.actions = _redux2.actions;
    window.selectors = _redux2.selectors;
  }
  return store;
};
exports.createStore = createStore;
const store = createStore();
var _default = exports.default = store;
//# sourceMappingURL=store.js.map