/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import TextEditor from './text-editor';

class EditingCell extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleBlur() {
    const { onEscape, onComplete, blurToSave, row, column } = this.props;
    if (blurToSave) {
      const value = this.editor.text.value;
      if (!_.isDefined(value)) {
        // TODO: for other custom or embed editor
      }
      onComplete(row, column, value);
    } else {
      onEscape();
    }
  }

  handleKeyDown(e) {
    const { onEscape, onComplete, row, column } = this.props;
    if (e.keyCode === 27) { // ESC
      onEscape();
    } else if (e.keyCode === 13) { // ENTER
      const value = e.currentTarget.value;
      if (!_.isDefined(value)) {
        // TODO: for other custom or embed editor
      }
      onComplete(row, column, value);
    }
  }

  render() {
    const { row, column } = this.props;
    const { dataField } = column;

    const value = _.get(row, dataField);
    const editorAttrs = {
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleBlur
    };
    return (
      <td>
        <TextEditor ref={ node => this.editor = node } defaultValue={ value } { ...editorAttrs } />
      </td>
    );
  }
}

EditingCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired
};

export default EditingCell;
