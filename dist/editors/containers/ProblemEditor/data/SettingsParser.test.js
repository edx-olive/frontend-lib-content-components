"use strict";

var _SettingsParser = require("./SettingsParser");
var _problemTestData = require("./mockData/problemTestData");
const _excluded = ["hints"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
describe('Test Settings to State Parser', () => {
  test('Test all fields populated', () => {
    const settings = (0, _SettingsParser.parseSettings)(_problemTestData.checklistWithFeebackHints.metadata);
    const _checklistWithFeeback = _problemTestData.checklistWithFeebackHints.state.settings,
      {
        hints
      } = _checklistWithFeeback,
      settingsPayload = _objectWithoutProperties(_checklistWithFeeback, _excluded);
    expect(settings).toStrictEqual(settingsPayload);
  });
  test('Test score settings', () => {
    const scoreSettings = (0, _SettingsParser.parseScoringSettings)(_problemTestData.checklistWithFeebackHints.metadata);
    expect(scoreSettings).toStrictEqual(_problemTestData.checklistWithFeebackHints.state.settings.scoring);
  });
  test('Test score settings zero attempts', () => {
    const scoreSettings = (0, _SettingsParser.parseScoringSettings)(_problemTestData.numericWithHints.metadata);
    expect(scoreSettings).toStrictEqual(_problemTestData.numericWithHints.state.settings.scoring);
  });
  test('Test score settings attempts missing', () => {
    const scoreSettings = (0, _SettingsParser.parseScoringSettings)(_problemTestData.singleSelectWithHints.metadata);
    expect(scoreSettings.attempts).toStrictEqual(_problemTestData.singleSelectWithHints.state.settings.scoring.attempts);
  });
  test('Test negative attempts in score', () => {
    const scoreSettings = (0, _SettingsParser.parseScoringSettings)(_problemTestData.negativeAttempts.metadata);
    expect(scoreSettings.attempts).toStrictEqual(_problemTestData.negativeAttempts.state.settings.scoring.attempts);
  });
  test('Test score settings missing', () => {
    const settings = (0, _SettingsParser.parseSettings)(_problemTestData.singleSelectWithHints.metadata);
    expect(settings.scoring).toStrictEqual(_problemTestData.singleSelectWithHints.state.settings.scoring);
  });
  test('Test invalid randomization', () => {
    const settings = (0, _SettingsParser.parseSettings)(_problemTestData.numericWithHints.metadata);
    expect(settings.randomization).toBeUndefined();
  });
  test('Test invalid show answer', () => {
    const showAnswerSettings = (0, _SettingsParser.parseShowAnswer)(_problemTestData.numericWithHints.metadata);
    expect(showAnswerSettings.on).toBeUndefined();
  });
  test('Test show answer settings missing', () => {
    const settings = (0, _SettingsParser.parseShowAnswer)(_problemTestData.textInputWithHints.metadata);
    expect(settings.showAnswer).toBeUndefined();
  });
  test('Test empty metadata', () => {
    const scoreSettings = (0, _SettingsParser.parseSettings)({});
    expect(scoreSettings).toStrictEqual({});
  });
  test('Test null metadata', () => {
    const scoreSettings = (0, _SettingsParser.parseSettings)(null);
    expect(scoreSettings).toStrictEqual({});
  });
});
//# sourceMappingURL=SettingsParser.test.js.map