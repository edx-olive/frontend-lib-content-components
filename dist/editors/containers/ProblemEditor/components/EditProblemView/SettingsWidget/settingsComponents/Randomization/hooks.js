"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRandomizationSettingStatus = exports.state = exports.default = void 0;
var _react = require("react");
var _problem = require("../../../../../../../data/constants/problem");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  summary: val => (0, _react.useState)(val)
};
const useRandomizationSettingStatus = ({
  randomization,
  updateSettings
}) => {
  const [summary, setSummary] = _module.state.summary({
    message: _problem.RandomizationTypes[_problem.RandomizationTypesKeys.NEVER],
    values: {}
  });
  (0, _react.useEffect)(() => {
    setSummary({
      message: randomization ? _problem.RandomizationTypes[randomization] : _problem.RandomizationTypes[_problem.RandomizationTypesKeys.NEVER]
    });
  }, [randomization]);
  const handleChange = event => {
    updateSettings({
      randomization: event.target.value
    });
  };
  return {
    summary,
    handleChange
  };
};
exports.useRandomizationSettingStatus = useRandomizationSettingStatus;
var _default = exports.default = useRandomizationSettingStatus;
//# sourceMappingURL=hooks.js.map