"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnswerRangeSet = exports.handleToleranceValueChange = exports.handleToleranceTypeChange = exports.getSummary = exports.default = exports.ToleranceCard = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SettingsOption = _interopRequireDefault(require("../../SettingsOption"));
var _messages = _interopRequireDefault(require("./messages"));
var _constants = require("./constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-next-line no-unused-vars
const isAnswerRangeSet = ({
  answers
}) => !!answers[0].isAnswerRange;
exports.isAnswerRangeSet = isAnswerRangeSet;
const handleToleranceTypeChange = ({
  updateSettings,
  tolerance,
  answers
}) => event => {
  if (!isAnswerRangeSet({
    answers
  })) {
    let value;
    if (event.target.value === _constants.ToleranceTypes.none.type) {
      value = null;
    } else {
      value = tolerance.value || 0;
    }
    const newTolerance = {
      type: _constants.ToleranceTypes[Object.keys(_constants.ToleranceTypes)[event.target.selectedIndex]].type,
      value
    };
    updateSettings({
      tolerance: newTolerance
    });
  }
};
exports.handleToleranceTypeChange = handleToleranceTypeChange;
const handleToleranceValueChange = ({
  updateSettings,
  tolerance,
  answers
}) => event => {
  if (!isAnswerRangeSet({
    answers
  })) {
    const newTolerance = {
      value: event.target.value,
      type: tolerance.type
    };
    updateSettings({
      tolerance: newTolerance
    });
  }
};
exports.handleToleranceValueChange = handleToleranceValueChange;
const getSummary = ({
  tolerance,
  intl
}) => {
  switch (tolerance?.type) {
    case _constants.ToleranceTypes.percent.type:
      return `± ${tolerance.value}%`;
    case _constants.ToleranceTypes.number.type:
      return `± ${tolerance.value}`;
    case _constants.ToleranceTypes.none.type:
      return intl.formatMessage(_messages.default.noneToleranceSummary);
    default:
      return intl.formatMessage(_messages.default.noneToleranceSummary);
  }
};
exports.getSummary = getSummary;
const ToleranceCard = ({
  tolerance,
  answers,
  updateSettings,
  // inject
  intl
}) => {
  const isAnswerRange = isAnswerRangeSet({
    answers
  });
  let summary = getSummary({
    tolerance,
    intl
  });
  (0, _react.useEffect)(() => {
    summary = getSummary({
      tolerance,
      intl
    });
  }, [tolerance]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SettingsOption.default, {
    title: intl.formatMessage(_messages.default.toleranceSettingTitle),
    summary: summary,
    none: tolerance.type === _constants.ToleranceTypes.none.type,
    children: [isAnswerRange && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
      varaint: "info",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.toleranceAnswerRangeWarning))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mb-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.toleranceSettingText))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Form.Group, {
      className: "pb-0 mb-0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
        as: "select",
        onChange: handleToleranceTypeChange({
          updateSettings,
          tolerance,
          answers
        }),
        disabled: isAnswerRange,
        value: tolerance.type,
        children: Object.keys(_constants.ToleranceTypes).map(toleranceType => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: toleranceType.type,
          children: intl.formatMessage(_constants.ToleranceTypes[toleranceType].message)
        }, toleranceType.type))
      }), tolerance?.type !== _constants.ToleranceTypes.none.type && !isAnswerRange && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
        className: "mt-4",
        type: "number",
        value: tolerance.value,
        onChange: handleToleranceValueChange({
          updateSettings,
          tolerance,
          answers
        }),
        floatingLabel: intl.formatMessage(_messages.default.toleranceValueInputLabel)
      })]
    })]
  });
};
exports.ToleranceCard = ToleranceCard;
ToleranceCard.propTypes = {
  tolerance: _propTypes.default.shape({
    type: _propTypes.default.string,
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.any])
  }).isRequired,
  answers: _propTypes.default.arrayOf(_propTypes.default.shape({
    correct: _propTypes.default.bool,
    id: _propTypes.default.string,
    selectedFeedback: _propTypes.default.string,
    title: _propTypes.default.string,
    unselectedFeedback: _propTypes.default.string
  })).isRequired,
  updateSettings: _propTypes.default.func.isRequired,
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(ToleranceCard);
//# sourceMappingURL=index.js.map