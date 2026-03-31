"use strict";

var _react = _interopRequireDefault(require("react"));
var _testUtils = require("../../../../../testUtils");
var _module = _interopRequireWildcard(require("./hooks"));
var _problem = require("../../../../data/constants/problem");
var _OLXParser = require("../../data/OLXParser");
const _excluded = ["settings"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable prefer-destructuring */
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useState: val => ({
    useState: val
  }),
  useEffect: jest.fn()
}));
const state = new _testUtils.MockUseState(_module);
const mockUpdateField = jest.fn().mockName('updateField');
const mockSelected = 'multiplechoiceresponse';
const mockAdvancedSelected = 'circuitschematic';
const mockSetSelected = jest.fn().mockName('setSelected');
const mocksetBlockTitle = jest.fn().mockName('setBlockTitle');
let hook;
describe('SelectTypeModal hooks', () => {
  beforeEach(() => {
    state.mock();
  });
  afterEach(() => {
    state.restore();
    jest.clearAllMocks();
  });
  describe('selectHooks', () => {
    beforeEach(() => {
      hook = _module.selectHooks();
    });
    test('selected defaults to SINGLESELECT', () => {
      expect(hook.selected).toEqual(_problem.ProblemTypeKeys.SINGLESELECT);
    });
    test('setSelected sets state as expected', () => {
      const expectedArg = 'neWvAl';
      state.mockVal(state.keys.selected, 'mOcKvAl');
      hook.setSelected(expectedArg);
      expect(state.setState.selected).toHaveBeenCalledWith(expectedArg);
    });
  });
  describe('onSelect', () => {
    test('updateField is called with selected templated if selected is an Advanced Problem', () => {
      _module.onSelect({
        selected: mockAdvancedSelected,
        updateField: mockUpdateField,
        setBlockTitle: mocksetBlockTitle
      })();
      expect(mockUpdateField).toHaveBeenCalledWith({
        problemType: _problem.ProblemTypeKeys.ADVANCED,
        rawOLX: _problem.AdvanceProblems[mockAdvancedSelected].template
      });
      expect(mocksetBlockTitle).toHaveBeenCalledWith(_problem.AdvanceProblems[mockAdvancedSelected].title);
    });
    test('updateField is called with selected on visual propblems', () => {
      _module.onSelect({
        selected: mockSelected,
        updateField: mockUpdateField,
        setBlockTitle: mocksetBlockTitle
      })();
      const testOlXParser = new _OLXParser.OLXParser(_problem.ProblemTypes[mockSelected].template);
      const _testOlXParser$getPar = testOlXParser.getParsedOLXData(),
        {
          settings
        } = _testOlXParser$getPar,
        testState = _objectWithoutProperties(_testOlXParser$getPar, _excluded);
      expect(mockUpdateField).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, testState), {}, {
        rawOLX: _problem.ProblemTypes[mockSelected].template
      }));
      expect(mocksetBlockTitle).toHaveBeenCalledWith(_problem.ProblemTypes[mockSelected].title);
    });
  });
  describe('useArrowNav', () => {
    document.body.innerHTML = `
      <div id="multiplechoiceresponse" />
      <div id="choiceresponse" />
      <div id="optionresponse" />
      <div id="numericalresponse" />
      <div id="stringresponse" />
    `;
    const mockKeyUp = new KeyboardEvent('keydown', {
      key: 'ArrowUp'
    });
    const mockKeyDown = new KeyboardEvent('keydown', {
      key: 'ArrowDown'
    });
    let cb;
    let prereqs;
    describe('SINGLESELECT', () => {
      beforeEach(() => {
        _module.useArrowNav(_problem.ProblemTypeKeys.SINGLESELECT, mockSetSelected);
        [cb, prereqs] = _react.default.useEffect.mock.calls[0];
        cb();
      });
      test('pressing up arrow sets MULTISELECT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.SINGLESELECT, mockSetSelected]);
        document.dispatchEvent(mockKeyUp);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.TEXTINPUT);
      });
      test('pressing down arrow sets MULTISELECT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.SINGLESELECT, mockSetSelected]);
        document.dispatchEvent(mockKeyDown);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.MULTISELECT);
      });
    });
    describe('MULTISELECT', () => {
      beforeEach(() => {
        _module.useArrowNav(_problem.ProblemTypeKeys.MULTISELECT, mockSetSelected);
        [cb, prereqs] = _react.default.useEffect.mock.calls[0];
        cb();
      });
      test('pressing up arrow sets SINGLESELECT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.MULTISELECT, mockSetSelected]);
        document.dispatchEvent(mockKeyUp);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.SINGLESELECT);
      });
      test('pressing down arrow sets DROPDOWN', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.MULTISELECT, mockSetSelected]);
        document.dispatchEvent(mockKeyDown);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.DROPDOWN);
      });
    });
    describe('DROPDOWN', () => {
      beforeEach(() => {
        _module.useArrowNav(_problem.ProblemTypeKeys.DROPDOWN, mockSetSelected);
        [cb, prereqs] = _react.default.useEffect.mock.calls[0];
        cb();
      });
      test('pressing up arrow sets MULTISELECT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.DROPDOWN, mockSetSelected]);
        document.dispatchEvent(mockKeyUp);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.MULTISELECT);
      });
      test('pressing down arrow sets NUMERIC', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.DROPDOWN, mockSetSelected]);
        document.dispatchEvent(mockKeyDown);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.NUMERIC);
      });
    });
    describe('NUMERIC', () => {
      beforeEach(() => {
        _module.useArrowNav(_problem.ProblemTypeKeys.NUMERIC, mockSetSelected);
        [cb, prereqs] = _react.default.useEffect.mock.calls[0];
        cb();
      });
      test('pressing up arrow sets DROPDOWN', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.NUMERIC, mockSetSelected]);
        document.dispatchEvent(mockKeyUp);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.DROPDOWN);
      });
      test('pressing down arrow sets TEXTINPUT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.NUMERIC, mockSetSelected]);
        document.dispatchEvent(mockKeyDown);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.TEXTINPUT);
      });
    });
    describe('TEXTINPUT', () => {
      beforeEach(() => {
        _module.useArrowNav(_problem.ProblemTypeKeys.TEXTINPUT, mockSetSelected);
        [cb, prereqs] = _react.default.useEffect.mock.calls[0];
        cb();
      });
      test('pressing up arrow sets NUMERIC', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.TEXTINPUT, mockSetSelected]);
        document.dispatchEvent(mockKeyUp);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.NUMERIC);
      });
      test('pressing down arrow sets SINGLESELECT', () => {
        expect(_react.default.useEffect.mock.calls.length).toEqual(1);
        expect(prereqs).toStrictEqual([_problem.ProblemTypeKeys.TEXTINPUT, mockSetSelected]);
        document.dispatchEvent(mockKeyDown);
        expect(mockSetSelected).toHaveBeenCalledWith(_problem.ProblemTypeKeys.SINGLESELECT);
      });
    });
  });
});
//# sourceMappingURL=hooks.test.js.map