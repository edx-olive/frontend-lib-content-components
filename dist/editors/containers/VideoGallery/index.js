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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = VideoGallery;
exports.default = _default;
//# sourceMappingURL=index.js.map