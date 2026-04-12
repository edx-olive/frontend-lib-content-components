"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReactState = exports.updateImagesRef = exports.saveToEditor = exports.propsString = exports.imgProps = exports.hooks = exports.default = exports.ImageUploadModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _tinyMCE = _interopRequireDefault(require("../../data/constants/tinyMCE"));
var _ImageSettingsModal = _interopRequireDefault(require("./ImageSettingsModal"));
var _SelectImageModal = _interopRequireDefault(require("./SelectImageModal"));
var _module = _interopRequireWildcard(require("."));
var _hooks = require("../TinyMceWidget/hooks");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["close"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const propsString = props => Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ');
exports.propsString = propsString;
const imgProps = ({
  settings,
  selection,
  lmsEndpointUrl,
  editorType
}) => {
  let url = selection?.externalUrl;
  if (url?.startsWith(lmsEndpointUrl) && editorType !== 'expandable') {
    const sourceEndIndex = lmsEndpointUrl.length;
    url = url.substring(sourceEndIndex);
  }
  return {
    src: url,
    alt: settings.isDecorative ? '' : settings.altText,
    width: settings.dimensions.width,
    height: settings.dimensions.height
  };
};
exports.imgProps = imgProps;
const saveToEditor = ({
  settings,
  selection,
  lmsEndpointUrl,
  editorType,
  editorRef
}) => {
  const newImgTag = _module.hooks.imgTag({
    settings,
    selection,
    lmsEndpointUrl,
    editorType
  });
  editorRef.current.execCommand(_tinyMCE.default.commands.insertContent, false, newImgTag);
};
exports.saveToEditor = saveToEditor;
const updateImagesRef = ({
  images,
  selection,
  height,
  width,
  newImage
}) => {
  const {
    result: mappedImages,
    foundMatch: imageAlreadyExists
  } = (0, _hooks.updateImageDimensions)({
    images: images.current,
    url: selection.externalUrl,
    height,
    width
  });
  images.current = imageAlreadyExists ? mappedImages : [...images.current, newImage];
};
exports.updateImagesRef = updateImagesRef;
const updateReactState = ({
  settings,
  selection,
  setSelection,
  images
}) => {
  const {
    height,
    width
  } = settings.dimensions;
  const newImage = {
    externalUrl: selection.externalUrl,
    altText: settings.altText,
    width,
    height
  };
  updateImagesRef({
    images,
    selection,
    height,
    width,
    newImage
  });
  setSelection(newImage);
};
exports.updateReactState = updateReactState;
const hooks = exports.hooks = {
  createSaveCallback: _ref => {
    let {
        close
      } = _ref,
      args = _objectWithoutProperties(_ref, _excluded);
    return settings => {
      saveToEditor(_objectSpread({
        settings
      }, args));
      updateReactState(_objectSpread({
        settings
      }, args));
      close();
    };
  },
  onClose: ({
    clearSelection,
    close
  }) => () => {
    clearSelection();
    close();
  },
  imgTag: ({
    settings,
    selection,
    lmsEndpointUrl,
    editorType
  }) => {
    const props = _module.imgProps({
      settings,
      selection,
      lmsEndpointUrl,
      editorType
    });
    return `<img ${propsString(props)} />`;
  },
  updateReactState,
  updateImagesRef,
  saveToEditor,
  imgProps,
  propsString
};
const ImageUploadModal = ({
  // eslint-disable-next-line
  editorRef,
  isOpen,
  close,
  clearSelection,
  selection,
  setSelection,
  images,
  editorType,
  lmsEndpointUrl
}) => {
  if (selection && selection.externalUrl) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageSettingsModal.default, {
      isOpen,
      close: _module.hooks.onClose({
        editorRef,
        clearSelection,
        close
      }),
      selection,
      images,
      saveToEditor: _module.hooks.createSaveCallback({
        close,
        images,
        editorRef,
        editorType,
        selection,
        setSelection,
        lmsEndpointUrl
      }),
      returnToSelection: clearSelection
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectImageModal.default, {
    isOpen,
    close,
    setSelection,
    clearSelection,
    images
  });
};
exports.ImageUploadModal = ImageUploadModal;
ImageUploadModal.defaultProps = {
  editorRef: null,
  editorType: null,
  selection: null
};
ImageUploadModal.propTypes = {
  clearSelection: _propTypes.default.func.isRequired,
  close: _propTypes.default.func.isRequired,
  editorRef: _propTypes.default.oneOfType([_propTypes.default.func,
  // eslint-disable-next-line react/forbid-prop-types
  _propTypes.default.shape({
    current: _propTypes.default.any
  })]),
  isOpen: _propTypes.default.bool.isRequired,
  selection: _propTypes.default.shape({
    url: _propTypes.default.string,
    externalUrl: _propTypes.default.string,
    altText: _propTypes.default.bool
  }),
  setSelection: _propTypes.default.func.isRequired,
  images: _propTypes.default.shape({}).isRequired,
  lmsEndpointUrl: _propTypes.default.string.isRequired,
  editorType: _propTypes.default.string
};
var _default = exports.default = (0, _i18n.injectIntl)(ImageUploadModal);
//# sourceMappingURL=index.js.map