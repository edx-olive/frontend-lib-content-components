"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVideoUploadHandler = exports.useVideoProps = exports.useVideoListProps = exports.useSearchAndSortProps = exports.useCancelHandler = exports.navigateTo = exports.navigateCallback = exports.getstatusBadgeVariant = exports.filterListByStatus = exports.filterListBySearch = exports.filterListByHideSelectedCourse = exports.filterList = exports.default = exports.buildVideos = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _module = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var appHooks = _interopRequireWildcard(require("../../hooks"));
var _redux = require("../../data/redux");
var _analyticsEvt = _interopRequireDefault(require("../../data/constants/analyticsEvt"));
var _utils = require("./utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  navigateCallback,
  navigateTo
} = appHooks;
exports.navigateTo = navigateTo;
exports.navigateCallback = navigateCallback;
const useSearchAndSortProps = () => {
  const [searchString, setSearchString] = _react.default.useState('');
  const [sortBy, setSortBy] = _react.default.useState(_utils.sortKeys.dateNewest);
  const [filterBy, setFilterBy] = _react.default.useState([]);
  const [hideSelectedVideos, setHideSelectedVideos] = _react.default.useState(false);
  const handleFilter = key => () => {
    if (filterBy.includes(key)) {
      setFilterBy(filterBy.filter(item => item !== key));
    } else {
      setFilterBy([...filterBy, key]);
    }
  };
  return {
    searchString,
    onSearchChange: e => setSearchString(e.target.value),
    clearSearchString: () => setSearchString(''),
    sortBy,
    onSortClick: key => () => setSortBy(key),
    sortKeys: _utils.sortKeys,
    sortMessages: _utils.sortMessages,
    filterBy,
    onFilterClick: handleFilter,
    showSwitch: false,
    hideSelectedVideos,
    switchMessage: _messages.default.hideSelectedCourseVideosSwitchLabel,
    onSwitchClick: () => setHideSelectedVideos(!hideSelectedVideos)
  };
};
exports.useSearchAndSortProps = useSearchAndSortProps;
const filterListBySearch = ({
  searchString,
  videoList
}) => videoList.filter(({
  displayName
}) => displayName.toLowerCase().includes(searchString.toLowerCase()));
exports.filterListBySearch = filterListBySearch;
const filterListByStatus = ({
  statusFilter,
  videoList
}) => {
  if (statusFilter.length === 0) {
    return videoList;
  }
  return videoList.filter(({
    status
  }) => statusFilter.map(key => _utils.filterKeys[key]).includes(status));
};
exports.filterListByStatus = filterListByStatus;
const filterListByHideSelectedCourse = ({
  videoList
}) =>
// TODO Missing to implement this
videoList;
exports.filterListByHideSelectedCourse = filterListByHideSelectedCourse;
const filterList = ({
  sortBy,
  filterBy,
  searchString,
  videos
}) => {
  let filteredList = _module.filterListBySearch({
    searchString,
    videoList: videos
  });
  filteredList = _module.filterListByStatus({
    statusFilter: filterBy,
    videoList: filteredList
  });
  filteredList = _module.filterListByHideSelectedCourse({
    videoList: filteredList
  });
  return filteredList.sort(_utils.sortFunctions[sortBy in _utils.sortKeys ? _utils.sortKeys[sortBy] : _utils.sortKeys.dateNewest]);
};
exports.filterList = filterList;
const useVideoListProps = ({
  searchSortProps,
  videos
}) => {
  const [highlighted, setHighlighted] = _react.default.useState(null);
  const [showSelectVideoError, setShowSelectVideoError] = _react.default.useState(false);
  const [showSizeError, setShowSizeError] = _react.default.useState(false);
  const filteredList = _module.filterList(_objectSpread(_objectSpread({}, searchSortProps), {}, {
    videos
  }));
  const learningContextId = (0, _reactRedux.useSelector)(_redux.selectors.app.learningContextId);
  const blockId = (0, _reactRedux.useSelector)(_redux.selectors.app.blockId);
  return {
    galleryError: {
      show: showSelectVideoError,
      set: () => setShowSelectVideoError(true),
      dismiss: () => setShowSelectVideoError(false),
      message: _messages.default.selectVideoError
    },
    // TODO We need to update this message when implementing the video upload screen
    inputError: {
      show: showSizeError,
      set: () => setShowSizeError(true),
      dismiss: () => setShowSelectVideoError(false),
      message: _messages.default.fileSizeError
    },
    galleryProps: {
      galleryIsEmpty: Object.keys(filteredList).length === 0,
      searchIsEmpty: filteredList.length === 0,
      displayList: filteredList,
      highlighted,
      onHighlightChange: e => setHighlighted(e.target.value),
      emptyGalleryLabel: _messages.default.emptyGalleryLabel,
      showIdsOnCards: true,
      height: '100%'
    },
    selectBtnProps: {
      onClick: () => {
        if (highlighted) {
          navigateTo(`/course/${learningContextId}/editor/video/${blockId}?selectedVideoId=${highlighted}`);
        } else {
          setShowSelectVideoError(true);
        }
      }
    }
  };
};
exports.useVideoListProps = useVideoListProps;
const useVideoUploadHandler = () => {
  const learningContextId = (0, _reactRedux.useSelector)(_redux.selectors.app.learningContextId);
  const blockId = (0, _reactRedux.useSelector)(_redux.selectors.app.blockId);
  return () => navigateTo(`/course/${learningContextId}/editor/video_upload/${blockId}`);
};
exports.useVideoUploadHandler = useVideoUploadHandler;
const useCancelHandler = () => navigateCallback({
  destination: (0, _reactRedux.useSelector)(_redux.selectors.app.returnUrl),
  analytics: (0, _reactRedux.useSelector)(_redux.selectors.app.analytics),
  analyticsEvent: _analyticsEvt.default.videoGalleryCancelClick
});
exports.useCancelHandler = useCancelHandler;
const buildVideos = ({
  rawVideos
}) => {
  let videos = [];
  const rawVideoList = Object.values(rawVideos);
  if (rawVideoList.length > 0) {
    videos = rawVideoList.map(video => ({
      id: video.edx_video_id,
      displayName: video.client_video_id,
      externalUrl: video.course_video_image_url,
      dateAdded: new Date(video.created),
      locked: false,
      thumbnail: video.course_video_image_url,
      status: video.status,
      statusBadgeVariant: _module.getstatusBadgeVariant({
        status: video.status
      }),
      duration: video.duration,
      transcripts: video.transcripts
    }));
  }
  return videos;
};
exports.buildVideos = buildVideos;
const getstatusBadgeVariant = ({
  status
}) => {
  switch (status) {
    case _utils.filterKeys.failed:
      return 'danger';
    case _utils.filterKeys.uploading:
    case _utils.filterKeys.processing:
      return 'light';
    default:
      return null;
  }
};
exports.getstatusBadgeVariant = getstatusBadgeVariant;
const useVideoProps = ({
  videos
}) => {
  const searchSortProps = useSearchAndSortProps();
  const videoList = useVideoListProps({
    searchSortProps,
    videos
  });
  const {
    galleryError,
    galleryProps,
    inputError,
    selectBtnProps
  } = videoList;
  const fileInput = {
    click: useVideoUploadHandler()
  };
  return {
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps
  };
};
exports.useVideoProps = useVideoProps;
var _default = exports.default = {
  useVideoProps,
  buildVideos,
  useCancelHandler,
  useVideoUploadHandler
};
//# sourceMappingURL=hooks.js.map