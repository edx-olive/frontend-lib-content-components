"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveBlock = exports.nullMethod = exports.navigateTo = exports.navigateCallback = exports.initializeApp = exports.clearSaveError = void 0;
var _react = require("react");
var _analytics = require("@edx/frontend-platform/analytics");
var _analyticsEvt = _interopRequireDefault(require("./data/constants/analyticsEvt"));
var _redux = require("./data/redux");
var _module = _interopRequireWildcard(require("./hooks"));
var _requests = require("./data/constants/requests");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line react-hooks/rules-of-hooks
const initializeApp = ({
  dispatch,
  data
}) => (0, _react.useEffect)(() => dispatch(_redux.thunkActions.app.initialize(data)), [data]);
exports.initializeApp = initializeApp;
const navigateTo = destination => {
  window.location.assign(destination);
};
exports.navigateTo = navigateTo;
const navigateCallback = ({
  returnFunction,
  destination,
  analyticsEvent,
  analytics
}) => response => {
  if (process.env.NODE_ENV !== 'development' && analyticsEvent && analytics) {
    (0, _analytics.sendTrackEvent)(analyticsEvent, analytics);
  }
  if (returnFunction) {
    returnFunction()(response);
    return;
  }
  _module.navigateTo(destination);
};
exports.navigateCallback = navigateCallback;
const nullMethod = () => ({});
exports.nullMethod = nullMethod;
const saveBlock = ({
  analytics,
  content,
  destination,
  dispatch,
  returnFunction,
  validateEntry
}) => {
  if (!content) {
    return;
  }
  let attemptSave = false;
  if (validateEntry) {
    if (validateEntry()) {
      attemptSave = true;
    }
  } else {
    attemptSave = true;
  }
  if (attemptSave) {
    dispatch(_redux.thunkActions.app.saveBlock(content, _module.navigateCallback({
      destination,
      analyticsEvent: _analyticsEvt.default.editorSaveClick,
      analytics,
      returnFunction
    })));
  }
};
exports.saveBlock = saveBlock;
const clearSaveError = ({
  dispatch
}) => () => dispatch(_redux.actions.requests.clearRequest({
  requestKey: _requests.RequestKeys.saveBlock
}));
exports.clearSaveError = clearSaveError;
//# sourceMappingURL=hooks.js.map