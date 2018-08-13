import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Const from '../const';
import { BootstrapContext } from '../contexts/bootstrap';


const SortCaret = ({ order }) => {
  const orderClass = cs('react-bootstrap-table-sort-order', {
    dropup: order === Const.SORT_ASC
  });

  return (
    <BootstrapContext.Consumer>
      {
        ({ bootstrap4 }) => (bootstrap4 ? (
          <span className={ `caret-4-${order}` } />
        ) : (
          <span className={ orderClass }>
            <span className="caret" />
          </span>
        ))
      }
    </BootstrapContext.Consumer>
  );
};

SortCaret.propTypes = {
  order: PropTypes.oneOf([Const.SORT_ASC, Const.SORT_DESC]).isRequired
};

export default SortCaret;
