"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoSelector = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _VideoGallery = _interopRequireDefault(require("./containers/VideoGallery"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VideoSelector = ({
  blockId,
  learningContextId,
  lmsEndpointUrl,
  studioEndpointUrl
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  hooks.initializeApp({
    dispatch,
    data: {
      blockId,
      blockType: 'video',
      learningContextId,
      lmsEndpointUrl,
      studioEndpointUrl
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoGallery.default, {});
};
exports.VideoSelector = VideoSelector;
VideoSelector.propTypes = {
  blockId: _propTypes.default.string.isRequired,
  learningContextId: _propTypes.default.string.isRequired,
  lmsEndpointUrl: _propTypes.default.string.isRequired,
  studioEndpointUrl: _propTypes.default.string.isRequired
};
var _default = exports.default = VideoSelector;
//# sourceMappingURL=VideoSelector.js.map