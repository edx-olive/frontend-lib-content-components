"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _logging = require("@edx/frontend-platform/logging");
var _ErrorPage = _interopRequireDefault(require("./ErrorPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Error boundary component used to log caught errors and display the error page.
 *
 * @memberof module:React
 * @extends {Component}
 */class ErrorBoundary extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    (0, _logging.logError)(error, {
      stack: info.componentStack
    });
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorPage.default, {
        learningContextId: this.props.learningContextId,
        studioEndpointUrl: this.props.studioEndpointUrl
      });
    }
    return this.props.children;
  }
}
exports.default = ErrorBoundary;
ErrorBoundary.propTypes = {
  children: _propTypes.default.node,
  learningContextId: _propTypes.default.string,
  studioEndpointUrl: _propTypes.default.string
};
ErrorBoundary.defaultProps = {
  children: null,
  learningContextId: null,
  studioEndpointUrl: null
};
//# sourceMappingURL=index.js.map