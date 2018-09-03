/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class DateEditor extends Component {
  componentDidMount() {
    const { defaultValue, didMount } = this.props;
    this.date.valueAsDate = new Date(defaultValue);
    this.date.focus();
    if (didMount) didMount();
  }

  getValue() {
    return this.date.value;
  }

  render() {
    const { defaultValue, didMount, className, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-date', className);
    return (
      <input
        ref={ node => this.date = node }
        type="date"
        className={ editorClass }
        { ...rest }
      />
    );
  }
}

DateEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.string,
  didMount: PropTypes.func
};
DateEditor.defaultProps = {
  className: '',
  defaultValue: '',
  didMount: undefined
};
export default DateEditor;
