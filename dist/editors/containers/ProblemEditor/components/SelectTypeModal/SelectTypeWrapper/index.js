"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectTypeWrapper = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _SelectTypeFooter = _interopRequireDefault(require("./SelectTypeFooter"));
var hooks = _interopRequireWildcard(require("../../../../EditorContainer/hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const SelectTypeWrapper = ({
  children,
  onClose,
  selected
}) => {
  const handleCancel = hooks.handleCancel({
    onClose
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "position-relative zindex-0",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Header, {
      className: "shadow-sm zindex-10",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ModalDialog.Title, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.selectTypeTitle)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "pgn__modal-close-container",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
            src: _icons.Close,
            iconAs: _paragon.Icon,
            onClick: handleCancel
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ModalDialog.Body, {
      className: "pb-6",
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectTypeFooter.default, {
      selected: selected,
      onCancel: handleCancel
    })]
  });
};
exports.SelectTypeWrapper = SelectTypeWrapper;
SelectTypeWrapper.defaultProps = {
  onClose: null
};
SelectTypeWrapper.propTypes = {
  selected: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,
  onClose: _propTypes.default.func
};
var _default = exports.default = (0, _i18n.injectIntl)(SelectTypeWrapper);
//# sourceMappingURL=index.js.map