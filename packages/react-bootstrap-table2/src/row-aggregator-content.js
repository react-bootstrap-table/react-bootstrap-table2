/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import eventDelegater from './row-event-delegater';
import RowContent from './row-pure-content';
// import shouldRowUpdater from './row-should-updater';

/* eslint react/prefer-stateless-function: 0 */
class RowAggregatorContent extends Component {
  render() {
    const {
      className,
      style,
      attrs,
      shouldUpdateRowContent,
      ...rest
    } = this.props;

    return (
      <tr style={ style } className={ className } { ...attrs }>
        { this.props.children }
        <RowContent shouldUpdate={ shouldUpdateRowContent } { ...rest } />
      </tr>
    );
  }
}

RowAggregatorContent.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  attrs: PropTypes.object,
  shouldUpdateRowContent: PropTypes.bool
};

RowAggregatorContent.defaultProps = {
  editable: true,
  style: {},
  className: null,
  attrs: {},
  shouldUpdateRowContent: true
};

export default RowAggregatorContent;
