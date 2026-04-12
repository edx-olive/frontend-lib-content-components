"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CodeEditor = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
require("./index.scss");
var hooks = _interopRequireWildcard(require("./hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CodeEditor = ({
  innerRef,
  value,
  lang,
  // injected
  intl
}) => {
  const DOMref = (0, _react.useRef)();
  const btnRef = (0, _react.useRef)();
  hooks.createCodeMirrorDomNode({
    ref: DOMref,
    initialText: value,
    upstreamRef: innerRef,
    lang
  });
  const {
    showBtnEscapeHTML,
    hideBtn
  } = hooks.prepareShowBtnEscapeHTML();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      id: "CodeMirror",
      ref: DOMref
    }), showBtnEscapeHTML && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "tertiary",
      "aria-label": intl.formatMessage(_messages.default.escapeHTMLButtonLabel),
      ref: btnRef,
      onClick: () => hooks.escapeHTMLSpecialChars({
        ref: innerRef,
        hideBtn
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.escapeHTMLButtonLabel))
    })]
  });
};
exports.CodeEditor = CodeEditor;
CodeEditor.propTypes = {
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func,
  // eslint-disable-next-line react/forbid-prop-types
  _propTypes.default.shape({
    current: _propTypes.default.any
  })]).isRequired,
  value: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  lang: _propTypes.default.string.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(CodeEditor);
//# sourceMappingURL=index.js.map