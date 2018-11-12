/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class TextEditor extends Component {
  componentDidMount() {
    const { defaultValue, didMount, autoSelectText } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
    if (autoSelectText) this.text.select();
    if (didMount) didMount();
  }
  getValue() {
    return this.text.value;
  }

  render() {
    const { defaultValue, didMount, className, autoSelectText, bootstrap4, condensed, ...rest } =
      this.props;
    let condensedClass = '';
    if (condensed) {
      condensedClass = (bootstrap4 ? 'form-control-sm' : 'input-sm');
    }
    const editorClass = cs('form-control editor edit-text', condensedClass, className);
    return (
      <input
        ref={ node => this.text = node }
        type="text"
        className={ editorClass }
        { ...rest }
      />
    );
  }
}

TextEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  condensed: PropTypes.bool,
  bootstrap4: PropTypes.bool,
  autoSelectText: PropTypes.bool,
  didMount: PropTypes.func
};
TextEditor.defaultProps = {
  className: null,
  defaultValue: '',
  condensed: false,
  bootstrap4: false,
  autoSelectText: false,
  didMount: undefined
};
export default TextEditor;
