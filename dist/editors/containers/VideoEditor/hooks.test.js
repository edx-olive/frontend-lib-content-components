"use strict";

var _reactRedux = require("react-redux");
var _redux = require("../../data/redux");
var _testUtils = require("../../../testUtils");
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useRef: jest.fn(val => ({
    current: val
  })),
  useEffect: jest.fn(),
  useCallback: (cb, prereqs) => ({
    cb,
    prereqs
  })
}));
jest.mock('react-redux', () => {
  const dispatchFn = jest.fn();
  return _objectSpread(_objectSpread({}, jest.requireActual('react-redux')), {}, {
    dispatch: dispatchFn,
    useDispatch: jest.fn(() => dispatchFn)
  });
});
jest.mock('../../data/redux', () => ({
  thunkActions: {
    video: {
      saveVideoData: jest.fn()
    }
  }
}));
const state = new _testUtils.MockUseState(_module);
let hook;
describe('VideoEditorHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('state hooks', () => {
    state.testGetter(state.keys.durationErrors);
    state.testGetter(state.keys.handoutErrors);
    state.testGetter(state.keys.licenseErrors);
    state.testGetter(state.keys.thumbnailErrors);
    state.testGetter(state.keys.transcriptsErrors);
    state.testGetter(state.keys.videoSourceErrors);
  });
  describe('errors hook', () => {
    beforeEach(() => {
      state.mock();
    });
    afterEach(() => {
      state.restore();
    });
    const fakeDurationError = {
      field1: 'field1msg',
      field2: 'field2msg'
    };
    test('error: state values', () => {
      expect(_module.errorsHook().error.duration).toEqual([state.stateVals[state.keys.durationErrors], state.setState[state.keys.durationErrors]]);
      expect(_module.errorsHook().error.handout).toEqual([state.stateVals[state.keys.handoutErrors], state.setState[state.keys.handoutErrors]]);
      expect(_module.errorsHook().error.license).toEqual([state.stateVals[state.keys.licenseErrors], state.setState[state.keys.licenseErrors]]);
      expect(_module.errorsHook().error.thumbnail).toEqual([state.stateVals[state.keys.thumbnailErrors], state.setState[state.keys.thumbnailErrors]]);
      expect(_module.errorsHook().error.transcripts).toEqual([state.stateVals[state.keys.transcriptsErrors], state.setState[state.keys.transcriptsErrors]]);
      expect(_module.errorsHook().error.videoSource).toEqual([state.stateVals[state.keys.videoSourceErrors], state.setState[state.keys.videoSourceErrors]]);
    });
    describe('validateEntry', () => {
      test('validateEntry: returns true if all validation calls are true', () => {
        hook = _module.errorsHook();
        expect(hook.validateEntry()).toEqual(true);
      });
      test('validateEntry: returns false if any validation calls are false', () => {
        state.mockVal(state.keys.durationErrors, fakeDurationError);
        hook = _module.errorsHook();
        expect(hook.validateEntry()).toEqual(false);
      });
    });
  });
  describe('fetchVideoContent', () => {
    it('equals dispatch(thunkActions.video.saveVideoData())', () => {
      hook = _module.fetchVideoContent()({
        dispatch: _reactRedux.dispatch
      });
      expect(hook).toEqual((0, _reactRedux.dispatch)(_redux.thunkActions.video.saveVideoData()));
    });
  });
});
//# sourceMappingURL=hooks.test.js.map