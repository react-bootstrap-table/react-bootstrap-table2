/* eslint no-return-assign: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import _ from '../utils';
import createDataContext from './data-context';
import createSortContext from './sort-context';
import createSelectionContext from './selection-context';
import createRowExpandContext from './row-expand-context';
import remoteResolver from '../props-resolver/remote-resolver';
import dataOperator from '../store/operators';

const withContext = Base =>
  class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      this.DataContext = createDataContext();

      if (props.columns.filter(col => col.sort).length > 0) {
        this.SortContext = createSortContext(
          dataOperator, this.isRemoteSort, this.handleRemoteSortChange);
      }

      if (props.selectRow) {
        this.SelectionContext = createSelectionContext(dataOperator);
      }

      if (props.expandRow) {
        this.RowExpandContext = createRowExpandContext(dataOperator);
      }

      if (props.cellEdit && props.cellEdit.createContext) {
        this.CellEditContext = props.cellEdit.createContext(
          _, dataOperator, this.isRemoteCellEdit, this.handleRemoteCellChange);
      }

      if (props.filter) {
        this.FilterContext = props.filter.createContext(
          _, this.isRemoteFiltering, this.handleRemoteFilterChange);
      }

      if (props.pagination) {
        this.PaginationContext = props.pagination.createContext(
          this.isRemotePagination, this.handleRemotePageChange);
      }

      if (props.search && props.search.searchContext) {
        this.SearchContext = props.search.searchContext(
          _, this.isRemoteSearch, this.handleRemoteSearchChange);
      }
    }

    renderBase() {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps,
        expandProps,
        selectionProps
      ) => (
        <Base
          { ...this.props }
          { ...selectionProps }
          { ...sortProps }
          { ...cellEditProps }
          { ...filterProps }
          { ...searchProps }
          { ...paginationProps }
          { ...expandProps }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        />
      );
    }

    renderWithSelectionCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps,
        expandProps
      ) => (
        <this.SelectionContext.Provider
          { ...baseProps }
          selectRow={ this.props.selectRow }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        >
          <this.SelectionContext.Consumer>
            {
              selectionProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps,
                expandProps,
                selectionProps
              )
            }
          </this.SelectionContext.Consumer>
        </this.SelectionContext.Provider>
      );
    }

    renderWithRowExpandCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps
      ) => (
        <this.RowExpandContext.Provider
          { ...baseProps }
          expandRow={ this.props.expandRow }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        >
          <this.RowExpandContext.Consumer>
            {
              expandProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps,
                expandProps
              )
            }
          </this.RowExpandContext.Consumer>
        </this.RowExpandContext.Provider>
      );
    }

    renderWithPaginationCtx(base) {
      return (
        rootProps,
        cellEditProps,
        filterProps,
        searchProps,
        sortProps
      ) => (
        <this.PaginationContext.Provider
          ref={ n => this.paginationContext = n }
          pagination={ this.props.pagination }
          data={ rootProps.getData(filterProps, searchProps, sortProps) }
        >
          <this.PaginationContext.Consumer>
            {
              paginationProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                searchProps,
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
        filterProps,
        searchProps
      ) => (
        <this.SortContext.Provider
          { ...baseProps }
          ref={ n => this.sortContext = n }
          defaultSorted={ this.props.defaultSorted }
          defaultSortDirection={ this.props.defaultSortDirection }
          data={ rootProps.getData(filterProps, searchProps) }
        >
          <this.SortContext.Consumer>
            {
              sortProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                searchProps,
                sortProps,
              )
            }
          </this.SortContext.Consumer>
        </this.SortContext.Provider>
      );
    }

    renderWithSearchCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps,
        filterProps
      ) => (
        <this.SearchContext.Provider
          { ...baseProps }
          ref={ n => this.searchContext = n }
          data={ rootProps.getData(filterProps) }
          searchText={ this.props.search.searchText }
        >
          <this.SearchContext.Consumer>
            {
              searchProps => base(
                rootProps,
                cellEditProps,
                filterProps,
                searchProps
              )
            }
          </this.SearchContext.Consumer>
        </this.SearchContext.Provider>
      );
    }

    renderWithFilterCtx(base, baseProps) {
      return (
        rootProps,
        cellEditProps
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
                cellEditProps,
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
          selectRow={ this.props.selectRow }
          cellEdit={ this.props.cellEdit }
          data={ rootProps.getData() }
        >
          <this.CellEditContext.Consumer>
            {
              cellEditProps => base(rootProps, cellEditProps)
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

      if (this.RowExpandContext) {
        base = this.renderWithRowExpandCtx(base, baseProps);
      }

      if (this.PaginationContext) {
        base = this.renderWithPaginationCtx(base, baseProps);
      }

      if (this.SortContext) {
        base = this.renderWithSortCtx(base, baseProps);
      }

      if (this.SearchContext) {
        base = this.renderWithSearchCtx(base, baseProps);
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
