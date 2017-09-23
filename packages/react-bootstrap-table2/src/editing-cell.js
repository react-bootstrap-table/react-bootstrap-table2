/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import _ from './utils';
import Const from './const';
import TextEditor from './text-editor';
import EditorIndicator from './editor-indicator';

class EditingCell extends Component {
  constructor(props) {
    super(props);
    this.indicatorTimer = null;
    this.clearTimer = this.clearTimer.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.beforeComplete = this.beforeComplete.bind(this);
    this.state = {
      invalidMessage: null
    };
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.indicatorTimer) {
      clearTimeout(this.indicatorTimer);
    }
  }

  beforeComplete(row, column, newValue) {
    this.clearTimer();
    const { onComplete, timeToCloseMessage } = this.props;
    if (_.isFunction(column.validator)) {
      const validateForm = column.validator(newValue, row, column);
      if (_.isObject(validateForm) && !validateForm.valid) {
        this.setState(() => {
          return { invalidMessage: validateForm.message };
        });
        this.indicatorTimer = setTimeout(() => {
          this.setState(() => {
            return { invalidMessage: null };
          });
        }, timeToCloseMessage);
        return;
      }
    }
    onComplete(row, column, newValue);
  }

  handleBlur() {
    const { onEscape, blurToSave, row, column } = this.props;
    if (blurToSave) {
      const value = this.editor.text.value;
      if (!_.isDefined(value)) {
        // TODO: for other custom or embed editor
      }
      this.beforeComplete(row, column, value);
    } else {
      onEscape();
    }
  }

  handleKeyDown(e) {
    const { onEscape, row, column } = this.props;
    if (e.keyCode === 27) { // ESC
      onEscape();
    } else if (e.keyCode === 13) { // ENTER
      const value = e.currentTarget.value;
      if (!_.isDefined(value)) {
        // TODO: for other custom or embed editor
      }
      this.beforeComplete(row, column, value);
    }
  }

  render() {
    const { invalidMessage } = this.state;
    const { row, column } = this.props;
    const { dataField } = column;

    const value = _.get(row, dataField);
    const editorAttrs = {
      onKeyDown: this.handleKeyDown,
      onBlur: this.handleBlur
    };

    const editorClass = invalidMessage ? cs('animated', 'shake') : null;
    return (
      <td className="react-bootstrap-table-editing-cell">
        <TextEditor
          ref={ node => this.editor = node }
          defaultValue={ value }
          classNames={ editorClass }
          { ...editorAttrs }
        />
        { invalidMessage ? <EditorIndicator invalidMessage={ invalidMessage } /> : null }
      </td>
    );
  }
}

EditingCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired,
  timeToCloseMessage: PropTypes.number
};

EditingCell.defaultProps = {
  timeToCloseMessage: Const.TIME_TO_CLOSE_MESSAGE
};

export default EditingCell;
