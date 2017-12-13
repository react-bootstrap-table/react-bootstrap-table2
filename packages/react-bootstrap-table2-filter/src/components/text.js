/* eslint react/require-default-props: 0 */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { LIKE, EQ } from '../comparison';
import { FILTER_TYPE, FILTER_DELAY } from '../const';

class TextFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
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
    clearTimeout(this.timeout);
  }

  filter(e) {
    e.stopPropagation();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const filterValue = e.target.value;
    this.setState(() => ({ value: filterValue }));
    this.timeout = setTimeout(() => {
      this.props.onFilter(this.props.column, filterValue, FILTER_TYPE.TEXT);
    }, this.props.delay);
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

  render() {
    const { placeholder, column: { text }, style } = this.props;
    // stopPropagation for onClick event is try to prevent sort was triggered.
    return (
      <input
        ref={ n => this.input = n }
        type="text"
        className="filter text-filter form-control"
        style={ style }
        onChange={ this.filter }
        onClick={ e => e.stopPropagation() }
        placeholder={ placeholder || `Enter ${text}...` }
        value={ this.state.value }
      />
    );
  }
}

TextFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  comparator: PropTypes.oneOf([LIKE, EQ]),
  defaultValue: PropTypes.string,
  delay: PropTypes.number,
  placeholder: PropTypes.string,
  column: PropTypes.object,
  style: PropTypes.object
};

TextFilter.defaultProps = {
  delay: FILTER_DELAY,
  defaultValue: ''
};


export default TextFilter;
