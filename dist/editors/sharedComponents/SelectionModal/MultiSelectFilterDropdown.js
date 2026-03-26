"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../containers/VideoGallery/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MultiSelectFilterDropdown = _ref => {
  let {
    selected,
    onSelectionChange
  } = _ref;
  const intl = (0, _i18n.useIntl)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown, {
    autoClose: false,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.DropdownToggle, {
      variant: "outline",
      id: "gallery-filter",
      children: intl.formatMessage(_utils.filterMessages.title)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Menu, {
      renderOnMount: true,
      className: "p-2",
      children: Object.keys(_utils.filterKeys).map(key => /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
        as: _paragon.Form.Checkbox,
        checked: selected.includes(key),
        onChange: onSelectionChange(key),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "p-1",
          children: intl.formatMessage(_utils.filterMessages[key])
        })
      }, key))
    })]
  });
};
MultiSelectFilterDropdown.propTypes = {
  selected: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  onSelectionChange: _propTypes.default.func.isRequired
};
var _default = MultiSelectFilterDropdown;
exports.default = _default;
//# sourceMappingURL=MultiSelectFilterDropdown.js.map