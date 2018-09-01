/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class DropDownEditor extends Component {
  componentDidMount() {
    const { defaultValue, didMount } = this.props;
    this.select.value = defaultValue;
    this.select.focus();
    if (didMount) didMount();
  }

  getValue() {
    return this.select.value;
  }

  render() {
    const { defaultValue, didMount, className, options, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-select', className);

    const attr = {
      ...rest,
      className: editorClass
    };

    return (
      <select
        { ...attr }
        ref={ node => this.select = node }
        defaultValue={ defaultValue }
      >
        {
          options.map(({ label, value }) => (
            <option key={ value } value={ value }>{ label }</option>
          ))
        }
      </select>
    );
  }
}

DropDownEditor.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    }))
  ]).isRequired,
  didMount: PropTypes.func
};
DropDownEditor.defaultProps = {
  className: '',
  defaultValue: '',
  style: {},
  didMount: undefined
};
export default DropDownEditor;
