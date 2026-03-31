"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullMethod = exports.navigateTo = exports.navigateCallback = exports.getContent = void 0;
var appHooks = _interopRequireWildcard(require("../../hooks"));
var _hooks2 = require("../../sharedComponents/TinyMceWidget/hooks");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  nullMethod,
  navigateCallback,
  navigateTo
} = appHooks;
exports.navigateTo = navigateTo;
exports.navigateCallback = navigateCallback;
exports.nullMethod = nullMethod;
const getContent = ({
  editorRef,
  isRaw,
  assets
}) => () => {
  const content = isRaw && editorRef && editorRef.current ? editorRef.current.state.doc.toString() : editorRef.current?.getContent();
  return (0, _hooks2.setAssetToStaticUrl)({
    editorValue: content,
    assets
  });
};
exports.getContent = getContent;
//# sourceMappingURL=hooks.js.map