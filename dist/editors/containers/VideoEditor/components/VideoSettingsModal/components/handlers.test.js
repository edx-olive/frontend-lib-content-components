"use strict";

var handlers = _interopRequireWildcard(require("./handlers"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const handler = jest.fn(cb => ({
  handler: cb
}));
const transform = jest.fn((...args) => ({
  transform: args
}));
const setter = jest.fn(val => ({
  setter: val
}));
const index = 'test-index';
const val = 'TEST value';
const local = 'local-test-value';
describe('Video Settings Modal event handler methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('handleIndexEvent', () => {
    describe('returned method', () => {
      it('takes index and calls handler with transform handler based on index', () => {
        expect(handlers.handleIndexEvent({
          handler,
          transform
        })(index).handler(val)).toEqual(transform(index, val));
      });
    });
  });
  describe('handleIndexTransformEvent', () => {
    describe('returned method', () => {
      it('takes index and calls handler with setter(transform(local, index, val))', () => {
        expect(handlers.handleIndexTransformEvent({
          handler,
          setter,
          local,
          transform
        })(index).handler(val)).toEqual(setter(transform(local, index, val)));
      });
    });
  });
  describe('onValue', () => {
    describe('returned method', () => {
      it('calls handler with event.target.value', () => {
        expect(handlers.onValue(handler)({
          target: {
            value: val
          }
        })).toEqual(handler(val));
      });
    });
  });
  describe('onChecked', () => {
    describe('returned method', () => {
      it('calls handler with event.target.checked', () => {
        expect(handlers.onChecked(handler)({
          target: {
            checked: val
          }
        })).toEqual(handler(val));
      });
    });
  });
  describe('onEvent', () => {
    describe('returned method', () => {
      it('calls handler with event', () => {
        expect(handlers.onEvent(handler)(val)).toEqual(handler(val));
      });
    });
  });
});
//# sourceMappingURL=handlers.test.js.map