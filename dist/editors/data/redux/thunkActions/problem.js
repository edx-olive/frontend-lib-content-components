"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchToAdvancedEditor = exports.loadProblem = exports.isBlankProblem = exports.initializeProblem = exports.getDataFromOlx = exports.fetchAdvancedSettings = exports.default = void 0;
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _2 = require("..");
var requests = _interopRequireWildcard(require("./requests"));
var _OLXParser = require("../../../containers/ProblemEditor/data/OLXParser");
var _SettingsParser = require("../../../containers/ProblemEditor/data/SettingsParser");
var _problem = require("../../constants/problem");
var _ReactStateOLXParser = _interopRequireDefault(require("../../../containers/ProblemEditor/data/ReactStateOLXParser"));
var _olxTestData = require("../../../containers/ProblemEditor/data/mockData/olxTestData");
var _utils = require("../../../utils");
var _hooks = require("../../../containers/ProblemEditor/components/EditProblemView/hooks");
const _excluded = ["settings"];
/* eslint-disable import/no-cycle */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const switchToAdvancedEditor = () => (dispatch, getState) => {
  const state = getState();
  const editorObject = (0, _hooks.fetchEditorContent)({
    format: ''
  });
  const reactOLXParser = new _ReactStateOLXParser.default({
    problem: state.problem,
    editorObject
  });
  const rawOLX = reactOLXParser.buildOLX();
  dispatch(_2.actions.problem.updateField({
    problemType: _problem.ProblemTypeKeys.ADVANCED,
    rawOLX
  }));
};
exports.switchToAdvancedEditor = switchToAdvancedEditor;
const isBlankProblem = ({
  rawOLX
}) => {
  if (rawOLX.replace(/\s/g, '') === _olxTestData.blankProblemOLX.rawOLX) {
    return true;
  }
  return false;
};
exports.isBlankProblem = isBlankProblem;
const getDataFromOlx = ({
  rawOLX,
  rawSettings
}) => {
  let olxParser;
  let parsedProblem;
  try {
    olxParser = new _OLXParser.OLXParser(rawOLX);
    parsedProblem = olxParser.getParsedOLXData();
  } catch (error) {
    console.error('The Problem Could Not Be Parsed from OLX. redirecting to Advanced editor.', error);
    return {
      problemType: _problem.ProblemTypeKeys.ADVANCED,
      rawOLX,
      settings: (0, _SettingsParser.parseSettings)(rawSettings)
    };
  }
  if (parsedProblem?.problemType === _problem.ProblemTypeKeys.ADVANCED) {
    return {
      problemType: _problem.ProblemTypeKeys.ADVANCED,
      rawOLX,
      settings: (0, _SettingsParser.parseSettings)(rawSettings)
    };
  }
  const {
      settings
    } = parsedProblem,
    data = _objectWithoutProperties(parsedProblem, _excluded);
  const parsedSettings = _objectSpread(_objectSpread({}, settings), (0, _SettingsParser.parseSettings)(rawSettings));
  if (!_lodashEs.default.isEmpty(rawOLX) && !_lodashEs.default.isEmpty(data)) {
    return _objectSpread(_objectSpread({}, data), {}, {
      rawOLX,
      settings: parsedSettings
    });
  }
  return {
    settings: parsedSettings
  };
};
exports.getDataFromOlx = getDataFromOlx;
const loadProblem = ({
  rawOLX,
  rawSettings,
  defaultSettings
}) => dispatch => {
  if (isBlankProblem({
    rawOLX
  })) {
    dispatch(_2.actions.problem.setEnableTypeSelection((0, _utils.camelizeKeys)(defaultSettings)));
  } else {
    dispatch(_2.actions.problem.load(getDataFromOlx({
      rawOLX,
      rawSettings
    })));
  }
};
exports.loadProblem = loadProblem;
const fetchAdvancedSettings = ({
  rawOLX,
  rawSettings
}) => dispatch => {
  const advancedProblemSettingKeys = ['max_attempts', 'showanswer', 'show_reset_button'];
  dispatch(requests.fetchAdvancedSettings({
    onSuccess: response => {
      const defaultSettings = {};
      Object.entries(response.data).forEach(([key, value]) => {
        if (advancedProblemSettingKeys.includes(key)) {
          defaultSettings[key] = value.value;
        }
      });
      dispatch(_2.actions.problem.updateField({
        defaultSettings: (0, _utils.camelizeKeys)(defaultSettings)
      }));
      loadProblem({
        rawOLX,
        rawSettings,
        defaultSettings
      })(dispatch);
    },
    onFailure: () => {
      loadProblem({
        rawOLX,
        rawSettings,
        defaultSettings: {}
      })(dispatch);
    }
  }));
};
exports.fetchAdvancedSettings = fetchAdvancedSettings;
const initializeProblem = blockValue => dispatch => {
  const rawOLX = _lodashEs.default.get(blockValue, 'data.data', {});
  const rawSettings = _lodashEs.default.get(blockValue, 'data.metadata', {});
  dispatch(fetchAdvancedSettings({
    rawOLX,
    rawSettings
  }));
};
exports.initializeProblem = initializeProblem;
var _default = exports.default = {
  initializeProblem,
  switchToAdvancedEditor,
  fetchAdvancedSettings
};
//# sourceMappingURL=problem.js.map