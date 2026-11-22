"use strict";

var _ReactStateSettingsParser = _interopRequireDefault(require("./ReactStateSettingsParser"));
var _problemTestData = require("./mockData/problemTestData");
const _excluded = ["markdown"],
  _excluded2 = ["markdown"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
describe('Test State to Settings Parser', () => {
  test('Test settings parsed from react state', () => {
    const settings = new _ReactStateSettingsParser.default({
      problem: _problemTestData.checklistWithFeebackHints.state
    }).getSettings();
    const _checklistWithFeeback = _problemTestData.checklistWithFeebackHints.metadata,
      {
        markdown
      } = _checklistWithFeeback,
      settingsPayload = _objectWithoutProperties(_checklistWithFeeback, _excluded);
    expect(settings).toStrictEqual(settingsPayload);
  });
  test('Test settings parsed from raw olx', () => {
    const settings = new _ReactStateSettingsParser.default({
      problem: _problemTestData.checklistWithFeebackHints.state,
      rawOLX: '<problem showanswer="always">text</problem>'
    }).parseRawOlxSettings();
    const _checklistWithFeeback2 = _problemTestData.checklistWithFeebackHints.metadata,
      {
        markdown
      } = _checklistWithFeeback2,
      settingsPayload = _objectWithoutProperties(_checklistWithFeeback2, _excluded2);
    expect(settings).toStrictEqual(_objectSpread(_objectSpread({}, settingsPayload), {}, {
      showanswer: 'always'
    }));
  });
});
//# sourceMappingURL=ReactStateSettingsParser.test.js.map