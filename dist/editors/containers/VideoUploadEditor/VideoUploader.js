"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoUploader = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _reactRedux = require("react-redux");
var _redux = require("../../data/redux");
var hooks = _interopRequireWildcard(require("./hooks"));
var editorHooks = _interopRequireWildcard(require("../EditorContainer/hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const URLUploader = () => {
  const [textInputValue, setTextInputValue] = _react.default.useState('');
  const onURLUpload = hooks.onVideoUpload();
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "d-flex flex-column",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        backgroundColor: '#F2F0EF'
      },
      className: "justify-content-center align-self-center rounded-circle p-5",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        src: _icons.FileUpload,
        className: "text-muted",
        size: "lg"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "d-flex align-self-center justify-content-center flex-wrap flex-column pt-5",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "small",
        children: intl.formatMessage(_messages.default.dropVideoFileHere)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "align-self-center",
        style: {
          fontSize: '0.8rem'
        },
        children: intl.formatMessage(_messages.default.info)
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "x-small align-self-center justify-content-center mx-2 text-dark font-weight-normal",
      children: "OR"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "zindex-9 video-id-prompt p-4",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.InputGroup, {
        className: "video-upload-input-group",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.FormControl, {
          placeholder: intl.formatMessage(_messages.default.pasteURL),
          "aria-label": intl.formatMessage(_messages.default.pasteURL),
          "aria-describedby": "basic-addon2",
          borderless: true,
          onClick: event => {
            event.stopPropagation();
          },
          onChange: event => {
            setTextInputValue(event.target.value);
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "light-300 justify-content-center align-self-center bg-light rounded-circle p-0 x-small url-submit-button",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
            className: "text-muted",
            alt: intl.formatMessage(_messages.default.submitButtonAltText),
            src: _icons.ArrowForward,
            iconAs: _paragon.Icon,
            size: "inline",
            onClick: event => {
              event.stopPropagation();
              if (textInputValue.trim() !== '') {
                onURLUpload(textInputValue);
              }
            }
          })
        })]
      })
    })]
  });
};
const VideoUploader = ({
  setLoading,
  onClose
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const intl = (0, _i18n.useIntl)();
  const handleCancel = editorHooks.handleCancel({
    onClose
  });
  const handleProcessUpload = ({
    fileData
  }) => {
    dispatch(_redux.thunkActions.video.uploadVideo({
      supportedFiles: [fileData],
      setLoadSpinner: setLoading,
      postUploadRedirect: hooks.onVideoUpload()
    }));
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "d-flex flex-column",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex justify-content-end flex-row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        className: "position-absolute mr-2 mt-2",
        alt: intl.formatMessage(_messages.default.closeButtonAltText),
        src: _icons.Close,
        iconAs: _paragon.Icon,
        onClick: handleCancel
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropzone, {
      accept: {
        'video/*': ['.mp4', '.mov']
      },
      onProcessUpload: handleProcessUpload,
      inputComponent: /*#__PURE__*/(0, _jsxRuntime.jsx)(URLUploader, {})
    })]
  });
};
exports.VideoUploader = VideoUploader;
VideoUploader.propTypes = {
  setLoading: _propTypes.default.func.isRequired,
  onClose: _propTypes.default.func.isRequired
};
var _default = exports.default = VideoUploader;
//# sourceMappingURL=VideoUploader.js.map