"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AltTextControls = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Wrapper for alt-text input and isDecorative checkbox control
 * @param {obj} errorProps - props for error handling
 *   {bool} isValid - are alt-text fields valid for saving?
 * @param {bool} isDecorative - is the image decorative?
 * @param {func} setIsDecorative - handle isDecorative change event
 * @param {func} setValue - update alt-text value
 * @param {string} value - current alt-text value
 */
const AltTextControls = ({
  isDecorative,
  setIsDecorative,
  setValue,
  validation,
  value,
  // inject
  intl
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Form.Group, {
  className: "mt-4.5",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Label, {
    as: "h4",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.accessibilityLabel))
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
    className: "mt-4.5",
    disabled: isDecorative,
    floatingLabel: intl.formatMessage(_messages.default.altTextFloatingLabel),
    isInvalid: validation.show,
    onChange: hooks.onInputChange(setValue),
    type: "input",
    value: value
  }), validation.show && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control.Feedback, {
    type: "invalid",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.altTextLocalFeedback))
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Checkbox, {
    checked: isDecorative,
    className: "mt-4.5 decorative-control-label",
    onChange: hooks.onCheckboxChange(setIsDecorative),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Label, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.decorativeAltTextCheckboxLabel))
    })
  })]
});
exports.AltTextControls = AltTextControls;
AltTextControls.propTypes = {
  error: _propTypes.default.shape({
    show: _propTypes.default.bool
  }).isRequired,
  isDecorative: _propTypes.default.bool.isRequired,
  setValue: _propTypes.default.func.isRequired,
  setIsDecorative: _propTypes.default.func.isRequired,
  validation: _propTypes.default.shape({
    show: _propTypes.default.bool
  }).isRequired,
  value: _propTypes.default.string.isRequired,
  // inject
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(AltTextControls);
//# sourceMappingURL=AltTextControls.js.map