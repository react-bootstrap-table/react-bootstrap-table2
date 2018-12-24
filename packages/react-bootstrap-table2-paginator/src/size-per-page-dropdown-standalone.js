import React from 'react';
import SizePerPageDropdown from './size-per-page-dropdown';
import standaloneAdapter from './standalone-adapter';
import paginationHandler from './pagination-handler';
import sizePerPageDropdownAdapter from './size-per-page-dropdown-adapter';

const SizePerPageDropdownStandalone = props => (
  <SizePerPageDropdown { ...props } />
);

export default
standaloneAdapter(paginationHandler(sizePerPageDropdownAdapter(SizePerPageDropdownStandalone)));
