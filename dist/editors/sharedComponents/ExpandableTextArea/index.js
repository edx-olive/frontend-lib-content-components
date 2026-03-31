"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ExpandableTextArea = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _TinyMceWidget = _interopRequireDefault(require("../TinyMceWidget"));
var _hooks = require("../TinyMceWidget/hooks");
require("./index.scss");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["value", "setContent", "error", "errorMessage"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const ExpandableTextArea = _ref => {
  let {
      value,
      setContent,
      error,
      errorMessage
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    editorRef,
    setEditorRef
  } = (0, _hooks.prepareEditorRef)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "expandable-mce error",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TinyMceWidget.default, _objectSpread({
        editorContentHtml: value,
        editorRef: editorRef,
        editorType: "expandable",
        setEditorRef: setEditorRef,
        updateContent: setContent
      }, props))
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text-danger-500 x-small",
      children: props.errorMessage
    })]
  });
};
exports.ExpandableTextArea = ExpandableTextArea;
ExpandableTextArea.defaultProps = {
  value: null,
  placeholder: null,
  error: false,
  errorMessage: null
};
ExpandableTextArea.propTypes = {
  value: _propTypes.default.string,
  setContent: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string,
  error: _propTypes.default.bool,
  errorMessage: _propTypes.default.string
};
var _default = exports.default = ExpandableTextArea;
//# sourceMappingURL=index.js.map