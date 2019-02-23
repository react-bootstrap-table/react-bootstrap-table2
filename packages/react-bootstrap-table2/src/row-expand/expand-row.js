import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const ExpandRow = ({ children, expanded, onClosed, ...rest }) => (
  <tr>
    <td className="reset-expansion-style" { ...rest }>
      <CSSTransition
        appear
        in={ expanded }
        timeout={ 400 }
        classNames="row-expand-slide"
        onExited={ onClosed }
      >
        <div>
          { children }
        </div>
      </CSSTransition>
    </td>
  </tr>
);

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null
};

export default ExpandRow;
