/* eslint no-return-assign: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import _ from '../utils';
import createDataContext from './data-context';
import createSortContext from './sort-context';
import createSelectionContext from './selection-context';
import remoteResolver from '../props-resolver/remote-resolver';
import dataOperator from '../store/operators';

const withContext = Base =>
  class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      this.DataContext = createDataContext(props.data);

      if (props.columns.filter(col => col.sort).length > 0) {
        this.SortContext = createSortContext(
          dataOperator, this.isRemoteSort, this.handleSortChange);
      }

      if (props.selectRow) {
        this.SelectionContext = createSelectionContext(dataOperator);
      }

      if (props.cellEdit && props.cellEdit.createContext) {
        this.CellEditContext = props.cellEdit.createContext(
          _, dataOperator, this.isRemoteCellEdit, this.handleCellChange);
      }

      if (props.filter) {
        this.FilterContext = props.filter.createContext(
          _, this.isRemoteFiltering, this.handleRemoteFilterChange);
      }

      if (props.pagination) {
        this.PaginationContext = props.pagination.createContext(
          this.isRemotePagination, this.handleRemotePageChange);
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
        <this.SelectionContext.Provider
          { ...baseProps }
          selectRow={ this.props.selectRow }
          data={ rootProps.getData(filterProps, sortProps, paginationProps) }
        >
          <this.SelectionContext.Consumer>
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
          </this.SelectionContext.Consumer>
        </this.SelectionContext.Provider>
      );
    }

    renderWithPaginationCtx(base) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        sortProps
      ) => (
        <this.PaginationContext.Provider
          ref={ n => this.paginationContext = n }
          pagination={ this.props.pagination }
          data={ rootProps.getData(filterProps, sortProps) }
        >
          <this.PaginationContext.Consumer>
            {
              paginationProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                sortProps,
                paginationProps
              )
            }
          </this.PaginationContext.Consumer>
        </this.PaginationContext.Provider>
      );
    }

    renderWithSortCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps
      ) => (
        <this.SortContext.Provider
          { ...baseProps }
          ref={ n => this.sortContext = n }
          defaultSorted={ this.props.defaultSorted }
          defaultSortDirection={ this.props.defaultSortDirection }
          data={ rootProps.getData(filterProps) }
        >
          <this.SortContext.Consumer>
            {
              sortProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                sortProps
              )
            }
          </this.SortContext.Consumer>
        </this.SortContext.Provider>
      );
    }

    renderWithFilterCtx(base, baseProps) {
      return (
        rootProps,
        cellEditprops
      ) => (
        <this.FilterContext.Provider
          { ...baseProps }
          ref={ n => this.filterContext = n }
          data={ rootProps.getData() }
        >
          <this.FilterContext.Consumer>
            {
              filterProps => base(
                rootProps,
                cellEditprops,
                filterProps
              )
            }
          </this.FilterContext.Consumer>
        </this.FilterContext.Provider>
      );
    }

    renderWithCellEditCtx(base, baseProps) {
      return rootProps => (
        <this.CellEditContext.Provider
          { ...baseProps }
          cellEdit={ this.props.cellEdit }
          data={ rootProps.getData() }
        >
          <this.CellEditContext.Consumer>
            {
              cellEditprops => base(rootProps, cellEditprops)
            }
          </this.CellEditContext.Consumer>
        </this.CellEditContext.Provider>
      );
    }

    render() {
      const { keyField, columns } = this.props;
      const baseProps = { keyField, columns };

      let base = this.renderBase();

      if (this.SelectionContext) {
        base = this.renderWithSelectionCtx(base, baseProps);
      }

      if (this.PaginationContext) {
        base = this.renderWithPaginationCtx(base, baseProps);
      }

      if (this.SortContext) {
        base = this.renderWithSortCtx(base, baseProps);
      }

      if (this.FilterContext) {
        base = this.renderWithFilterCtx(base, baseProps);
      }

      if (this.CellEditContext) {
        base = this.renderWithCellEditCtx(base, baseProps);
      }

      return (
        <this.DataContext.Provider
          { ...baseProps }
          data={ this.props.data }
        >
          <this.DataContext.Consumer>
            {
              base
            }
          </this.DataContext.Consumer>
        </this.DataContext.Provider>
      );
    }
  };

export default withContext;
