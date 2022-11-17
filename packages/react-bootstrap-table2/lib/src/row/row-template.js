"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _const = _interopRequireDefault(require("../const"));
var _excluded = ["renderContent", "selectRow", "expandRow", "cellEl"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var RowTemplate = function RowTemplate(props) {
  var renderContent = props.renderContent,
    selectRow = props.selectRow,
    expandRow = props.expandRow,
    cellEl = props.cellEl,
    rest = _objectWithoutProperties(props, _excluded);
  var isRenderFunctionColumnInLeft = function isRenderFunctionColumnInLeft() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _const["default"].INDICATOR_POSITION_LEFT;
    return position === _const["default"].INDICATOR_POSITION_LEFT;
  };
  var childrens = renderContent() || [];
  if (selectRow && selectRow.hideSelectColumn !== true) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift( /*#__PURE__*/_react["default"].createElement(cellEl, {
        key: 'selection'
      }));
    } else {
      childrens.push( /*#__PURE__*/_react["default"].createElement(cellEl, {
        key: 'selection'
      }));
    }
  }
  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift( /*#__PURE__*/_react["default"].createElement(cellEl, {
        key: 'expansion'
      }));
    } else {
      childrens.push( /*#__PURE__*/_react["default"].createElement(cellEl, {
        key: 'expansion'
      }));
    }
  }
  return /*#__PURE__*/_react["default"].createElement("tr", rest, childrens);
};
RowTemplate.propTypes = {
  renderContent: _propTypes["default"].func.isRequired,
  cellEl: _propTypes["default"].string.isRequired,
  selectRow: _propTypes["default"].object,
  expandRow: _propTypes["default"].object
};
var _default = RowTemplate;
exports["default"] = _default;