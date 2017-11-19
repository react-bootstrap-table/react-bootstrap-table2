/* eslint react/prop-types: 0 */
import React from 'react';

import BootstrapTable from './bootstrap-table';
import SortWrapper from './sort/wrapper';
import RowSelectionWrapper from './row-selection/wrapper';
import CellEditWrapper from './cell-edit/wrapper';


export const wrapWithCellEdit = props =>
  React.createElement(CellEditWrapper, { ...props });

export const wrapWithSelection = props =>
  React.createElement(RowSelectionWrapper, { ...props });

export const wrapWithSort = props =>
  React.createElement(SortWrapper, { ...props });

export const pureTable = props =>
  React.createElement(BootstrapTable, { ...props });

export const wrapWithPagination = (props) => {
  if (props.pagination) {
    const { wrapper } = props.pagination;
    const PaginationBase = wrapper(pureTable);
    return React.createElement(PaginationBase, { ...props });
  }

  return pureTable(props);
};
export const paginationElement = props => pureTable(props);

export const sortableElement = props => wrapWithPagination(props);

export const selectionElement = props => wrapWithSort(props);

export const cellEditElement = props => wrapWithSelection(props);
