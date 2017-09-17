/* eslint no-return-assign: 0 */
import React, { Component } from 'react';

class TextEditor extends Component {
  componentDidMount() {
    this.text.focus();
  }

  render() {
    return (
      <input
        ref={ node => this.text = node }
        type="text"
        className="form-control editor edit-text"
        { ...this.props }
      />
    );
  }
}

export default TextEditor;
