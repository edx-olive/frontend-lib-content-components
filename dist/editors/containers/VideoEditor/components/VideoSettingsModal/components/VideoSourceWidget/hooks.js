"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoIdChangeAlert = exports.state = exports.sourceHooks = exports.fallbackHooks = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _redux = require("../../../../../../data/redux");
var _api = require("../../../../../../data/services/cms/api");
var requests = _interopRequireWildcard(require("../../../../../../data/redux/thunkActions/requests"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showVideoIdChangeAlert: args => _react.default.useState(args)
};
const sourceHooks = ({
  dispatch,
  previousVideoId,
  setAlert
}) => ({
  updateVideoURL: (e, videoId) => {
    const videoUrl = e.target.value;
    dispatch(_redux.actions.video.updateField({
      videoSource: videoUrl
    }));
    const youTubeId = (0, _api.parseYoutubeId)(videoUrl);
    if (youTubeId) {
      dispatch(requests.checkTranscriptsForImport({
        videoId,
        youTubeId,
        onSuccess: response => {
          if (response.data.command === 'import') {
            dispatch(_redux.actions.video.updateField({
              allowTranscriptImport: true
            }));
          }
        }
      }));
    }
  },
  updateVideoId: e => {
    const updatedVideoId = e.target.value;
    if (previousVideoId !== updatedVideoId && updatedVideoId) {
      setAlert();
    }
    dispatch(_redux.actions.video.updateField({
      videoId: updatedVideoId
    }));
  }
});
exports.sourceHooks = sourceHooks;
const fallbackHooks = ({
  fallbackVideos,
  dispatch
}) => ({
  addFallbackVideo: () => dispatch(_redux.actions.video.updateField({
    fallbackVideos: [...fallbackVideos, '']
  })),
  deleteFallbackVideo: videoUrl => {
    const updatedFallbackVideos = fallbackVideos.splice(fallbackVideos.indexOf(videoUrl), 1);
    dispatch(_redux.actions.video.updateField({
      fallbackVideos: updatedFallbackVideos
    }));
  }
});
exports.fallbackHooks = fallbackHooks;
const videoIdChangeAlert = () => {
  const [showVideoIdChangeAlert, setShowVideoIdChangeAlert] = state.showVideoIdChangeAlert(false);
  return {
    videoIdChangeAlert: {
      show: showVideoIdChangeAlert,
      set: () => setShowVideoIdChangeAlert(true),
      dismiss: () => setShowVideoIdChangeAlert(false)
    }
  };
};
exports.videoIdChangeAlert = videoIdChangeAlert;
var _default = exports.default = {
  videoIdChangeAlert,
  sourceHooks,
  fallbackHooks
};
//# sourceMappingURL=hooks.js.map