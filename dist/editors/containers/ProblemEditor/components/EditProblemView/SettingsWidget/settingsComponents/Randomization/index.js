"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RandomizationCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SettingsOption = _interopRequireDefault(require("../../SettingsOption"));
var _messages = _interopRequireDefault(require("./messages"));
var _hooks = require("./hooks");
var _problem = require("../../../../../../../data/constants/problem");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RandomizationCard = _ref => {
  let {
    randomization,
    updateSettings,
    // inject
    intl
  } = _ref;
  const {
    summary,
    handleChange
  } = (0, _hooks.useRandomizationSettingStatus)({
    randomization,
    updateSettings
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SettingsOption.default, {
    title: intl.formatMessage(_messages.default.randomizationSettingTitle),
    summary: intl.formatMessage(summary.message),
    none: !randomization,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mb-3",
      children: intl.formatMessage(_messages.default.randomizationSettingText, {
        randomization
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
        as: "select",
        value: randomization,
        onChange: handleChange,
        children: Object.values(_problem.RandomizationTypesKeys).map(randomizationType => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: randomizationType,
          children: intl.formatMessage(_problem.RandomizationTypes[randomizationType])
        }, randomizationType))
      })
    })]
  });
};
exports.RandomizationCard = RandomizationCard;
RandomizationCard.propTypes = {
  randomization: _propTypes.default.string.isRequired,
  updateSettings: _propTypes.default.func.isRequired,
  intl: _i18n.intlShape.isRequired
};
var _default = (0, _i18n.injectIntl)(RandomizationCard);
exports.default = _default;
//# sourceMappingURL=index.js.map