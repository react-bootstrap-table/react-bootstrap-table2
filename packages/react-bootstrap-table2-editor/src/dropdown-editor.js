/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class DropDownEditor extends Component {
  constructor(props) {
    super(props);
    let options = props.options;
    if (props.getOptions) {
      options = props.getOptions(
        this.setOptions.bind(this),
        {
          row: props.row,
          column: props.column
        }
      ) || [];
    }
    this.state = { options };
  }

  componentDidMount() {
    const { defaultValue, didMount } = this.props;
    this.select.value = defaultValue;
    this.select.focus();
    if (didMount) didMount();
  }

  setOptions(options) {
    this.setState({ options });
  }

  getValue() {
    return this.select.value;
  }

  render() {
    const { defaultValue, didMount, getOptions, className, ...rest } = this.props;
    const editorClass = cs('form-control editor edit-select', className);

    const attr = {
      ...rest,
      className: editorClass
    };

    return (
      <select
        { ...attr }
        ref={ node => this.select = node }
        defaultValue={ defaultValue }
      >
        {
          this.state.options.map(({ label, value }) => (
            <option key={ value } value={ value }>{ label }</option>
          ))
        }
      </select>
    );
  }
}

DropDownEditor.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    }))
  ]),
  didMount: PropTypes.func,
  getOptions: PropTypes.func
};
DropDownEditor.defaultProps = {
  className: '',
  defaultValue: '',
  style: {},
  options: [],
  didMount: undefined,
  getOptions: undefined
};
export default DropDownEditor;
