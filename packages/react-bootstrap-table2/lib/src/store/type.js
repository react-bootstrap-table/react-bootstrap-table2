"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeConvert = void 0;
var _const = _interopRequireDefault(require("../const"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var typeConvert = function typeConvert(type, value) {
  if (type === _const["default"].TYPE_STRING) {
    return String(value);
  } else if (type === _const["default"].TYPE_NUMBER) {
    return Number(value);
  } else if (type === _const["default"].TYPE_BOOLEAN) {
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 'true';
  } else if (type === _const["default"].TYPE_DATE) {
    return new Date(value);
  }
  return value;
};
exports.typeConvert = typeConvert;