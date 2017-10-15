import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Const from './const';

const SortCaret = ({ order, sorting }) => {
  const orderClass = cs('react-bootstrap-table-sort-order', {
    dropup: order === Const.SORT_ASC
  });

  const iconClass = cs('caret', {
    sorting
  });

  return (
    <span className={ orderClass }>
      <span className={ iconClass } />
    </span>
  );
};

SortCaret.propTypes = {
  order: PropTypes.oneOf([Const.SORT_ASC, Const.SORT_DESC]).isRequired,
  sorting: PropTypes.bool.isRequired
};
export default SortCaret;
