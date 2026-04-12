"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateTo = exports.hooks = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var appHooks = _interopRequireWildcard(require("../../../hooks"));
var _redux = require("../../../data/redux");
var _VideoSettingsModal = _interopRequireDefault(require("./VideoSettingsModal"));
var _module = _interopRequireWildcard(require("./VideoEditorModal"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import SelectVideoModal from './SelectVideoModal';

const {
  navigateTo
} = appHooks;
exports.navigateTo = navigateTo;
const hooks = exports.hooks = {
  initialize: (dispatch, selectedVideoId, selectedVideoUrl) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    _react.default.useEffect(() => {
      dispatch(_redux.thunkActions.video.loadVideoData(selectedVideoId, selectedVideoUrl));
    }, []);
  },
  returnToGallery: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const learningContextId = (0, _reactRedux.useSelector)(_redux.selectors.app.learningContextId);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blockId = (0, _reactRedux.useSelector)(_redux.selectors.app.blockId);
    return () => navigateTo(`/course/${learningContextId}/editor/course-videos/${blockId}`);
  }
};
const VideoEditorModal = ({
  close,
  isOpen,
  isLibrary
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const searchParams = new URLSearchParams(document.location.search);
  const selectedVideoId = searchParams.get('selectedVideoId');
  const selectedVideoUrl = searchParams.get('selectedVideoUrl');
  const onReturn = _module.hooks.returnToGallery();
  _module.hooks.initialize(dispatch, selectedVideoId, selectedVideoUrl);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoSettingsModal.default, {
    close,
    isOpen,
    onReturn,
    isLibrary
  });
  // TODO: add logic to show SelectVideoModal if no selection
};
VideoEditorModal.defaultProps = {};
VideoEditorModal.propTypes = {
  close: _propTypes.default.func.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  isLibrary: _propTypes.default.bool.isRequired
};
var _default = exports.default = VideoEditorModal;
//# sourceMappingURL=VideoEditorModal.js.map