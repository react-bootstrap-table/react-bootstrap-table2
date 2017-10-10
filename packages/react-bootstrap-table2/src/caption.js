/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const Caption = (props) => {
  if (!props.children) return null;
  return (
    <caption>{ props.children }</caption>
  );
};

Caption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])
};

export default Caption;
