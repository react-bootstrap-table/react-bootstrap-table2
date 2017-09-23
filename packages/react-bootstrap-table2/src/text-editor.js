/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class TextEditor extends Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
  }

  render() {
    const { defaultValue, classNames, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-text', classNames);
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
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};
TextEditor.defaultProps = {
  classNames: null
};
export default TextEditor;
