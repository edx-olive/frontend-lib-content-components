"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Editor = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _supportedEditors = _interopRequireDefault(require("./supportedEditors"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Editor = ({
  learningContextId,
  blockType,
  blockId,
  lmsEndpointUrl,
  studioEndpointUrl,
  onClose,
  returnFunction
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  hooks.initializeApp({
    dispatch,
    data: {
      blockId,
      blockType,
      learningContextId,
      lmsEndpointUrl,
      studioEndpointUrl
    }
  });
  const EditorComponent = _supportedEditors.default[blockType];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "d-flex flex-column",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "pgn__modal-fullscreen",
      role: "dialog",
      "aria-label": blockType,
      children: EditorComponent !== undefined ? /*#__PURE__*/(0, _jsxRuntime.jsx)(EditorComponent, {
        onClose,
        returnFunction
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.couldNotFindEditor))
    })
  });
};
exports.Editor = Editor;
Editor.defaultProps = {
  blockId: null,
  learningContextId: null,
  lmsEndpointUrl: null,
  onClose: null,
  returnFunction: null,
  studioEndpointUrl: null
};
Editor.propTypes = {
  blockId: _propTypes.default.string,
  blockType: _propTypes.default.string.isRequired,
  learningContextId: _propTypes.default.string,
  lmsEndpointUrl: _propTypes.default.string,
  onClose: _propTypes.default.func,
  returnFunction: _propTypes.default.func,
  studioEndpointUrl: _propTypes.default.string
};
var _default = exports.default = Editor;
//# sourceMappingURL=Editor.js.map