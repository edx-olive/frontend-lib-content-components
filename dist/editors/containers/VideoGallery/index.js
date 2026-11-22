"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoGallery = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../data/redux");
var _hooks = _interopRequireDefault(require("./hooks"));
var _SelectionModal = _interopRequireDefault(require("../../sharedComponents/SelectionModal"));
var _utils = require("./utils");
var _messages = _interopRequireDefault(require("./messages"));
var _requests = require("../../data/constants/requests");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const VideoGallery = () => {
  const rawVideos = (0, _reactRedux.useSelector)(_redux.selectors.app.videos);
  const isLoaded = (0, _reactRedux.useSelector)(state => _redux.selectors.requests.isFinished(state, {
    requestKey: _requests.RequestKeys.fetchVideos
  }));
  const isFetchError = (0, _reactRedux.useSelector)(state => _redux.selectors.requests.isFailed(state, {
    requestKey: _requests.RequestKeys.fetchVideos
  }));
  const isUploadError = (0, _reactRedux.useSelector)(state => _redux.selectors.requests.isFailed(state, {
    requestKey: _requests.RequestKeys.uploadVideo
  }));
  const videos = _hooks.default.buildVideos({
    rawVideos
  });
  const handleVideoUpload = _hooks.default.useVideoUploadHandler();
  (0, _react.useEffect)(() => {
    // If no videos exists redirects to the video upload screen
    if (isLoaded && videos.length === 0) {
      handleVideoUpload();
    }
  }, [isLoaded]);
  const {
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps
  } = _hooks.default.useVideoProps({
    videos
  });
  const handleCancel = _hooks.default.useCancelHandler();
  const modalMessages = {
    confirmMsg: _messages.default.selectVideoButtonlabel,
    titleMsg: _messages.default.titleLabel,
    uploadButtonMsg: _messages.default.uploadButtonLabel,
    fetchError: _messages.default.fetchVideosError,
    uploadError: _messages.default.uploadVideoError
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectionModal.default, {
    isOpen: true,
    close: handleCancel,
    size: 'fullscreen',
    isFullscreenScroll: false,
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps,
    acceptedFiles: _utils.acceptedImgKeys,
    modalMessages,
    isLoaded,
    isUploadError,
    isFetchError
  });
};
exports.VideoGallery = VideoGallery;
VideoGallery.propTypes = {};
var _default = exports.default = VideoGallery;
//# sourceMappingURL=index.js.map