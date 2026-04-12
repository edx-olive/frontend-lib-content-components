"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectors = exports.default = exports.actions = void 0;
Object.defineProperty(exports, "thunkActions", {
  enumerable: true,
  get: function () {
    return _thunkActions.default;
  }
});
var _redux = require("redux");
var _utils = require("../../utils");
var app = _interopRequireWildcard(require("./app"));
var requests = _interopRequireWildcard(require("./requests"));
var video = _interopRequireWildcard(require("./video"));
var problem = _interopRequireWildcard(require("./problem"));
var game = _interopRequireWildcard(require("./game"));
var _thunkActions = _interopRequireDefault(require("./thunkActions"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable import/no-cycle */
const modules = {
  app,
  requests,
  video,
  problem,
  game
};
const moduleProps = propName => Object.keys(modules).reduce((obj, moduleKey) => _objectSpread(_objectSpread({}, obj), {}, {
  [moduleKey]: modules[moduleKey][propName]
}), {});
const rootReducer = (0, _redux.combineReducers)(moduleProps('reducer'));
const actions = exports.actions = (0, _utils.StrictDict)(moduleProps('actions'));
const selectors = exports.selectors = (0, _utils.StrictDict)(moduleProps('selectors'));
var _default = exports.default = rootReducer;
//# sourceMappingURL=index.js.map