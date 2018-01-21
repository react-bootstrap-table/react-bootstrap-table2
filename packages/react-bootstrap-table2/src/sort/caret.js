import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Const from '../const';

const SortCaret = ({ order }) => {
  const orderClass = cs('react-bootstrap-table-sort-order', {
    dropup: order === Const.SORT_ASC
  });
  return (
    <span className={ orderClass }>
      <span className="caret" />
    </span>
  );
};

SortCaret.propTypes = {
  order: PropTypes.oneOf([Const.SORT_ASC, Const.SORT_DESC]).isRequired
};
export default SortCaret;
