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
    const { defaultValue, didMount, className, options, bootstrap4, condensed, ...rest } =
      this.props;
    let condensedClass = '';
    if (condensed) {
      condensedClass = (bootstrap4 ? 'form-control-sm' : 'input-sm');
    }
    const editorClass = cs('form-control editor edit-select', condensedClass, className);
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
  condensed: PropTypes.bool,
  bootstrap4: PropTypes.bool,
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
  condensed: false,
  bootstrap4: false,
  style: {},
  didMount: undefined
};
export default DropDownEditor;
