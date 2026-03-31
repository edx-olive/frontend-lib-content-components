"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.parseHandoutName = exports.fileSizeError = exports.fileInput = exports.default = exports.checkValidFileSize = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../../../../../data/redux");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showSizeError: args => _react.default.useState(args)
};
const parseHandoutName = ({
  handout
}) => {
  if (handout) {
    const handoutName = handout.slice(handout.lastIndexOf('@') + 1);
    return handoutName;
  }
  return 'None';
};
exports.parseHandoutName = parseHandoutName;
const checkValidFileSize = ({
  file,
  onSizeFail
}) => {
  // Check if the file size is greater than 20 MB, upload size limit
  if (file.size > 20000000) {
    onSizeFail();
    return false;
  }
  return true;
};
exports.checkValidFileSize = checkValidFileSize;
const fileInput = ({
  fileSizeError
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = (0, _reactRedux.useDispatch)();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = _react.default.useRef();
  const click = () => ref.current.click();
  const addFile = e => {
    const file = e.target.files[0];
    if (file && _module.checkValidFileSize({
      file,
      onSizeFail: () => {
        fileSizeError.set();
      }
    })) {
      dispatch(_redux.thunkActions.video.uploadHandout({
        file
      }));
    }
  };
  return {
    click,
    addFile,
    ref
  };
};
exports.fileInput = fileInput;
const fileSizeError = () => {
  const [showSizeError, setShowSizeError] = _module.state.showSizeError(false);
  return {
    fileSizeError: {
      show: showSizeError,
      set: () => setShowSizeError(true),
      dismiss: () => setShowSizeError(false)
    }
  };
};
exports.fileSizeError = fileSizeError;
var _default = exports.default = {
  fileInput,
  fileSizeError,
  parseHandoutName
};
//# sourceMappingURL=hooks.js.map