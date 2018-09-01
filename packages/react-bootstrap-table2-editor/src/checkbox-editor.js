/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class CheckBoxEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultValue.toString() === props.value.split(':')[0]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { didMount } = this.props;
    this.checkbox.focus();
    if (didMount) didMount();
  }

  getValue() {
    const [positive, negative] = this.props.value.split(':');
    return this.checkbox.checked ? positive : negative;
  }

  handleChange(e) {
    if (this.props.onChange) this.props.onChange(e);
    const { target } = e;
    this.setState(() => ({ checked: target.checked }));
  }

  render() {
    const { defaultValue, didMount, className, ...rest } = this.props;
    const editorClass = cs('editor edit-chseckbox checkbox', className);
    return (
      <input
        ref={ node => this.checkbox = node }
        type="checkbox"
        className={ editorClass }
        { ...rest }
        checked={ this.state.checked }
        onChange={ this.handleChange }
      />
    );
  }
}

CheckBoxEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  value: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  didMount: PropTypes.func
};
CheckBoxEditor.defaultProps = {
  className: '',
  value: 'on:off',
  defaultValue: false,
  onChange: undefined,
  didMount: undefined
};
export default CheckBoxEditor;
