"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.SocialShareWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _redux = require("../../../../../../data/redux");
var _CollapsibleFormWidget = _interopRequireDefault(require("../CollapsibleFormWidget"));
var _messages = _interopRequireDefault(require("./messages"));
var hooks = _interopRequireWildcard(require("./hooks"));
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
const SocialShareWidget = ({
  // injected
  intl,
  // redux
  allowVideoSharing,
  isLibrary,
  videoSharingEnabledForAll,
  videoSharingEnabledForCourse,
  videoSharingLearnMoreLink,
  updateField
}) => {
  const isSetByCourse = allowVideoSharing.level === 'course';
  const videoSharingEnabled = isLibrary ? videoSharingEnabledForAll : videoSharingEnabledForCourse;
  const learnMoreLink = videoSharingLearnMoreLink || 'http://edx.readthedocs.io/projects/open-edx-building-and-running-a-course/en/latest/developing_course/social_sharing.html';
  const onSocialSharingCheckboxChange = hooks.useTrackSocialSharingChange({
    updateField
  });
  const getSubtitle = () => {
    if (allowVideoSharing.value) {
      return intl.formatMessage(_messages.default.enabledSubtitle);
    }
    return intl.formatMessage(_messages.default.disabledSubtitle);
  };
  return videoSharingEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CollapsibleFormWidget.default, {
    fontSize: "x-small",
    title: intl.formatMessage(_messages.default.title),
    subtitle: getSubtitle(),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.socialSharingDescription))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Checkbox, {
      className: "mt-3",
      checked: allowVideoSharing.value,
      disabled: isSetByCourse,
      onChange: onSocialSharingCheckboxChange,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "small text-gray-700",
        children: intl.formatMessage(_messages.default.socialSharingCheckboxLabel)
      })
    }), isSetByCourse && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mt-2",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.overrideSocialSharingNote))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.disclaimerSettingLocation))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mt-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        className: "text-primary-500",
        destination: learnMoreLink,
        target: "_blank",
        children: intl.formatMessage(_messages.default.learnMoreLinkLabel)
      })
    })]
  }) : null;
};
exports.SocialShareWidget = SocialShareWidget;
SocialShareWidget.defaultProps = {
  allowVideoSharing: {
    level: 'block',
    value: false
  },
  videoSharingEnabledForCourse: false,
  videoSharingEnabledForAll: false
};
SocialShareWidget.propTypes = {
  // injected
  intl: _i18n.intlShape.isRequired,
  // redux
  allowVideoSharing: _propTypes.default.shape({
    level: _propTypes.default.string.isRequired,
    value: _propTypes.default.bool.isRequired
  }),
  isLibrary: _propTypes.default.bool.isRequired,
  videoSharingEnabledForAll: _propTypes.default.bool,
  videoSharingEnabledForCourse: _propTypes.default.bool,
  videoSharingLearnMoreLink: _propTypes.default.string.isRequired,
  updateField: _propTypes.default.func.isRequired
};
const mapStateToProps = state => ({
  allowVideoSharing: _redux.selectors.video.allowVideoSharing(state),
  isLibrary: _redux.selectors.app.isLibrary(state),
  videoSharingLearnMoreLink: _redux.selectors.video.videoSharingLearnMoreLink(state),
  videoSharingEnabledForAll: _redux.selectors.video.videoSharingEnabledForAll(state),
  videoSharingEnabledForCourse: _redux.selectors.video.videoSharingEnabledForCourse(state)
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = dispatch => ({
  updateField: stateUpdate => dispatch(_redux.actions.video.updateField(stateUpdate))
});
exports.mapDispatchToProps = mapDispatchToProps;
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SocialShareWidget));
//# sourceMappingURL=index.js.map