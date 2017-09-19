/* eslint no-return-assign: 0 */
import React, { Component } from 'react';

class TextEditor extends Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
  }

  render() {
    const {
      onKeyDown,
      onBlur
    } = this.props;
    return (
      <input
        ref={ node => this.text = node }
        type="text"
        className="form-control editor edit-text"
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    );
  }
}

export default TextEditor;
