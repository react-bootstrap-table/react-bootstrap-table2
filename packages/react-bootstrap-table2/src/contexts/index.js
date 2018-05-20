/* eslint no-return-assign: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import _ from '../utils';
import createDataContext from './data-context';
import createSortContext from './sort-context';
import createSelectionContext from './selection-context';
import remoteResolver from '../props-resolver/remote-resolver';
import dataOperator from '../store/operators';

const withContext = (Base) => {
  let DataContext;
  let SelectionContext;
  let CellEditContext;
  let SortContext;
  let FilterContext;
  let PaginationContext;

  return class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      DataContext = createDataContext(props.data);

      if (props.columns.filter(col => col.sort).length > 0) {
        SortContext = createSortContext(dataOperator, this.isRemoteSort, this.handleSortChange);
      }

      if (props.selectRow) {
        SelectionContext = createSelectionContext(dataOperator);
      }

      if (props.cellEdit && props.cellEdit.createContext) {
        CellEditContext = props.cellEdit.createContext(
          _, dataOperator, this.isRemoteCellEdit, this.handleCellChange);
      }

      if (props.filter) {
        FilterContext = props.filter.createContext(
          _, this.isRemoteFiltering, this.handleRemoteFilterChange);
      }

      if (props.pagination) {
        PaginationContext = props.pagination.createContext(
          this.isRemotePagination, this.handleRemotePageChange);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.cellEdit) {
        CellEditContext = null;
      }
    }

    renderBase() {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        sortProps,
        paginationProps,
        selectionProps
      ) => (
        <Base
          { ...this.props }
          { ...selectionProps }
          { ...sortProps }
          { ...cellEditProps }
          { ...filterProps }
          { ...paginationProps }
          data={ rootProps.getData(filterProps, sortProps, paginationProps) }
        />
      );
    }

    renderWithSelectionCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        sortProps,
        paginationProps
      ) => (
        <SelectionContext.Provider
          { ...baseProps }
          selectRow={ this.props.selectRow }
          data={ rootProps.getData(filterProps, sortProps, paginationProps) }
        >
          <SelectionContext.Consumer>
            {
              selectionProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                sortProps,
                paginationProps,
                selectionProps
              )
            }
          </SelectionContext.Consumer>
        </SelectionContext.Provider>
      );
    }

    renderWithPaginationCtx(base) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        sortProps
      ) => (
        <PaginationContext.Provider
          ref={ n => this.paginationContext = n }
          pagination={ this.props.pagination }
          data={ rootProps.getData(filterProps, sortProps) }
        >
          <PaginationContext.Consumer>
            {
              paginationProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                sortProps,
                paginationProps
              )
            }
          </PaginationContext.Consumer>
        </PaginationContext.Provider>
      );
    }

    renderWithSortCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps
      ) => (
        <SortContext.Provider
          { ...baseProps }
          ref={ n => this.sortContext = n }
          defaultSorted={ this.props.defaultSorted }
          defaultSortDirection={ this.props.defaultSortDirection }
          data={ rootProps.getData(filterProps) }
        >
          <SortContext.Consumer>
            {
              sortProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                sortProps
              )
            }
          </SortContext.Consumer>
        </SortContext.Provider>
      );
    }

    renderWithFilterCtx(base, baseProps) {
      return (
        rootProps,
        cellEditprops
      ) => (
        <FilterContext.Provider
          { ...baseProps }
          ref={ n => this.filterContext = n }
          data={ rootProps.getData() }
        >
          <FilterContext.Consumer>
            {
              filterProps => base(
                rootProps,
                cellEditprops,
                filterProps
              )
            }
          </FilterContext.Consumer>
        </FilterContext.Provider>
      );
    }

    renderWithCellEditCtx(base, baseProps) {
      return rootProps => (
        <CellEditContext.Provider
          { ...baseProps }
          cellEdit={ this.props.cellEdit }
          data={ rootProps.getData() }
        >
          <CellEditContext.Consumer>
            {
              cellEditprops => base(rootProps, cellEditprops)
            }
          </CellEditContext.Consumer>
        </CellEditContext.Provider>
      );
    }

    render() {
      const { keyField, columns } = this.props;
      const baseProps = { keyField, columns };

      let base = this.renderBase();

      if (SelectionContext) {
        base = this.renderWithSelectionCtx(base, baseProps);
      }

      if (PaginationContext) {
        base = this.renderWithPaginationCtx(base, baseProps);
      }

      if (SortContext) {
        base = this.renderWithSortCtx(base, baseProps);
      }

      if (FilterContext) {
        base = this.renderWithFilterCtx(base, baseProps);
      }

      if (CellEditContext) {
        base = this.renderWithCellEditCtx(base, baseProps);
      }

      return (
        <DataContext.Provider
          { ...baseProps }
          data={ this.props.data }
        >
          <DataContext.Consumer>
            {
              base
            }
          </DataContext.Consumer>
        </DataContext.Provider>
      );
    }
  };
};

export default withContext;
