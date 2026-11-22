"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _messages = _interopRequireDefault(require("../messages"));
var _api = require("../../../../../../data/services/cms/api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getVideoType(videoSource) {
  if ((0, _api.parseYoutubeId)(videoSource) !== null) {
    return _messages.default.videoTypeYoutube;
  }
  return _messages.default.videoTypeOther;
}
var _default = exports.default = {
  getVideoType
};
//# sourceMappingURL=hooks.js.map