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
    const { defaultValue, didMount, className, bootstrap4, condensed, ...rest } = this.props;
    let condensedClass = '';
    if (condensed) {
      condensedClass = (bootstrap4 ? 'form-control-sm' : 'input-sm');
    }
    const editorClass = cs('form-control editor edit-date', condensedClass, className);
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
  condensed: PropTypes.bool,
  bootstrap4: PropTypes.bool,
  defaultValue: PropTypes.string,
  didMount: PropTypes.func
};
DateEditor.defaultProps = {
  className: '',
  defaultValue: '',
  condensed: false,
  bootstrap4: false,
  didMount: undefined
};
export default DateEditor;
