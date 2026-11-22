"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var moment = _interopRequireWildcard(require("moment-shortformat"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const formatDuration = duration => {
  const d = moment.duration(duration, 'seconds');
  if (d.hours() > 0) {
    return `${d.hours().toString().padStart(2, '0')}:` + `${d.minutes().toString().padStart(2, '0')}:` + `${d.seconds().toString().padStart(2, '0')}`;
  }
  return `${d.minutes().toString().padStart(2, '0')}:` + `${d.seconds().toString().padStart(2, '0')}`;
};
var _default = exports.default = formatDuration;
//# sourceMappingURL=formatDuration.js.map