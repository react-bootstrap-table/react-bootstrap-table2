/* eslint react/prop-types: 0 */
import React from 'react';

export default Component => ({
  page,
  sizePerPage,
  ...rest
}) => (
  <Component
    { ...rest }
    currPage={ page }
    currSizePerPage={ sizePerPage }
  />
);
