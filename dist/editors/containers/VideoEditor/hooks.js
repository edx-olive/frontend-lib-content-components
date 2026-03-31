"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.fetchVideoContent = exports.errorsHook = exports.ErrorContext = void 0;
var _react = require("react");
var _redux = require("../../data/redux");
var _utils = require("../../utils");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ErrorContext = exports.ErrorContext = /*#__PURE__*/(0, _react.createContext)();
const state = exports.state = (0, _utils.StrictDict)({
  /* eslint-disable react-hooks/rules-of-hooks */
  durationErrors: val => (0, _react.useState)(val),
  handoutErrors: val => (0, _react.useState)(val),
  licenseErrors: val => (0, _react.useState)(val),
  thumbnailErrors: val => (0, _react.useState)(val),
  transcriptsErrors: val => (0, _react.useState)(val),
  videoSourceErrors: val => (0, _react.useState)(val)
  /* eslint-enable react-hooks/rules-of-hooks */
});
const errorsHook = () => {
  const [durationErrors, setDurationErrors] = _module.state.durationErrors({});
  const [handoutErrors, setHandoutErrors] = _module.state.handoutErrors({});
  const [licenseErrors, setLicenseErrors] = _module.state.licenseErrors({});
  const [thumbnailErrors, setThumbnailErrors] = _module.state.thumbnailErrors({});
  const [transcriptsErrors, setTranscriptsErrors] = _module.state.transcriptsErrors({});
  const [videoSourceErrors, setVideoSourceErrors] = _module.state.videoSourceErrors({});
  return {
    error: {
      duration: [durationErrors, setDurationErrors],
      handout: [handoutErrors, setHandoutErrors],
      license: [licenseErrors, setLicenseErrors],
      thumbnail: [thumbnailErrors, setThumbnailErrors],
      transcripts: [transcriptsErrors, setTranscriptsErrors],
      videoSource: [videoSourceErrors, setVideoSourceErrors]
    },
    validateEntry: () => {
      if (Object.keys(durationErrors).length > 0) {
        return false;
      }
      if (Object.keys(handoutErrors).length > 0) {
        return false;
      }
      if (Object.keys(licenseErrors).length > 0) {
        return false;
      }
      if (Object.keys(thumbnailErrors).length > 0) {
        return false;
      }
      if (Object.keys(transcriptsErrors).length > 0) {
        return false;
      }
      if (Object.keys(videoSourceErrors).length > 0) {
        return false;
      }
      return true;
    }
  };
};
exports.errorsHook = errorsHook;
const fetchVideoContent = () => ({
  dispatch
}) => dispatch(_redux.thunkActions.video.saveVideoData());
exports.fetchVideoContent = fetchVideoContent;
//# sourceMappingURL=hooks.js.map