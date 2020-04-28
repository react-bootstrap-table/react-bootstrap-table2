/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import Const from '../const';

const RowTemplate = (props) => {
  const {
    renderContent,
    selectRow,
    expandRow,
    cellEl,
    ...rest
  } = props;

  const isRenderFunctionColumnInLeft = (
    position = Const.INDICATOR_POSITION_LEFT
  ) => position === Const.INDICATOR_POSITION_LEFT;

  const childrens = renderContent() || [];

  if (selectRow && selectRow.hideSelectColumn !== true) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift(React.createElement(cellEl, { key: 'selection' }));
    } else {
      childrens.push(React.createElement(cellEl, { key: 'selection' }));
    }
  }

  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift(React.createElement(cellEl, { key: 'expansion' }));
    } else {
      childrens.push(React.createElement(cellEl, { key: 'expansion' }));
    }
  }

  return <tr { ...rest }>{ childrens }</tr>;
};

RowTemplate.propTypes = {
  renderContent: PropTypes.func.isRequired,
  cellEl: PropTypes.string.isRequired,
  selectRow: PropTypes.object,
  expandRow: PropTypes.object
};

export default RowTemplate;
