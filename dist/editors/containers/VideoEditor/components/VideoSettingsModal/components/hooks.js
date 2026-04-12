"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetValues = exports.valueHooks = exports.updatedObject = exports.updatedArray = exports.updateFormField = exports.state = exports.selectorKeys = exports.objectWidget = exports.genericWidget = exports.default = exports.arrayWidget = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _utils = require("../../../../../utils");
var _redux = require("../../../../../data/redux");
var _handlers = require("./handlers");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const selectorKeys = exports.selectorKeys = (0, _utils.keyStore)(_redux.selectors.video);
const state = exports.state = (0, _utils.StrictDict)([selectorKeys.videoSource, selectorKeys.videoId, selectorKeys.fallbackVideos, selectorKeys.allowVideoDownloads, selectorKeys.allowVideoSharing, selectorKeys.thumbnail, selectorKeys.transcripts, selectorKeys.allowTranscriptDownloads, selectorKeys.showTranscriptByDefault, selectorKeys.duration, selectorKeys.handout, selectorKeys.licenseType, selectorKeys.licenseDetails].reduce((obj, key) => _objectSpread(_objectSpread({}, obj), {}, {
  [key]: val => (0, _react.useState)(val)
}), {}));

/**
 * updateArray(array, index, val)
 * Returns a new array with the element at <index> replaced with <val>
 * @param {any[]} array - array of values
 * @param {number} index - array index to replace
 * @param {any} val - new value
 * @return {any[]} - new array with element at index replaced with val
 */
const updatedArray = (array, index, val) => {
  const newArray = [...array];
  newArray.splice(index, 1, val);
  return newArray;
};

/**
 * updateObject(object, index, val)
 * Returns a new object with the element at <index> replaced with <val>
 * @param {object} object - object of values
 * @param {string} index - object index to replace
 * @param {any} val - new value
 * @return {any[]} - new object with element at index replaced with val
 */
exports.updatedArray = updatedArray;
const updatedObject = (obj, index, val) => _objectSpread(_objectSpread({}, obj), {}, {
  [index]: val
});

/**
 * updateFormField({ dispatch, key })(val)
 * Creates a callback to update a given form field based on an incoming value.
 * @param {func} dispatch - redux dispatch method
 * @param {string} key - form key
 * @return {func} - callback taking a value and updating the video redux field
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
exports.updatedObject = updatedObject;
const updateFormField = ({
  dispatch,
  key
}) => (0, _react.useCallback)(val => dispatch(_redux.actions.video.updateField({
  [key]: val
})), []);

/**
 * valueHooks({ dispatch, key })
 * returns local and redux state associated with the given data key, as well as methods
 * to update either or both of those.
 * @param {string} key - redux video state key
 * @param {func} dispatch - redux dispatch method
 * @return {object} - hooks based on the local and redux value associated with the given key
 *   formValue - value state in redux
 *   setFormValue - sets form field in redux
 *   local - value state in hook
 *   setLocal - sets form field in hook
 *   setAll - sets form field in hook AND redux
 */
exports.updateFormField = updateFormField;
const valueHooks = ({
  dispatch,
  key
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formValue = (0, _reactRedux.useSelector)(_redux.selectors.video[key]);
  const [local, setLocal] = _module.state[key](formValue);
  const setFormValue = _module.updateFormField({
    dispatch,
    key
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => {
    setLocal(formValue);
  }, [formValue]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setAll = (0, _react.useCallback)(val => {
    setLocal(val);
    setFormValue(val);
  }, [setLocal, setFormValue]);
  return {
    formValue,
    local,
    setLocal,
    setFormValue,
    setAll
  };
};

/**
 * genericWidget({ dispatch, key })
 * Returns the value-tied hooks for inputs associated with a flat value in redux
 * Tied to redux video shape based on data key
 * includes onChange, onBlur, and onCheckedChange methods.  blur and checked change
 * instantly affect both redux and local, while change (while typing) only affects
 * the local component.
 * @param {func} dispatch - redux dispatch method
 * @param {string} key - redux video shape key
 * @return {object} - state hooks
 *   formValue - value state in redux
 *   setFormValue - sets form field in redux
 *   local - value state in hook
 *   setLocal - sets form field in hook
 *   setAll - sets form field in hook AND redux
 *   onChange - handle input change by updating local state
 *   onCheckedChange - handle checked change by updating local and redux state
 *   onBlur - handle input blur by updating local and redux states
 */
exports.valueHooks = valueHooks;
const genericWidget = ({
  dispatch,
  key
}) => {
  const {
    formValue,
    local,
    setLocal,
    setFormValue,
    setAll
  } = _module.valueHooks({
    dispatch,
    key
  });
  return {
    formValue,
    local,
    setLocal,
    setAll,
    setFormValue,
    onChange: (0, _handlers.onValue)(setLocal),
    onCheckedChange: (0, _handlers.onChecked)(setAll),
    onBlur: (0, _handlers.onValue)(setAll)
  };
};

/**
 * arrayWidget({ dispatch, key })
 * Returns the value-tied hooks for inputs associated with a value in an array in the
 * video redux shape.
 * Tied to redux video shape based on data key
 * includes onChange, onBlur, and onClear methods.  blur changes local and redux state,
 * on change affects only local state, and onClear sets both to an empty string.
 * The creators from this widget will require an index to provide the final event-handler.
 * @param {func} dispatch - redux dispatch method
 * @param {string} key - redux video shape key
 * @return {object} - state hooks
 *   formValue - value state in redux
 *   setFormValue - sets form field in redux
 *   local - value state in hook
 *   setLocal - sets form field in hook
 *   setAll - sets form field in hook AND redux
 *   onChange(index) - handle input change by updating local state
 *   onBlur(index) - handle input blur by updating local and redux states
 *   onClear(index) - handle clear event by setting value to empty string
 */
exports.genericWidget = genericWidget;
const arrayWidget = ({
  dispatch,
  key
}) => {
  const widget = _module.valueHooks({
    dispatch,
    key
  });
  return _objectSpread(_objectSpread({}, widget), {}, {
    onBlur: (0, _handlers.handleIndexTransformEvent)({
      handler: _handlers.onValue,
      setter: widget.setAll,
      transform: _module.updatedArray,
      local: widget.local
    }),
    onChange: (0, _handlers.handleIndexTransformEvent)({
      handler: _handlers.onValue,
      setter: widget.setLocal,
      transform: _module.updatedArray,
      local: widget.local
    }),
    onClear: index => () => widget.setAll(_module.updatedArray(widget.local, index, ''))
  });
};

/**
 * objectWidget({ dispatch, key })
 * Returns the value-tied hooks for inputs associated with a value in an object in the
 * video redux shape.
 * Tied to redux video shape based on data key
 * includes onChange and onBlur methods.  blur changes local and redux state,
 * on change affects only local state.
 * The creators from this widget will require an index to provide the final event-handler.
 * @param {func} dispatch - redux dispatch method
 * @param {string} key - redux video shape key
 * @return {object} - state hooks
 *   formValue - value state in redux
 *   setFormValue - sets form field in redux
 *   local - value state in hook
 *   setLocal - sets form field in hook
 *   setAll - sets form field in hook AND redux
 *   onChange(index) - handle input change by updating local state
 *   onBlur(index) - handle input blur by updating local and redux states
 *   onClear(index) - handle clear event by setting value to empty string
 */
exports.arrayWidget = arrayWidget;
const objectWidget = ({
  dispatch,
  key
}) => {
  const widget = _module.valueHooks({
    dispatch,
    key
  });
  return _objectSpread(_objectSpread({}, widget), {}, {
    onChange: (0, _handlers.handleIndexTransformEvent)({
      handler: _handlers.onValue,
      setter: widget.setLocal,
      transform: _module.updatedObject,
      local: widget.local
    }),
    onBlur: (0, _handlers.handleIndexTransformEvent)({
      handler: _handlers.onValue,
      setter: widget.setAll,
      transform: _module.updatedObject,
      local: widget.local
    })
  });
};

/**
 * widgetValues({ fields, dispatch })
 * widget value populator, that takes a fields mapping (dataKey: widgetFn) and dispatch
 * method, and returns object of widget values.
 * @param {object} fields - object with video data keys for keys and widget methods for values
 * @param {func} dispatch - redux dispatch method
 * @return {object} - { <key>: <widgetFn({ key, dispatch })> }
 */
exports.objectWidget = objectWidget;
const widgetValues = ({
  fields,
  dispatch
}) => Object.keys(fields).reduce((obj, key) => _objectSpread(_objectSpread({}, obj), {}, {
  [key]: fields[key]({
    key,
    dispatch
  })
}), {});
exports.widgetValues = widgetValues;
var _default = exports.default = {
  arrayWidget,
  genericWidget,
  objectWidget,
  selectorKeys,
  widgetValues
};
//# sourceMappingURL=hooks.js.map