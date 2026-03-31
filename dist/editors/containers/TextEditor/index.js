"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.TextEditor = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _redux = require("../../data/redux");
var _requests = require("../../data/constants/requests");
var _EditorContainer = _interopRequireDefault(require("../EditorContainer"));
var _RawEditor = _interopRequireDefault(require("../../sharedComponents/RawEditor"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _TinyMceWidget = _interopRequireDefault(require("../../sharedComponents/TinyMceWidget"));
var _hooks2 = require("../../sharedComponents/TinyMceWidget/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const TextEditor = ({
  onClose,
  returnFunction,
  // redux
  isRaw,
  blockValue,
  blockFailed,
  initializeEditor,
  assetsFinished,
  assets,
  // inject
  intl
}) => {
  const {
    editorRef,
    refReady,
    setEditorRef
  } = (0, _hooks2.prepareEditorRef)();
  if (!refReady) {
    return null;
  }
  const selectEditor = () => {
    if (isRaw) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RawEditor.default, {
        editorRef: editorRef,
        content: blockValue
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TinyMceWidget.default, {
      editorType: "text",
      editorRef: editorRef,
      editorContentHtml: blockValue ? blockValue.data.data : '',
      setEditorRef: setEditorRef,
      minHeight: 500,
      height: "100%",
      initializeEditor: initializeEditor
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditorContainer.default, {
    getContent: hooks.getContent({
      editorRef,
      isRaw,
      assets
    }),
    onClose: onClose,
    returnFunction: returnFunction,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "editor-body h-75 overflow-auto",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Toast, {
        show: blockFailed,
        onClose: hooks.nullMethod,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.couldNotLoadTextContext))
      }), !assetsFinished ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text-center p-6",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
          animation: "border",
          className: "m-3",
          screenreadertext: intl.formatMessage(_messages.default.spinnerScreenReaderText)
        })
      }) : selectEditor()]
    })
  });
};
exports.TextEditor = TextEditor;
TextEditor.defaultProps = {
  blockValue: null,
  isRaw: null,
  assetsFinished: null,
  assets: null,
  returnFunction: null
};
TextEditor.propTypes = {
  onClose: _propTypes.default.func.isRequired,
  returnFunction: _propTypes.default.func,
  // redux
  blockValue: _propTypes.default.shape({
    data: _propTypes.default.shape({
      data: _propTypes.default.string
    })
  }),
  blockFailed: _propTypes.default.bool.isRequired,
  initializeEditor: _propTypes.default.func.isRequired,
  isRaw: _propTypes.default.bool,
  assetsFinished: _propTypes.default.bool,
  assets: _propTypes.default.shape({}),
  // inject
  intl: _i18n.intlShape.isRequired
};
const mapStateToProps = state => ({
  blockValue: _redux.selectors.app.blockValue(state),
  blockFailed: _redux.selectors.requests.isFailed(state, {
    requestKey: _requests.RequestKeys.fetchBlock
  }),
  isRaw: _redux.selectors.app.isRaw(state),
  assetsFinished: _redux.selectors.requests.isFinished(state, {
    requestKey: _requests.RequestKeys.fetchAssets
  }),
  assets: _redux.selectors.app.assets(state)
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = exports.mapDispatchToProps = {
  initializeEditor: _redux.actions.app.initializeEditor
};
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TextEditor));
//# sourceMappingURL=index.js.map