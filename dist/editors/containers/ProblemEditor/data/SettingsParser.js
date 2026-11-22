"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popuplateItem = exports.parseShowAnswer = exports.parseSettings = exports.parseScoringSettings = void 0;
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _problem = require("../../../data/constants/problem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const popuplateItem = (parentObject, itemName, statekey, metadata) => {
  let parent = parentObject;
  const item = _lodashEs.default.get(metadata, itemName, null);
  if (!_lodashEs.default.isNil(item)) {
    parent = _objectSpread(_objectSpread({}, parentObject), {}, {
      [statekey]: item
    });
  }
  return parent;
};
exports.popuplateItem = popuplateItem;
const parseScoringSettings = metadata => {
  let scoring = {};
  let attempts = popuplateItem({}, 'max_attempts', 'number', metadata);
  if (_lodashEs.default.isEmpty(attempts) || _lodashEs.default.isNaN(attempts.number)) {
    attempts = {
      unlimited: true,
      number: ''
    };
  } else {
    attempts.unlimited = false;
    if (attempts.number < 0) {
      attempts.number = 0;
    }
  }
  scoring = _objectSpread(_objectSpread({}, scoring), {}, {
    attempts
  });
  scoring = popuplateItem(scoring, 'weight', 'weight', metadata);
  return scoring;
};
exports.parseScoringSettings = parseScoringSettings;
const parseShowAnswer = metadata => {
  let showAnswer = {};
  const showAnswerType = _lodashEs.default.get(metadata, 'showanswer', {});
  if (!_lodashEs.default.isNil(showAnswerType) && showAnswerType in _problem.ShowAnswerTypes) {
    showAnswer = _objectSpread(_objectSpread({}, showAnswer), {}, {
      on: showAnswerType
    });
  }
  showAnswer = popuplateItem(showAnswer, 'attempts_before_showanswer_button', 'afterAttempts', metadata);
  return showAnswer;
};
exports.parseShowAnswer = parseShowAnswer;
const parseSettings = metadata => {
  let settings = {};
  if (_lodashEs.default.isNil(metadata) || _lodashEs.default.isEmpty(metadata)) {
    return settings;
  }
  const scoring = parseScoringSettings(metadata);
  if (!_lodashEs.default.isEmpty(scoring)) {
    settings = _objectSpread(_objectSpread({}, settings), {}, {
      scoring
    });
  }
  const showAnswer = parseShowAnswer(metadata);
  if (!_lodashEs.default.isEmpty(showAnswer)) {
    settings = _objectSpread(_objectSpread({}, settings), {}, {
      showAnswer
    });
  }
  const randomizationType = _lodashEs.default.get(metadata, 'rerandomize', {});
  if (!_lodashEs.default.isEmpty(randomizationType) && Object.values(_problem.RandomizationTypesKeys).includes(randomizationType)) {
    settings = popuplateItem(settings, 'rerandomize', 'randomization', metadata);
  }
  settings = popuplateItem(settings, 'show_reset_button', 'showResetButton', metadata);
  settings = popuplateItem(settings, 'submission_wait_seconds', 'timeBetween', metadata);
  return settings;
};
exports.parseSettings = parseSettings;
//# sourceMappingURL=SettingsParser.js.map