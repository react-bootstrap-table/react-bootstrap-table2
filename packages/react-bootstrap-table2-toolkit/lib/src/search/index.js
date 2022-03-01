"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SearchBar = _interopRequireDefault(require("./SearchBar"));

var _clearButton = _interopRequireDefault(require("./clear-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  SearchBar: _SearchBar["default"],
  ClearSearchButton: _clearButton["default"]
};
exports["default"] = _default;