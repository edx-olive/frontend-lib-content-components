"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.ThumbnailWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _redux = require("../../../../../../data/redux");
var _api = require("../../../../../../data/services/cms/api");
var _constants = require("./constants");
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _CollapsibleFormWidget = _interopRequireDefault(require("../CollapsibleFormWidget"));
var _FileInput = _interopRequireDefault(require("../../../../../../sharedComponents/FileInput"));
var _ErrorAlert = _interopRequireDefault(require("../../../../../../sharedComponents/ErrorAlerts/ErrorAlert"));
var _hooks2 = require("../../../../hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Collapsible Form widget controlling video thumbnail
 */
const ThumbnailWidget = ({
  // injected
  intl,
  // redux
  isLibrary,
  allowThumbnailUpload,
  thumbnail,
  videoId
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const [error] = _react.default.useContext(_hooks2.ErrorContext).thumbnail;
  const imgRef = _react.default.useRef();
  const [thumbnailSrc, setThumbnailSrc] = _react.default.useState(thumbnail);
  const {
    fileSizeError
  } = hooks.fileSizeError();
  const fileInput = hooks.fileInput({
    setThumbnailSrc,
    imgRef,
    fileSizeError
  });
  const edxVideo = (0, _api.isEdxVideo)(videoId);
  const deleteThumbnail = hooks.deleteThumbnail({
    dispatch
  });
  const getSubtitle = () => {
    if (edxVideo) {
      if (thumbnail) {
        return intl.formatMessage(_messages.default.yesSubtitle);
      }
      return intl.formatMessage(_messages.default.noneSubtitle);
    }
    return intl.formatMessage(_messages.default.unavailableSubtitle);
  };
  return !isLibrary ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CollapsibleFormWidget.default, {
    fontSize: "x-small",
    isError: Object.keys(error).length !== 0,
    title: intl.formatMessage(_messages.default.title),
    subtitle: getSubtitle(),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorAlert.default, {
      dismissError: fileSizeError.dismiss,
      hideHeading: true,
      isError: fileSizeError.show,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.fileSizeError))
    }), edxVideo ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
      variant: "light",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.unavailableMessage))
    }), thumbnail ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
      direction: "horizontal",
      gap: 3,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Image, {
        thumbnail: true,
        fluid: true,
        className: "w-75",
        ref: imgRef,
        src: thumbnailSrc || thumbnail,
        alt: intl.formatMessage(_messages.default.thumbnailAltText)
      }), allowThumbnailUpload && edxVideo ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButtonWithTooltip, {
        tooltipPlacement: "top",
        tooltipContent: intl.formatMessage(_messages.default.deleteThumbnail),
        iconAs: _paragon.Icon,
        src: _icons.DeleteOutline,
        onClick: deleteThumbnail
      }) : null]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
      gap: 4,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "text-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.addThumbnail)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "text-primary-300",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.aspectRequirements))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FileInput.default, {
        fileInput: fileInput,
        acceptedFiles: Object.values(_constants.acceptedImgKeys).join()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        className: "text-primary-500 font-weight-bold justify-content-start pl-0",
        size: "sm",
        iconBefore: _icons.FileUpload,
        onClick: fileInput.click,
        variant: "link",
        disabled: !edxVideo,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.uploadButtonLabel))
      })]
    })]
  }) : null;
};
exports.ThumbnailWidget = ThumbnailWidget;
ThumbnailWidget.propTypes = {
  // injected
  intl: _i18n.intlShape.isRequired,
  // redux
  isLibrary: _propTypes.default.bool.isRequired,
  allowThumbnailUpload: _propTypes.default.bool.isRequired,
  thumbnail: _propTypes.default.string.isRequired,
  videoId: _propTypes.default.string.isRequired
};
const mapStateToProps = state => ({
  isLibrary: _redux.selectors.app.isLibrary(state),
  allowThumbnailUpload: _redux.selectors.video.allowThumbnailUpload(state),
  thumbnail: _redux.selectors.video.thumbnail(state),
  videoId: _redux.selectors.video.videoId(state)
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = exports.mapDispatchToProps = {};
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ThumbnailWidget));
//# sourceMappingURL=index.js.map