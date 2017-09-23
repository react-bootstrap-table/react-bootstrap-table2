/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextEditor extends Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
  }

  render() {
    const { defaultValue, ...rest } = this.props;
    return (
      <input
        ref={ node => this.text = node }
        type="text"
        className="form-control editor edit-text"
        { ...rest }
      />
    );
  }
}

TextEditor.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};
export default TextEditor;
