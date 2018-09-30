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
    const { defaultValue, didMount, className, autoSelectText, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-text', className);
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
  autoSelectText: PropTypes.bool,
  didMount: PropTypes.func
};
TextEditor.defaultProps = {
  className: null,
  defaultValue: '',
  autoSelectText: false,
  didMount: undefined
};
export default TextEditor;
