"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = exports.deleteObject = exports.client = void 0;
var _auth = require("@edx/frontend-platform/auth");
/**
 * get(url)
 * simple wrapper providing an authenticated Http client get action
 * @param {string} url - target url
 */
const get = (...args) => (0, _auth.getAuthenticatedHttpClient)().get(...args);
/**
 * post(url, data)
 * simple wrapper providing an authenticated Http client post action
 * @param {string} url - target url
 * @param {object|string} data - post payload
 */
exports.get = get;
const post = (...args) => (0, _auth.getAuthenticatedHttpClient)().post(...args);
/**
 * delete(url, data)
 * simple wrapper providing an authenticated Http client delete action
 * @param {string} url - target url
 * @param {object|string} data - delete payload
 */
exports.post = post;
const deleteObject = (...args) => (0, _auth.getAuthenticatedHttpClient)().delete(...args);
exports.deleteObject = deleteObject;
const client = exports.client = _auth.getAuthenticatedHttpClient;
//# sourceMappingURL=utils.js.map