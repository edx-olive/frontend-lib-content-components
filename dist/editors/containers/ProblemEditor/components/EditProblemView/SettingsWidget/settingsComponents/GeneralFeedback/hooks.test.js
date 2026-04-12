"use strict";

var _react = require("react");
var _testUtils = require("../../../../../../../../testUtils");
var _messages = _interopRequireDefault(require("./messages"));
var hooks = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('react', () => {
  const updateState = jest.fn();
  return {
    updateState,
    useEffect: jest.fn(),
    useState: jest.fn(val => [{
      state: val
    }, newVal => updateState({
      val,
      newVal
    })])
  };
});
jest.mock('@edx/frontend-platform/i18n', () => ({
  defineMessages: m => m
}));
const state = new _testUtils.MockUseState(hooks);
describe('Problem settings hooks', () => {
  let output;
  let updateSettings;
  let generalFeedback;
  beforeEach(() => {
    updateSettings = jest.fn();
    generalFeedback = 'sOmE_vAlUe';
    state.mock();
  });
  afterEach(() => {
    state.restore();
    _react.useEffect.mockClear();
  });
  describe('Show advanced settings', () => {
    beforeEach(() => {
      output = hooks.generalFeedbackHooks(generalFeedback, updateSettings);
    });
    test('test default state is false', () => {
      expect(output.summary.message).toEqual(_messages.default.noGeneralFeedbackSummary);
    });
    test('test showAdvancedCards sets state to true', () => {
      const mockEvent = {
        target: {
          value: 'sOmE_otheR_ValUe'
        }
      };
      output.handleChange(mockEvent);
      expect(updateSettings).toHaveBeenCalledWith({
        generalFeedback: mockEvent.target.value
      });
    });
  });
});
//# sourceMappingURL=hooks.test.js.map