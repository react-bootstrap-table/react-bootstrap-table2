"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bootstrapTable = _interopRequireDefault(require("./src/bootstrap-table"));
var _contexts = _interopRequireDefault(require("./src/contexts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = (0, _contexts["default"])(_bootstrapTable["default"]);
exports["default"] = _default;