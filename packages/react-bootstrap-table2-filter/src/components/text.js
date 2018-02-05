/* eslint react/require-default-props: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { LIKE, EQ } from '../comparison';
import { FILTER_TYPE, FILTER_DELAY } from '../const';

class TextFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timeout = null;
    this.state = {
      value: props.defaultValue
    };
  }
  componentDidMount() {
    const defaultValue = this.input.value;
    if (defaultValue) {
      this.props.onFilter(this.props.column, defaultValue, FILTER_TYPE.TEXT);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.applyFilter(nextProps.defaultValue);
    }
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  filter(e) {
    e.stopPropagation();
    this.cleanTimer();
    const filterValue = e.target.value;
    this.setState(() => ({ value: filterValue }));
    this.timeout = setTimeout(() => {
      this.props.onFilter(this.props.column, filterValue, FILTER_TYPE.TEXT);
    }, this.props.delay);
  }

  cleanTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  cleanFiltered() {
    const value = this.props.defaultValue;
    this.setState(() => ({ value }));
    this.props.onFilter(this.props.column, value, FILTER_TYPE.TEXT);
  }

  applyFilter(filterText) {
    this.setState(() => ({ value: filterText }));
    this.props.onFilter(this.props.column, filterText, FILTER_TYPE.TEXT);
  }

  handleClick(e) {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      placeholder,
      column: { text },
      style,
      className,
      onFilter,
      caseSensitive,
      ...rest
    } = this.props;
    // stopPropagation for onClick event is try to prevent sort was triggered.
    return (
      <input
        { ...rest }
        ref={ n => this.input = n }
        type="text"
        className={ `filter text-filter form-control ${className}` }
        style={ style }
        onChange={ this.filter }
        onClick={ this.handleClick }
        placeholder={ placeholder || `Enter ${text}...` }
        value={ this.state.value }
      />
    );
  }
}

TextFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  comparator: PropTypes.oneOf([LIKE, EQ]),
  defaultValue: PropTypes.string,
  delay: PropTypes.number,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  caseSensitive: PropTypes.bool
};

TextFilter.defaultProps = {
  delay: FILTER_DELAY,
  defaultValue: '',
  caseSensitive: false
};


export default TextFilter;
