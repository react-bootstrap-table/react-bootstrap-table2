"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["onExport", "children", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ExportCSVButton = function ExportCSVButton(props) {
  var onExport = props.onExport,
      children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    type: "button",
    className: "react-bs-table-csv-btn btn btn-default ".concat(className),
    onClick: function onClick() {
      return onExport();
    }
  }, rest), children);
};

ExportCSVButton.propTypes = {
  children: _propTypes["default"].node.isRequired,
  onExport: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object
};
ExportCSVButton.defaultProps = {
  className: '',
  style: {}
};
var _default = ExportCSVButton;
exports["default"] = _default;