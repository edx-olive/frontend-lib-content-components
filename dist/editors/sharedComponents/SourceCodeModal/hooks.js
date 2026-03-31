"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareSourceCodeModal = exports.getSaveBtnProps = exports.default = void 0;
var _react = require("react");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const getSaveBtnProps = ({
  editorRef,
  ref,
  close
}) => ({
  onClick: () => {
    if (editorRef && editorRef.current && ref && ref.current) {
      const content = ref.current.state.doc.toString();
      editorRef.current.setContent(content);
      close();
    }
  }
});
exports.getSaveBtnProps = getSaveBtnProps;
const prepareSourceCodeModal = ({
  editorRef,
  close
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = (0, _react.useRef)();
  const saveBtnProps = _module.getSaveBtnProps({
    editorRef,
    ref,
    close
  });
  if (editorRef && editorRef.current && typeof editorRef.current.getContent === 'function') {
    const value = editorRef?.current?.getContent();
    return {
      saveBtnProps,
      value,
      ref
    };
  }
  return {
    saveBtnProps,
    value: null,
    ref
  };
};
exports.prepareSourceCodeModal = prepareSourceCodeModal;
var _default = exports.default = {
  prepareSourceCodeModal
};
//# sourceMappingURL=hooks.js.map