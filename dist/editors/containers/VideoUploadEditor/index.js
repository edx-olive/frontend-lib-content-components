"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoUploadEditor = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
require("./index.scss");
var _messages = _interopRequireDefault(require("./messages"));
var _VideoUploader = require("./VideoUploader");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const VideoUploadEditor = _ref => {
  let {
    onClose
  } = _ref;
  const [loading, setLoading] = _react.default.useState(false);
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: !loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex marked-area flex-column p-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoUploader.VideoUploader, {
        setLoading: setLoading,
        onClose: onClose
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "text-center p-6",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
        animation: "border",
        className: "m-3",
        screenreadertext: intl.formatMessage(_messages.default.spinnerScreenReaderText)
      })
    })
  });
};
exports.VideoUploadEditor = VideoUploadEditor;
VideoUploadEditor.propTypes = {
  onClose: _propTypes.default.func.isRequired
};
var _default = VideoUploadEditor;
exports.default = _default;
//# sourceMappingURL=index.js.map