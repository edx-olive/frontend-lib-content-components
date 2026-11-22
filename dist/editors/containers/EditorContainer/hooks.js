"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.saveFailed = exports.saveBlock = exports.nullMethod = exports.navigateCallback = exports.isInitialized = exports.handleSaveClicked = exports.handleCancel = exports.clearSaveError = exports.cancelConfirmModalToggle = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _analyticsEvt = _interopRequireDefault(require("../../data/constants/analyticsEvt"));
var _requests = require("../../data/constants/requests");
var _redux = require("../../data/redux");
var _utils = require("../../utils");
var appHooks = _interopRequireWildcard(require("../../hooks"));
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  clearSaveError,
  navigateCallback,
  nullMethod,
  saveBlock
} = appHooks;
exports.saveBlock = saveBlock;
exports.nullMethod = nullMethod;
exports.navigateCallback = navigateCallback;
exports.clearSaveError = clearSaveError;
const state = exports.state = (0, _utils.StrictDict)({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isCancelConfirmModalOpen: val => (0, _react.useState)(val)
});
const handleSaveClicked = ({
  dispatch,
  getContent,
  validateEntry,
  returnFunction
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const returnUrl = (0, _reactRedux.useSelector)(_redux.selectors.app.returnUrl);
  const destination = returnFunction ? '' : returnUrl;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const analytics = (0, _reactRedux.useSelector)(_redux.selectors.app.analytics);
  return () => saveBlock({
    analytics,
    content: getContent({
      dispatch
    }),
    destination,
    dispatch,
    returnFunction,
    validateEntry
  });
};
exports.handleSaveClicked = handleSaveClicked;
const cancelConfirmModalToggle = () => {
  const [isCancelConfirmOpen, setIsOpen] = _module.state.isCancelConfirmModalOpen(false);
  return {
    isCancelConfirmOpen,
    openCancelConfirmModal: () => setIsOpen(true),
    closeCancelConfirmModal: () => setIsOpen(false)
  };
};
exports.cancelConfirmModalToggle = cancelConfirmModalToggle;
const handleCancel = ({
  onClose,
  returnFunction
}) => {
  if (onClose) {
    return onClose;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const returnUrl = (0, _reactRedux.useSelector)(_redux.selectors.app.returnUrl);
  return navigateCallback({
    returnFunction,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    destination: returnFunction ? '' : returnUrl,
    analyticsEvent: _analyticsEvt.default.editorCancelClick,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    analytics: (0, _reactRedux.useSelector)(_redux.selectors.app.analytics)
  });
};

// eslint-disable-next-line react-hooks/rules-of-hooks
exports.handleCancel = handleCancel;
const isInitialized = () => (0, _reactRedux.useSelector)(_redux.selectors.app.isInitialized);

// eslint-disable-next-line react-hooks/rules-of-hooks
exports.isInitialized = isInitialized;
const saveFailed = () => (0, _reactRedux.useSelector)(rootState => _redux.selectors.requests.isFailed(rootState, {
  requestKey: _requests.RequestKeys.saveBlock
}));
exports.saveFailed = saveFailed;
//# sourceMappingURL=hooks.js.map