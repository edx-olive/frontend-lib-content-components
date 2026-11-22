"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.navigateCallback = exports.localTitleHooks = exports.hooks = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../../../data/redux");
var textEditorHooks = _interopRequireWildcard(require("../../hooks"));
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  navigateCallback
} = textEditorHooks;
exports.navigateCallback = navigateCallback;
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  localTitle: args => _react.default.useState(args)
};
const hooks = exports.hooks = {
  isEditing: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isEditing, setIsEditing] = _react.default.useState(false);
    return {
      isEditing,
      startEditing: () => setIsEditing(true),
      stopEditing: () => setIsEditing(false)
    };
  },
  localTitle: ({
    dispatch,
    stopEditing
  }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const title = (0, _reactRedux.useSelector)(_redux.selectors.app.displayTitle);
    const [localTitle, setLocalTitle] = _module.state.localTitle(title);
    return {
      updateTitle: e => {
        if (localTitle.length <= 0) {
          setLocalTitle(title);
          stopEditing();
        } else if (!e.currentTarget.contains(e.relatedTarget)) {
          dispatch(_redux.actions.app.setBlockTitle(localTitle));
          stopEditing();
        }
      },
      handleChange: e => setLocalTitle(e.target.value),
      cancelEdit: () => {
        setLocalTitle(title);
        stopEditing();
      },
      localTitle
    };
  }
};
const localTitleHooks = ({
  dispatch
}) => {
  const {
    isEditing,
    startEditing,
    stopEditing
  } = _module.hooks.isEditing();
  const {
    localTitle,
    handleChange,
    updateTitle,
    cancelEdit
  } = _module.hooks.localTitle({
    dispatch,
    stopEditing
  });
  return {
    isEditing,
    startEditing,
    stopEditing,
    cancelEdit,
    localTitle,
    updateTitle,
    handleChange,
    inputRef: /*#__PURE__*/_react.default.createRef()
  };
};
exports.localTitleHooks = localTitleHooks;
//# sourceMappingURL=hooks.js.map