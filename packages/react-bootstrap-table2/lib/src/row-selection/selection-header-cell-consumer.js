"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _selectionContext = _interopRequireDefault(require("../contexts/selection-context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(Component) {
  return function () {
    return /*#__PURE__*/_react["default"].createElement(_selectionContext["default"].Consumer, null, function (selectRow) {
      return /*#__PURE__*/_react["default"].createElement(Component, selectRow);
    });
  };
};
exports["default"] = _default;