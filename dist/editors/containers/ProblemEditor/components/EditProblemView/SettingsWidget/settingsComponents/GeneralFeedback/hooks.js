"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.generalFeedbackHooks = void 0;
var _react = require("react");
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _messages = _interopRequireDefault(require("./messages"));
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  summary: val => (0, _react.useState)(val)
};
const generalFeedbackHooks = (generalFeedback, updateSettings) => {
  const [summary, setSummary] = _module.state.summary({
    message: _messages.default.noGeneralFeedbackSummary,
    values: {},
    intl: true
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => {
    if (_lodashEs.default.isEmpty(generalFeedback)) {
      setSummary({
        message: _messages.default.noGeneralFeedbackSummary,
        values: {},
        intl: true
      });
    } else {
      setSummary({
        message: generalFeedback,
        values: {},
        intl: false
      });
    }
  }, [generalFeedback]);
  const handleChange = event => {
    updateSettings({
      generalFeedback: event.target.value
    });
  };
  return {
    summary,
    handleChange
  };
};
exports.generalFeedbackHooks = generalFeedbackHooks;
//# sourceMappingURL=hooks.js.map