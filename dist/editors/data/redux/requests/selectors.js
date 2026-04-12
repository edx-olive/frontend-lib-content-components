"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusSelector = exports.requestStatus = exports.isPending = exports.isInactive = exports.isFinished = exports.isFailed = exports.isCompleted = exports.errorStatus = exports.errorCode = exports.error = exports.default = exports.data = exports.connectedStatusSelectors = void 0;
var _utils = require("../../../utils");
var _requests = require("../../constants/requests");
var _module = _interopRequireWildcard(require("./selectors"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const requestStatus = (state, {
  requestKey
}) => state.requests[requestKey];
exports.requestStatus = requestStatus;
const statusSelector = fn => (state, {
  requestKey
}) => fn(state.requests[requestKey]);
exports.statusSelector = statusSelector;
const isInactive = ({
  status
}) => status === _requests.RequestStates.inactive;
exports.isInactive = isInactive;
const isPending = ({
  status
}) => status === _requests.RequestStates.pending;
exports.isPending = isPending;
const isCompleted = ({
  status
}) => status === _requests.RequestStates.completed;
exports.isCompleted = isCompleted;
const isFailed = ({
  status
}) => status === _requests.RequestStates.failed;
exports.isFailed = isFailed;
const isFinished = ({
  status
}) => [_requests.RequestStates.failed, _requests.RequestStates.completed].includes(status);
exports.isFinished = isFinished;
const error = request => request.error;
exports.error = error;
const errorStatus = request => request.error?.response?.status;
exports.errorStatus = errorStatus;
const errorCode = request => request.error?.response?.data;
exports.errorCode = errorCode;
const data = request => request.data;
exports.data = data;
const connectedStatusSelectors = () => ({
  isInactive: _module.statusSelector(isInactive),
  isPending: _module.statusSelector(isPending),
  isCompleted: _module.statusSelector(isCompleted),
  isFailed: _module.statusSelector(isFailed),
  isFinished: _module.statusSelector(isFinished),
  error: _module.statusSelector(error),
  errorCode: _module.statusSelector(errorCode),
  errorStatus: _module.statusSelector(errorStatus),
  data: _module.statusSelector(data)
});
exports.connectedStatusSelectors = connectedStatusSelectors;
var _default = exports.default = (0, _utils.StrictDict)(_objectSpread({
  requestStatus
}, _module.connectedStatusSelectors()));
//# sourceMappingURL=selectors.js.map