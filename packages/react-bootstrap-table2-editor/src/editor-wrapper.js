/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class EditorWrapper extends Component {
  constructor(props) {
    super(props);
    this.value = props.defaultValue;
  }  
  
  render() {
    const { defaultValue, className, editor, ...rest } = this.props;    
    const element = React.cloneElement(
      editor, 
      {
        className: this.props.className,
        defaultValue: this.props.defaultValue,
        updateValue: (value) => this.value = value,
        ...rest
      }
    );
    return (
      element
    );
  }
}

EditorWrapper.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  editor: PropTypes.object.isRequired,
};
EditorWrapper.defaultProps = {
  className: null
};
export default EditorWrapper;
