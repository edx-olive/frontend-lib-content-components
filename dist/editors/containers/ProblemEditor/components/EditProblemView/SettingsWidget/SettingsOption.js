"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SettingsOption = void 0;
var _react = _interopRequireWildcard(require("react"));
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _propTypes = require("prop-types");
var _hooks = require("./hooks");
var _CardSection = _interopRequireDefault(require("./CardSection"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["title", "className", "extraSections", "children", "summary", "hasExpandableTextArea"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const SettingsOption = _ref => {
  let {
      title,
      className,
      extraSections,
      children,
      summary,
      hasExpandableTextArea
    } = _ref,
    passThroughProps = _objectWithoutProperties(_ref, _excluded);
  const {
    isCardCollapsibleOpen,
    toggleCardCollapse
  } = (0, _hooks.showFullCard)(hasExpandableTextArea);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
    className: `${className} settingsOption border border-light-700 shadow-none`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Section, {
      className: "settingsCardTitleSection",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Advanced, {
        open: isCardCollapsibleOpen,
        onToggle: toggleCardCollapse,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Trigger, {
          className: "collapsible-trigger d-flex",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "flex-grow-1 text-primary-500 x-small",
            children: title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
            whenClosed: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
              src: _icons.KeyboardArrowDown
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
            whenOpen: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
              src: _icons.KeyboardArrowUp
            })
          })]
        })
      })
    }, `settingsOption-${title}-header`), /*#__PURE__*/(0, _react.createElement)(_CardSection.default, _objectSpread(_objectSpread({}, passThroughProps), {}, {
      isCardCollapsibleOpen: isCardCollapsibleOpen,
      summary: summary,
      key: `settingsOption-${title}-children`
    }), children), extraSections.map((section, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [isCardCollapsibleOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {}), /*#__PURE__*/(0, _react.createElement)(_CardSection.default, _objectSpread(_objectSpread({}, passThroughProps), {}, {
        isCardCollapsibleOpen: isCardCollapsibleOpen,
        key: `settingsOption-${title}-${index}`
      }), section.children)]
    }))]
  });
};
exports.SettingsOption = SettingsOption;
SettingsOption.propTypes = {
  title: _propTypes.string.isRequired,
  children: _propTypes.node.isRequired,
  className: _propTypes.string,
  summary: _propTypes.string.isRequired,
  extraSections: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    children: _propTypes.node
  })),
  hasExpandableTextArea: _propTypes.bool
};
SettingsOption.defaultProps = {
  className: '',
  extraSections: [],
  hasExpandableTextArea: false
};
var _default = exports.default = SettingsOption;
//# sourceMappingURL=SettingsOption.js.map