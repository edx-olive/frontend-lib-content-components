"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueFromDuration = exports.updateDuration = exports.onDurationKeyDown = exports.onDurationChange = exports.durationWidget = exports.durationStringFromValue = exports.durationString = exports.default = void 0;
var _react = require("react");
var _messages = _interopRequireDefault(require("../messages"));
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const durationMatcher = /^(\d{0,2}):?(\d{0,2})?:?(\d{0,2})?$/i;
const durationWidget = ({
  duration,
  updateField
}) => {
  const setDuration = val => updateField({
    duration: val
  });
  const initialState = _module.durationString(duration);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [unsavedDuration, setUnsavedDuration] = (0, _react.useState)(initialState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => {
    setUnsavedDuration(_module.durationString(duration));
  }, [duration]);
  return {
    unsavedDuration,
    onBlur: index => e => _module.updateDuration({
      duration,
      setDuration,
      unsavedDuration,
      setUnsavedDuration,
      index,
      inputString: e.target.value
    }),
    onChange: index => e => setUnsavedDuration(_module.onDurationChange(unsavedDuration, index, e.target.value)),
    onKeyDown: index => e => setUnsavedDuration(_module.onDurationKeyDown(unsavedDuration, index, e)),
    getTotalLabel: ({
      durationString,
      subtitle,
      intl
    }) => {
      if (!durationString.stopTime) {
        if (!durationString.startTime) {
          return intl.formatMessage(_messages.default.fullVideoLength);
        }
        if (subtitle) {
          return intl.formatMessage(_messages.default.startsAt, {
            startTime: _module.durationStringFromValue(durationString.startTime)
          });
        }
        return null;
      }
      const total = durationString.stopTime - (durationString.startTime || 0);
      return intl.formatMessage(subtitle ? _messages.default.custom : _messages.default.total, {
        total: _module.durationStringFromValue(total)
      });
    }
  };
};

/**
 * durationString(duration)
 * Returns the display value for embedded start and stop times
 * @param {object} duration - object containing startTime and stopTime millisecond values
 * @return {object} - start and stop time from incoming object mapped to duration strings.
 */
exports.durationWidget = durationWidget;
const durationString = duration => ({
  startTime: _module.durationStringFromValue(duration.startTime),
  stopTime: _module.durationStringFromValue(duration.stopTime)
});

/**
 * durationStringFromValue(value)
 * Returns a duration string in 'hh:mm:ss' format from the given ms value
 * @param {number} value - duration (in milliseconds)
 * @return {string} - duration in 'hh:mm:ss' format
 */
exports.durationString = durationString;
const durationStringFromValue = value => {
  // return 'why';
  if (!value || typeof value !== 'number' || value <= 0) {
    return '00:00:00';
  }
  const seconds = Math.floor(value / 1000 % 60);
  const minutes = Math.floor(value / 60000 % 60);
  const hours = Math.floor(value / 3600000 % 60);
  const zeroPad = num => String(num).padStart(2, '0');
  return [hours, minutes, seconds].map(zeroPad).join(':');
};

/**
 * updateDuration({ duration, unsavedDuration, setUnsavedDuration, setDuration })
 * Returns a memoized callback based on inputs that updates unsavedDuration value and form value
 * if the new string is valid (duration stores a number, unsavedDuration stores a string).
 * If the duration string is invalid, resets the unsavedDuration value to the latest good value.
 * @param {object} duration - redux-stored durations in milliseconds
 * @param {object} unsavedDuration - hook-stored duration in 'hh:mm:ss' format
 * @param {func} setDuration - set form value
 * @param {func} setUnsavedDuration - set unsavedDuration object
 * @param {string} index - startTime or stopTime
 * @param {string} inputString - string value of user input for either the start or stop time fields
 * @return {func} - callback to update duration unsavedDurationly and in redux
 *   updateDuration(args)(index, durationString)
 */
exports.durationStringFromValue = durationStringFromValue;
const updateDuration = ({
  duration,
  unsavedDuration,
  setDuration,
  setUnsavedDuration,
  index,
  inputString
}) => {
  let newDurationString = inputString;
  let newValue = _module.valueFromDuration(newDurationString);
  // maxTime is 23:59:59 or 86399 seconds
  if (newValue > 86399000) {
    newValue = 86399000;
  }
  // stopTime must be at least 1 second, if not zero
  if (index === 'stopTime' && newValue > 0 && newValue < 1000) {
    newValue = 1000;
  }
  // stopTime must be at least 1 second after startTime, except 0 means no custom stopTime
  if (index === 'stopTime' && newValue > 0 && newValue < duration.startTime + 1000) {
    newValue = duration.startTime + 1000;
  }
  // startTime must be at least 1 second before stopTime, except when stopTime is less than a second
  // (stopTime should only be less than a second if it's zero, but we're being paranoid)
  if (index === 'startTime' && duration.stopTime >= 1000 && newValue > duration.stopTime - 1000) {
    newValue = duration.stopTime - 1000;
  }
  newDurationString = _module.durationStringFromValue(newValue);
  setUnsavedDuration(_objectSpread(_objectSpread({}, unsavedDuration), {}, {
    [index]: newDurationString
  }));
  setDuration(_objectSpread(_objectSpread({}, duration), {}, {
    [index]: newValue
  }));
};

/**
 * onDurationChange(duration)
 * Returns a new duration value based on onChange event
 * @param {object} duration - object containing startTime and stopTime millisecond values
 * @param {string} index - 'startTime or 'stopTime'
 * @param {string} val - duration in 'hh:mm:ss' format
 * @return {object} duration - object containing startTime and stopTime millisecond values
 */
exports.updateDuration = updateDuration;
const onDurationChange = (duration, index, val) => {
  const match = val.trim().match(durationMatcher);
  if (!match) {
    return duration;
  }
  const caretPos = document.activeElement.selectionStart;
  let newDuration = val;
  if (caretPos === newDuration.length && (newDuration.length === 2 || newDuration.length === 5)) {
    newDuration += ':';
  }
  return _objectSpread(_objectSpread({}, duration), {}, {
    [index]: newDuration
  });
};

/**
 * onDurationKeyDown(duration)
 * Returns a new duration value based on onKeyDown event
 * @param {object} duration - object containing startTime and stopTime millisecond values
 * @param {string} index - 'startTime or 'stopTime'
 * @param {Event} event - event from onKeyDown
 * @return {object} duration - object containing startTime and stopTime millisecond values
 */
exports.onDurationChange = onDurationChange;
const onDurationKeyDown = (duration, index, event) => {
  const caretPos = document.activeElement.selectionStart;
  let newDuration = duration[index];
  switch (event.key) {
    case 'Enter':
      document.activeElement.blur();
      break;
    case 'Backspace':
      if (caretPos === newDuration.length && newDuration.slice(-1) === ':') {
        newDuration = newDuration.slice(0, -1);
      }
      break;
    default:
      break;
  }
  return _objectSpread(_objectSpread({}, duration), {}, {
    [index]: newDuration
  });
};

/**
 * valueFromDuration(duration)
 * Returns a millisecond duration value from the given 'hh:mm:ss' format string
 * @param {string} duration - duration in 'hh:mm:ss' format
 * @return {number} - duration in milliseconds. Returns null if duration is invalid.
 */
exports.onDurationKeyDown = onDurationKeyDown;
const valueFromDuration = duration => {
  let matches = duration.trim().match(durationMatcher);
  if (!matches) {
    return 0;
  }
  matches = matches.slice(1).filter(v => v !== undefined);
  if (matches.length < 3) {
    for (let i = 0; i <= 3 - matches.length; i++) {
      matches.unshift(0);
    }
  }
  const [hours, minutes, seconds] = matches.map(x => parseInt(x, 10) || 0);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
};
exports.valueFromDuration = valueFromDuration;
var _default = exports.default = {
  durationWidget,
  durationString,
  durationStringFromValue,
  updateDuration,
  onDurationChange,
  onDurationKeyDown,
  valueFromDuration
};
//# sourceMappingURL=hooks.js.map