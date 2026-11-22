"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.searchAndSortHooks = exports.imgListHooks = exports.imgHooks = exports.filteredList = exports.fileInputHooks = exports.displayList = exports.default = exports.checkValidFileSize = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../../data/redux");
var _module = _interopRequireWildcard(require("./hooks"));
var _utils = require("./utils");
var _messages = _interopRequireDefault(require("./messages"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  highlighted: val => _react.default.useState(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showSelectImageError: val => _react.default.useState(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  searchString: val => _react.default.useState(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  sortBy: val => _react.default.useState(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showSizeError: val => _react.default.useState(val)
};
const searchAndSortHooks = () => {
  const [searchString, setSearchString] = _module.state.searchString('');
  const [sortBy, setSortBy] = _module.state.sortBy(_utils.sortKeys.dateNewest);
  return {
    searchString,
    onSearchChange: e => setSearchString(e.target.value),
    clearSearchString: () => setSearchString(''),
    sortBy,
    onSortClick: key => () => setSortBy(key),
    sortKeys: _utils.sortKeys,
    sortMessages: _utils.sortMessages
  };
};
exports.searchAndSortHooks = searchAndSortHooks;
const filteredList = ({
  searchString,
  imageList
}) => imageList.filter(({
  displayName
}) => displayName?.toLowerCase().includes(searchString?.toLowerCase()));
exports.filteredList = filteredList;
const displayList = ({
  sortBy,
  searchString,
  images
}) => _module.filteredList({
  searchString,
  imageList: images
}).sort(_utils.sortFunctions[sortBy in _utils.sortKeys ? _utils.sortKeys[sortBy] : _utils.sortKeys.dateNewest]);
exports.displayList = displayList;
const imgListHooks = ({
  searchSortProps,
  setSelection,
  images
}) => {
  const [highlighted, setHighlighted] = _module.state.highlighted(null);
  const [showSelectImageError, setShowSelectImageError] = _module.state.showSelectImageError(false);
  const [showSizeError, setShowSizeError] = _module.state.showSizeError(false);
  const list = _module.displayList(_objectSpread(_objectSpread({}, searchSortProps), {}, {
    images
  }));
  return {
    galleryError: {
      show: showSelectImageError,
      set: () => setShowSelectImageError(true),
      dismiss: () => setShowSelectImageError(false),
      message: _messages.default.selectImageError
    },
    inputError: {
      show: showSizeError,
      set: () => setShowSizeError(true),
      dismiss: () => setShowSizeError(false),
      message: _messages.default.fileSizeError
    },
    images,
    galleryProps: {
      galleryIsEmpty: Object.keys(images).length === 0,
      searchIsEmpty: list.length === 0,
      displayList: list,
      highlighted,
      onHighlightChange: e => setHighlighted(e.target.value),
      emptyGalleryLabel: _messages.default.emptyGalleryLabel
    },
    // highlight by id
    selectBtnProps: {
      onClick: () => {
        if (highlighted) {
          const highlightedImage = images.find(image => image.id === highlighted);
          setSelection(highlightedImage);
        } else {
          setShowSelectImageError(true);
        }
      }
    }
  };
};
exports.imgListHooks = imgListHooks;
const checkValidFileSize = ({
  selectedFile,
  clearSelection,
  onSizeFail
}) => {
  // Check if the file size is greater than 10 MB, upload size limit
  if (selectedFile.size > 10000000) {
    clearSelection();
    onSizeFail();
    return false;
  }
  return true;
};
exports.checkValidFileSize = checkValidFileSize;
const fileInputHooks = ({
  setSelection,
  clearSelection,
  imgList
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = (0, _reactRedux.useDispatch)();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = _react.default.useRef();
  const click = () => ref.current.click();
  const addFile = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && _module.checkValidFileSize({
      selectedFile,
      clearSelection,
      onSizeFail: () => {
        imgList.inputError.set();
      }
    })) {
      dispatch(_redux.thunkActions.app.uploadImage({
        file: selectedFile,
        setSelection
      }));
    }
  };
  return {
    click,
    addFile,
    ref
  };
};
exports.fileInputHooks = fileInputHooks;
const imgHooks = ({
  setSelection,
  clearSelection,
  images
}) => {
  const searchSortProps = _module.searchAndSortHooks();
  const imgList = _module.imgListHooks({
    setSelection,
    searchSortProps,
    images
  });
  const fileInput = _module.fileInputHooks({
    setSelection,
    clearSelection,
    imgList
  });
  const {
    galleryError,
    galleryProps,
    inputError,
    selectBtnProps
  } = imgList;
  return {
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps
  };
};
exports.imgHooks = imgHooks;
var _default = exports.default = {
  imgHooks
};
//# sourceMappingURL=hooks.js.map