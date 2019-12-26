import React from 'react';
import PaginationList from './pagination-list';
import standaloneAdapter from './standalone-adapter';
import PaginationHandler from './pagination-handler';
import paginationListAdapter from './pagination-list-adapter';

const PaginationListStandalone = props => (
  <PaginationList { ...props } />
);

export default
standaloneAdapter(PaginationHandler(paginationListAdapter(PaginationListStandalone)));
