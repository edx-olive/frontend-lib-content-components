"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LicenseTypes = exports.LicenseNames = exports.LicenseLevel = void 0;
var _utils = require("../../utils");
const LicenseNames = (0, _utils.StrictDict)({
  select: 'Select',
  allRightsReserved: 'All Rights Reserved',
  creativeCommons: 'Creative Commons'
});
exports.LicenseNames = LicenseNames;
const LicenseTypes = (0, _utils.StrictDict)({
  allRightsReserved: 'all-rights-reserved',
  creativeCommons: 'creative-commons',
  select: 'select'
  // publicDomainDedication: 'public-domain-dedication', // future?
});
exports.LicenseTypes = LicenseTypes;
const LicenseLevel = (0, _utils.StrictDict)({
  block: 'block',
  course: 'course',
  library: 'library'
});
exports.LicenseLevel = LicenseLevel;
var _default = {
  LicenseLevel,
  LicenseNames,
  LicenseTypes
};
exports.default = _default;
//# sourceMappingURL=licenses.js.map