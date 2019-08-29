import cs from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import eventDelegater from '../row/event-delegater';

class ExpandRow extends eventDelegater(Component) {
  render() {
    const {
      children,
      expanded,
      onClosed,
      className,
      rowEvents,
      ...rest
    } = this.props;

    const trAttrs = this.delegate(rowEvents);

    return (
      <tr { ...trAttrs }>
        <td className={ cs('reset-expansion-style', className) } { ...rest }>
          <CSSTransition
            appear
            in={ expanded }
            timeout={ 400 }
            classNames="row-expand-slide"
            onExited={ onClosed }
          >
            <div>
              <div className="row-expansion-style">
                { children }
              </div>
            </div>
          </CSSTransition>
        </td>
      </tr>
    );
  }
}

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func,
  className: PropTypes.string,
  rowEvents: PropTypes.object
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: '',
  rowEvents: {}
};

export default ExpandRow;
