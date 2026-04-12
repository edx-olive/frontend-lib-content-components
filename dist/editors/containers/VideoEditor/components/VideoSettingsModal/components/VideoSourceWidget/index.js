"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoSourceWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var widgetHooks = _interopRequireWildcard(require("../hooks"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _ErrorAlert = require("../../../../../../sharedComponents/ErrorAlerts/ErrorAlert");
var _CollapsibleFormWidget = _interopRequireDefault(require("../CollapsibleFormWidget"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Collapsible Form widget controlling video source as well as fallback sources
 */
const VideoSourceWidget = ({
  // injected
  intl
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    videoId,
    videoSource: source,
    fallbackVideos,
    allowVideoDownloads: allowDownload
  } = widgetHooks.widgetValues({
    dispatch,
    fields: {
      [widgetHooks.selectorKeys.videoSource]: widgetHooks.genericWidget,
      [widgetHooks.selectorKeys.videoId]: widgetHooks.genericWidget,
      [widgetHooks.selectorKeys.fallbackVideos]: widgetHooks.arrayWidget,
      [widgetHooks.selectorKeys.allowVideoDownloads]: widgetHooks.genericWidget
    }
  });
  const {
    videoIdChangeAlert
  } = hooks.videoIdChangeAlert();
  const {
    updateVideoId,
    updateVideoURL
  } = hooks.sourceHooks({
    dispatch,
    previousVideoId: videoId.formValue,
    setAlert: videoIdChangeAlert.set
  });
  const {
    addFallbackVideo,
    deleteFallbackVideo
  } = hooks.fallbackHooks({
    fallbackVideos: fallbackVideos.formValue,
    dispatch
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CollapsibleFormWidget.default, {
    fontSize: "x-small",
    title: intl.formatMessage(_messages.default.titleLabel),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorAlert.ErrorAlert, {
      dismissError: videoIdChangeAlert.dismiss,
      hideHeading: true,
      isError: videoIdChangeAlert.show,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.videoIdChangeAlert))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Form.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "border-primary-100 border-bottom pb-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
          floatingLabel: intl.formatMessage(_messages.default.videoIdLabel),
          onChange: videoId.onChange,
          onBlur: updateVideoId,
          value: videoId.local
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control.Feedback, {
          className: "text-primary-300 mb-4",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.videoIdFeedback))
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
          floatingLabel: intl.formatMessage(_messages.default.videoUrlLabel),
          onChange: source.onChange,
          onBlur: e => updateVideoURL(e, videoId.local),
          value: source.local
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control.Feedback, {
          className: "text-primary-300",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.videoUrlFeedback))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mt-4",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.fallbackVideoTitle))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mt-3",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.fallbackVideoMessage))
      }), fallbackVideos.formValue.length > 0 ? fallbackVideos.formValue.map((videoUrl, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Form.Row, {
        className: "mt-3.5 mx-0 flex-nowrap",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
          floatingLabel: intl.formatMessage(_messages.default.fallbackVideoLabel),
          onChange: fallbackVideos.onChange(index),
          value: fallbackVideos.local[index],
          onBlur: fallbackVideos.onBlur(index)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButtonWithTooltip, {
          tooltipPlacement: "top",
          tooltipContent: intl.formatMessage(_messages.default.deleteFallbackVideo),
          src: _icons.DeleteOutline,
          iconAs: _paragon.Icon,
          alt: intl.formatMessage(_messages.default.deleteFallbackVideo),
          onClick: () => deleteFallbackVideo(videoUrl)
        }, `top-delete-${videoUrl}`)]
      })) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ActionRow, {
        className: "mt-4.5",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Checkbox, {
          checked: allowDownload.local,
          className: "decorative-control-label",
          onChange: allowDownload.onCheckedChange,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "small text-gray-700",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.allowDownloadCheckboxLabel))
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.OverlayTrigger, {
          placement: "top",
          overlay: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Tooltip, {
            id: "tooltip-top",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.allowDownloadTooltipMessage))
          }),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.InfoOutline,
            style: {
              height: '16px',
              width: '16px'
            }
          })
        }, "top"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow.Spacer, {})]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "my-4 border-primary-100 border-bottom"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      className: "text-primary-500 font-weight-bold pl-0",
      size: "sm",
      iconBefore: _icons.Add,
      variant: "link",
      onClick: () => addFallbackVideo(),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.addButtonLabel))
    })]
  });
};
exports.VideoSourceWidget = VideoSourceWidget;
VideoSourceWidget.propTypes = {
  // injected
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(VideoSourceWidget);
//# sourceMappingURL=index.js.map