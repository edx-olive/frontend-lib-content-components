"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUploadVideo = exports.postUploadRedirect = exports.onVideoUpload = exports.navigateTo = exports.default = void 0;
var _module = _interopRequireWildcard(require("./hooks"));
var _redux = require("../../data/redux");
var _store = _interopRequireDefault(require("../../data/store"));
var appHooks = _interopRequireWildcard(require("../../hooks"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  navigateTo
} = appHooks;
exports.navigateTo = navigateTo;
const postUploadRedirect = storeState => {
  const learningContextId = _redux.selectors.app.learningContextId(storeState);
  const blockId = _redux.selectors.app.blockId(storeState);
  return videoUrl => navigateTo(`/course/${learningContextId}/editor/video/${blockId}?selectedVideoUrl=${videoUrl}`);
};
exports.postUploadRedirect = postUploadRedirect;
const onVideoUpload = () => {
  const storeState = _store.default.getState();
  return _module.postUploadRedirect(storeState);
};
exports.onVideoUpload = onVideoUpload;
const useUploadVideo = async ({
  dispatch,
  supportedFiles,
  setLoadSpinner,
  postUploadRedirectFunction
}) => {
  dispatch(_redux.thunkActions.video.uploadVideo({
    supportedFiles,
    setLoadSpinner,
    postUploadRedirectFunction
  }));
};
exports.useUploadVideo = useUploadVideo;
var _default = exports.default = {
  postUploadRedirect,
  onVideoUpload,
  useUploadVideo
};
//# sourceMappingURL=hooks.js.map