"use strict";

var _auth = require("@edx/frontend-platform/auth");
var utils = _interopRequireWildcard(require("./utils"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn()
}));
describe('cms service utils', () => {
  describe('get', () => {
    it('forwards arguments to authenticatedHttpClient().get', () => {
      const get = jest.fn((...args) => ({
        get: args
      }));
      _auth.getAuthenticatedHttpClient.mockReturnValue({
        get
      });
      const args = ['some', 'args', 'for', 'the', 'test'];
      expect(utils.get(...args)).toEqual(get(...args));
    });
  });
  describe('post', () => {
    it('forwards arguments to authenticatedHttpClient().post', () => {
      const post = jest.fn((...args) => ({
        post: args
      }));
      _auth.getAuthenticatedHttpClient.mockReturnValue({
        post
      });
      const args = ['some', 'args', 'for', 'the', 'test'];
      expect(utils.post(...args)).toEqual(post(...args));
    });
  });
  // describe('deleteObject', () => {
  //   it('forwards arguments to authenticatedHttpClient().delete', () => {
  //     const deleteObject = jest.fn((...args) => ({ delete: args }));
  //     getAuthenticatedHttpClient.mockReturnValue({ deleteObject });
  //     const args = ['some', 'args', 'for', 'the', 'test'];
  //     expect(utils.deleteObject(...args)).toEqual(deleteObject(...args));
  //   });
  // });
});
//# sourceMappingURL=utils.test.js.map