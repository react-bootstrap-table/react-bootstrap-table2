/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RowPureContent from './row-pure-content';
import eventDelegater from './event-delegater';
import shouldUpdater from './should-updater';

class Row extends shouldUpdater(eventDelegater(Component)) {
  constructor(props) {
    super(props);
    this.shouldUpdateRowContent = false;
  }

  shouldComponentUpdate(nextProps) {
    this.shouldUpdateRowContent = false;
    this.shouldUpdateRowContent =
      this.shouldUpdateByWhenEditing(nextProps) || this.shouldUpdatedByNormalProps(nextProps);
    if (this.shouldUpdateRowContent) return true;

    return this.shouldUpdatedBySelfProps(nextProps);
  }

  render() {
    const {
      className,
      style,
      attrs,
      ...rest
    } = this.props;
    const trAttrs = this.delegate(attrs);

    return (
      <tr style={ style } className={ className } { ...trAttrs }>
        <RowPureContent shouldUpdate={ this.shouldUpdateRowContent } { ...rest } />
      </tr>
    );
  }
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  attrs: PropTypes.object
};

Row.defaultProps = {
  editable: true,
  style: {},
  className: null,
  attrs: {}
};

export default Row;
