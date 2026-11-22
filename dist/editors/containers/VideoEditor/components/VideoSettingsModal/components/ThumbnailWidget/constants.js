"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.acceptedImgKeys = exports.MIN_WIDTH = exports.MIN_HEIGHT = exports.MIN_FILE_SIZE_KB = exports.MAX_WIDTH = exports.MAX_HEIGHT = exports.MAX_FILE_SIZE_MB = exports.ASPECT_RATIO_ERROR_MARGIN = exports.ASPECT_RATIO = void 0;
var _utils = require("../../../../../../utils");
const acceptedImgKeys = (0, _utils.StrictDict)({
  gif: '.gif',
  jpg: '.jpg',
  jpeg: '.jpeg',
  png: '.png',
  bmp: '.bmp',
  bmp2: '.bmp2'
});
exports.acceptedImgKeys = acceptedImgKeys;
const MAX_FILE_SIZE_MB = 2000000;
exports.MAX_FILE_SIZE_MB = MAX_FILE_SIZE_MB;
const MIN_FILE_SIZE_KB = 2000;
exports.MIN_FILE_SIZE_KB = MIN_FILE_SIZE_KB;
const MAX_WIDTH = 1280;
exports.MAX_WIDTH = MAX_WIDTH;
const MAX_HEIGHT = 720;
exports.MAX_HEIGHT = MAX_HEIGHT;
const MIN_WIDTH = 640;
exports.MIN_WIDTH = MIN_WIDTH;
const MIN_HEIGHT = 360;
// eslint-disable-next-line no-loss-of-precision
exports.MIN_HEIGHT = MIN_HEIGHT;
const ASPECT_RATIO = 1.7777777777777777777;
exports.ASPECT_RATIO = ASPECT_RATIO;
const ASPECT_RATIO_ERROR_MARGIN = 0.1;
exports.ASPECT_RATIO_ERROR_MARGIN = ASPECT_RATIO_ERROR_MARGIN;
var _default = {
  acceptedImgKeys,
  MAX_FILE_SIZE_MB,
  MIN_FILE_SIZE_KB,
  MAX_WIDTH,
  MAX_HEIGHT,
  MIN_WIDTH,
  MIN_HEIGHT,
  ASPECT_RATIO,
  ASPECT_RATIO_ERROR_MARGIN
};
exports.default = _default;
//# sourceMappingURL=constants.js.map