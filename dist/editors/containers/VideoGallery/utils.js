"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortMessages = exports.sortKeys = exports.sortFunctions = exports.filterMessages = exports.filterKeys = exports.acceptedImgKeys = void 0;
var _utils = require("../../utils");
var _messages = _interopRequireDefault(require("./messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const messageKeys = (0, _utils.keyStore)(_messages.default);
const sortKeys = (0, _utils.StrictDict)({
  dateNewest: 'dateNewest',
  dateOldest: 'dateOldest',
  nameAscending: 'nameAscending',
  nameDescending: 'nameDescending',
  durationShortest: 'durationShortest',
  durationLongest: 'durationLongest'
});
exports.sortKeys = sortKeys;
const sortMessages = (0, _utils.StrictDict)({
  dateNewest: _messages.default[messageKeys.sortByDateNewest],
  dateOldest: _messages.default[messageKeys.sortByDateOldest],
  nameAscending: _messages.default[messageKeys.sortByNameAscending],
  nameDescending: _messages.default[messageKeys.sortByNameDescending],
  durationShortest: _messages.default[messageKeys.sortByDurationShortest],
  durationLongest: _messages.default[messageKeys.sortByDurationLongest]
});
exports.sortMessages = sortMessages;
const filterKeys = (0, _utils.StrictDict)({
  uploading: 'Uploading',
  processing: 'In Progress',
  ready: 'Ready',
  failed: 'Failed'
});
exports.filterKeys = filterKeys;
const filterMessages = (0, _utils.StrictDict)({
  title: _messages.default[messageKeys.filterByVideoStatusNone],
  uploading: _messages.default[messageKeys.filterByVideoStatusUploading],
  processing: _messages.default[messageKeys.filterByVideoStatusProcessing],
  ready: _messages.default[messageKeys.filterByVideoStatusReady],
  failed: _messages.default[messageKeys.filterByVideoStatusFailed]
});
exports.filterMessages = filterMessages;
const sortFunctions = (0, _utils.StrictDict)({
  dateNewest: (a, b) => b.dateAdded - a.dateAdded,
  dateOldest: (a, b) => a.dateAdded - b.dateAdded,
  nameAscending: (a, b) => {
    const nameA = a.displayName.toLowerCase();
    const nameB = b.displayName.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameB < nameA) {
      return 1;
    }
    return b.dateAdded - a.dateAdded;
  },
  nameDescending: (a, b) => {
    const nameA = a.displayName.toLowerCase();
    const nameB = b.displayName.toLowerCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameB < nameA) {
      return -1;
    }
    return b.dateAdded - a.dateAdded;
  },
  durationShortest: (a, b) => a.duration - b.duration,
  durationLongest: (a, b) => b.duration - a.duration
});
exports.sortFunctions = sortFunctions;
const acceptedImgKeys = (0, _utils.StrictDict)({
  mp4: '.mp4'
});
exports.acceptedImgKeys = acceptedImgKeys;
//# sourceMappingURL=utils.js.map