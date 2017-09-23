/* eslint no-return-assign: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const EditorIndicator = ({ invalidMessage }) =>
  (
    <div className="alert alert-danger fade in">
      <strong>{ invalidMessage }</strong>
    </div>
  );

EditorIndicator.propTypes = {
  invalidMessage: PropTypes.string
};

EditorIndicator.defaultProps = {
  invalidMessage: null
};
export default EditorIndicator;
