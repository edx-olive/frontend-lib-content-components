"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useArrowNav = exports.state = exports.selectHooks = exports.onSelect = exports.default = void 0;
var _react = require("react");
var _problem = require("../../../../data/constants/problem");
var _utils = require("../../../../utils");
var _module = _interopRequireWildcard(require("./hooks"));
var _problem2 = require("../../../../data/redux/thunkActions/problem");
const _excluded = ["settings"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const state = exports.state = (0, _utils.StrictDict)({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  selected: val => (0, _react.useState)(val)
});
const selectHooks = () => {
  const [selected, setSelected] = _module.state.selected(_problem.ProblemTypeKeys.SINGLESELECT);
  return {
    selected,
    setSelected
  };
};
exports.selectHooks = selectHooks;
const onSelect = ({
  selected,
  updateField,
  setBlockTitle
}) => () => {
  if (Object.values(_problem.AdvanceProblemKeys).includes(selected)) {
    updateField({
      problemType: _problem.ProblemTypeKeys.ADVANCED,
      rawOLX: _problem.AdvanceProblems[selected].template
    });
    setBlockTitle(_problem.AdvanceProblems[selected].title);
  } else {
    const newOLX = _problem.ProblemTypes[selected].template;
    const _getDataFromOlx = (0, _problem2.getDataFromOlx)({
        rawOLX: newOLX,
        rawSettings: {}
      }),
      {
        settings
      } = _getDataFromOlx,
      newState = _objectWithoutProperties(_getDataFromOlx, _excluded);
    updateField(_objectSpread({}, newState));
    setBlockTitle(_problem.ProblemTypes[selected].title);
  }
};
exports.onSelect = onSelect;
const useArrowNav = (selected, setSelected) => {
  const detectKeyDown = e => {
    const problemTypeValues = Object.values(_problem.ProblemTypeKeys);
    switch (e.key) {
      case 'ArrowUp':
        if (problemTypeValues.includes(selected) && _problem.ProblemTypes[selected].prev) {
          setSelected(_problem.ProblemTypes[selected].prev);
          document.getElementById(_problem.ProblemTypes[selected].prev).focus();
        }
        break;
      case 'ArrowDown':
        if (problemTypeValues.includes(selected) && _problem.ProblemTypes[selected].next) {
          setSelected(_problem.ProblemTypes[selected].next);
          document.getElementById(_problem.ProblemTypes[selected].next).focus();
        }
        break;
      default:
    }
  };
  (0, _react.useEffect)(() => {
    document.addEventListener('keydown', detectKeyDown, true);
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
    };
  }, [selected, setSelected]);
};
exports.useArrowNav = useArrowNav;
var _default = exports.default = {
  state,
  selectHooks,
  onSelect,
  useArrowNav
};
//# sourceMappingURL=hooks.js.map