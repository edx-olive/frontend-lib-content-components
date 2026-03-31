"use strict";

var _ = require("..");
var _module = _interopRequireWildcard(require("./problem"));
var _olxTestData = require("../../../containers/ProblemEditor/data/mockData/olxTestData");
var _problem2 = require("../../constants/problem");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const mockOlx = 'SOmEVALue';
const mockBuildOlx = jest.fn(() => mockOlx);
jest.mock('../../../containers/ProblemEditor/data/ReactStateOLXParser', () => jest.fn().mockImplementation(() => ({
  buildOLX: mockBuildOlx
})));
jest.mock('..', () => ({
  actions: {
    problem: {
      load: () => {},
      setEnableTypeSelection: () => {},
      updateField: args => args
    }
  }
}));
jest.mock('./requests', () => ({
  fetchAdvancedSettings: args => ({
    fetchAdvanceSettings: args
  })
}));
const blockValue = {
  data: {
    data: _olxTestData.checkboxesOLXWithFeedbackAndHintsOLX.rawOLX,
    metadata: {}
  }
};
let rawOLX = blockValue.data.data;
const rawSettings = {};
const defaultSettings = {
  max_attempts: 1
};
describe('problem thunkActions', () => {
  let dispatch;
  let getState;
  let dispatchedAction;
  beforeEach(() => {
    dispatch = jest.fn(action => ({
      dispatch: action
    }));
    getState = jest.fn(() => ({
      problem: {}
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('initializeProblem visual Problem :', () => {
    _module.initializeProblem(blockValue)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
  test('switchToAdvancedEditor visual Problem', () => {
    _module.switchToAdvancedEditor()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(_.actions.problem.updateField({
      problemType: _problem2.ProblemTypeKeys.ADVANCED,
      rawOLX: mockOlx
    }));
  });
  describe('fetchAdvanceSettings', () => {
    it('dispatches fetchAdvanceSettings action', () => {
      _module.fetchAdvancedSettings({
        rawOLX,
        rawSettings
      })(dispatch);
      [[dispatchedAction]] = dispatch.mock.calls;
      expect(dispatchedAction.fetchAdvanceSettings).not.toEqual(undefined);
    });
    it('dispatches actions.problem.updateField and loadProblem on success', () => {
      dispatch.mockClear();
      _module.fetchAdvancedSettings({
        rawOLX,
        rawSettings
      })(dispatch);
      [[dispatchedAction]] = dispatch.mock.calls;
      dispatchedAction.fetchAdvanceSettings.onSuccess({
        data: {
          key: 'test',
          max_attempts: 1
        }
      });
      expect(dispatch).toHaveBeenCalledWith(_.actions.problem.load());
    });
    it('calls loadProblem on failure', () => {
      dispatch.mockClear();
      _module.fetchAdvancedSettings({
        rawOLX,
        rawSettings
      })(dispatch);
      [[dispatchedAction]] = dispatch.mock.calls;
      dispatchedAction.fetchAdvanceSettings.onFailure();
      expect(dispatch).toHaveBeenCalledWith(_.actions.problem.load());
    });
  });
  describe('loadProblem', () => {
    test('initializeProblem advanced Problem', () => {
      rawOLX = _olxTestData.advancedProblemOlX.rawOLX;
      _module.loadProblem({
        rawOLX,
        rawSettings,
        defaultSettings
      })(dispatch);
      expect(dispatch).toHaveBeenCalledWith(_.actions.problem.load());
    });
    test('initializeProblem blank Problem', () => {
      rawOLX = _olxTestData.blankProblemOLX.rawOLX;
      _module.loadProblem({
        rawOLX,
        rawSettings,
        defaultSettings
      })(dispatch);
      expect(dispatch).toHaveBeenCalledWith(_.actions.problem.setEnableTypeSelection());
    });
  });
});
//# sourceMappingURL=problem.test.js.map