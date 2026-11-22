"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSelectLicense = exports.determineText = exports.determineLicense = exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
var _messages = _interopRequireDefault(require("./messages"));
var _redux = require("../../../../../../data/redux");
var _licenses = require("../../../../../../data/constants/licenses");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const determineLicense = ({
  isLibrary,
  licenseType,
  licenseDetails,
  courseLicenseType,
  courseLicenseDetails
}) => {
  let level = _licenses.LicenseLevel.course;
  if (licenseType) {
    if (isLibrary) {
      level = _licenses.LicenseLevel.library;
    } else {
      level = _licenses.LicenseLevel.block;
    }
  }
  return {
    license: licenseType || courseLicenseType,
    details: licenseType ? licenseDetails : courseLicenseDetails,
    level
  };
};
exports.determineLicense = determineLicense;
const determineText = ({
  level
}) => {
  let levelDescription = '';
  let licenseDescription = '';
  switch (level) {
    case _licenses.LicenseLevel.course:
      levelDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.courseLevelDescription));
      licenseDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.courseLicenseDescription));
      break;
    case _licenses.LicenseLevel.library:
      levelDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.libraryLevelDescription));
      licenseDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.libraryLicenseDescription));
      break;
    default:
      // default to block
      levelDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.defaultLevelDescription));
      licenseDescription = /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.defaultLicenseDescription));
      break;
  }
  return {
    levelDescription,
    licenseDescription
  };
};
exports.determineText = determineText;
const onSelectLicense = ({
  dispatch
}) => license => {
  switch (license) {
    case _licenses.LicenseTypes.allRightsReserved:
      dispatch(_redux.actions.video.updateField({
        licenseType: _licenses.LicenseTypes.allRightsReserved,
        licenseDetails: {}
      }));
      break;
    case _licenses.LicenseTypes.creativeCommons:
      dispatch(_redux.actions.video.updateField({
        licenseType: _licenses.LicenseTypes.creativeCommons,
        licenseDetails: {
          attribution: true,
          noncommercial: true,
          noDerivatives: true,
          shareAlike: false
        }
      }));
      break;
    default:
      dispatch(_redux.actions.video.updateField({
        licenseType: _licenses.LicenseTypes.select
      }));
      break;
  }
};
exports.onSelectLicense = onSelectLicense;
var _default = exports.default = {
  determineLicense,
  determineText,
  onSelectLicense
};
//# sourceMappingURL=hooks.js.map