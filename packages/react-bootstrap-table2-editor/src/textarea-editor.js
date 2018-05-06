/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class TextAreaEditor extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
  }

  getValue() {
    return this.text.value;
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) return;
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  render() {
    const { defaultValue, className, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-textarea', className);
    return (
      <textarea
        ref={ node => this.text = node }
        type="textarea"
        className={ editorClass }
        { ...rest }
        onKeyDown={ this.handleKeyDown }
      />
    );
  }
}

TextAreaEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onKeyDown: PropTypes.func
};
TextAreaEditor.defaultProps = {
  className: '',
  defaultValue: '',
  onKeyDown: undefined
};
export default TextAreaEditor;
