"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.hooks = exports.default = exports.SelectVideoModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _redux = require("../../../data/redux");
var _BaseModal = _interopRequireDefault(require("./BaseModal"));
var _module = _interopRequireWildcard(require("./SelectVideoModal"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const hooks = exports.hooks = {
  videoList: ({
    fetchVideos
  }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [videos, setVideos] = _react.default.useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    _react.default.useEffect(() => {
      fetchVideos({
        onSuccess: setVideos
      });
    }, []);
    return videos;
  },
  onSelectClick: ({
    setSelection,
    videos
  }) => () => setSelection(videos[0])
};
const SelectVideoModal = ({
  fetchVideos,
  isOpen,
  close,
  setSelection
}) => {
  const videos = _module.hooks.videoList({
    fetchVideos
  });
  const onSelectClick = _module.hooks.onSelectClick({
    setSelection,
    videos
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseModal.default, {
    isOpen: isOpen,
    close: close,
    title: "Add a video",
    confirmAction: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "primary",
      onClick: onSelectClick,
      children: "Next"
    }),
    children: videos && videos.map(img => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}, img.externalUrl))
  });
};
exports.SelectVideoModal = SelectVideoModal;
SelectVideoModal.propTypes = {
  isOpen: _propTypes.default.bool.isRequired,
  close: _propTypes.default.func.isRequired,
  setSelection: _propTypes.default.func.isRequired,
  // redux
  fetchVideos: _propTypes.default.func.isRequired
};
const mapStateToProps = () => ({});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = exports.mapDispatchToProps = {
  fetchVideos: _redux.thunkActions.app.fetchVideos
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SelectVideoModal);
//# sourceMappingURL=SelectVideoModal.js.map