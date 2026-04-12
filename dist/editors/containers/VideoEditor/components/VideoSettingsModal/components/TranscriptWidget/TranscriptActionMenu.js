"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.hooks = exports.default = exports.TranscriptActionMenu = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _redux = require("../../../../../../data/redux");
var _FileInput = require("../../../../../../sharedComponents/FileInput");
var _module = _interopRequireWildcard(require("./TranscriptActionMenu"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const hooks = exports.hooks = {
  replaceFileCallback: ({
    language,
    dispatch
  }) => file => {
    dispatch(_redux.thunkActions.video.replaceTranscript({
      newFile: file,
      newFilename: file.name,
      language
    }));
  }
};
const TranscriptActionMenu = ({
  index,
  language,
  transcriptUrl,
  launchDeleteConfirmation,
  // redux
  getTranscriptDownloadUrl,
  buildTranscriptUrl
}) => {
  const input = (0, _FileInput.fileInput)({
    onAddFile: _module.hooks.replaceFileCallback({
      language,
      dispatch: (0, _reactRedux.useDispatch)()
    })
  });
  const downloadLink = transcriptUrl ? buildTranscriptUrl({
    transcriptUrl
  }) : getTranscriptDownloadUrl({
    language
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Toggle, {
      id: "dropdown-toggle-with-iconbutton-video-transcript-widget",
      as: _paragon.IconButton,
      src: _icons.MoreHoriz,
      iconAs: _paragon.Icon,
      variant: "primary",
      alt: "Actions dropdown"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown.Menu, {
      className: "video_transcript Action Menu",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
        onClick: input.click,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.replaceTranscript))
      }, `transcript-actions-${index}-replace`), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
        href: downloadLink,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.downloadTranscript))
      }, `transcript-actions-${index}-download`), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
        onClick: launchDeleteConfirmation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.deleteTranscript))
      }, `transcript-actions-${index}-delete`)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FileInput.FileInput, {
      fileInput: input,
      acceptedFiles: ".srt"
    })]
  });
};
exports.TranscriptActionMenu = TranscriptActionMenu;
TranscriptActionMenu.defaultProps = {
  transcriptUrl: undefined
};
TranscriptActionMenu.propTypes = {
  index: _propTypes.default.number.isRequired,
  language: _propTypes.default.string.isRequired,
  transcriptUrl: _propTypes.default.string,
  launchDeleteConfirmation: _propTypes.default.func.isRequired,
  // redux
  getTranscriptDownloadUrl: _propTypes.default.func.isRequired,
  buildTranscriptUrl: _propTypes.default.func.isRequired
};
const mapStateToProps = state => ({
  getTranscriptDownloadUrl: _redux.selectors.video.getTranscriptDownloadUrl(state),
  buildTranscriptUrl: _redux.selectors.video.buildTranscriptUrl(state)
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = exports.mapDispatchToProps = {
  downloadTranscript: _redux.thunkActions.video.downloadTranscript
};
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TranscriptActionMenu));
//# sourceMappingURL=TranscriptActionMenu.js.map