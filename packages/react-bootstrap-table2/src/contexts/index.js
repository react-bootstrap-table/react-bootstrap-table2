/* eslint no-return-assign: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import _ from '../utils';
import createDataContext from './data-context';
import createSortContext from './sort-context';
import SelectionContext from './selection-context';
import RowExpandContext from './row-expand-context';
import remoteResolver from '../props-resolver/remote-resolver';
import { BootstrapContext } from './bootstrap';
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
        this.SelectionContext = SelectionContext;
      }

      if (props.expandRow) {
        this.RowExpandContext = RowExpandContext;
      }

      if (props.cellEdit && props.cellEdit.createContext) {
        this.CellEditContext = props.cellEdit.createContext(
          _, dataOperator, this.isRemoteCellEdit, this.handleRemoteCellChange);
      }

      if (props.filter) {
        this.FilterContext = props.filter.createContext(
          _, this.isRemoteFiltering, this.handleRemoteFilterChange);
      }

      if (props.drag) {
        this.DragContext = props.drag.createContext(
          _);
      }

      if (props.pagination) {
        this.PaginationContext = props.pagination.createContext(
          this.isRemotePagination, this.handleRemotePageChange);
      }

      if (props.search && props.search.searchContext) {
        this.SearchContext = props.search.searchContext(
          _, this.isRemoteSearch, this.handleRemoteSearchChange);
      }

      if (props.setDependencyModules) {
        props.setDependencyModules(_);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.pagination && this.props.pagination) {
        this.PaginationContext = null;
      }
      if (nextProps.pagination && !this.props.pagination) {
        this.PaginationContext = nextProps.pagination.createContext(
          this.isRemotePagination, this.handleRemotePageChange);
      }
    }

    renderBase() {
      return (
        rootProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps,
      ) => (
        <Base
          ref={ n => this.table = n }
          { ...this.props }
          { ...sortProps }
          { ...filterProps }
          { ...searchProps }
          { ...paginationProps }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        />
      );
    }

    renderWithSelectionCtx(base, baseProps) {
      return (
        rootProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps
      ) => (
        <this.SelectionContext.Provider
          { ...baseProps }
          ref={ n => this.selectionContext = n }
          selectRow={ this.props.selectRow }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        >
          {
            base(
              rootProps,
              filterProps,
              searchProps,
              sortProps,
              paginationProps
            )
          }
        </this.SelectionContext.Provider>
      );
    }

    renderWithRowExpandCtx(base, baseProps) {
      return (
        rootProps,
        filterProps,
        searchProps,
        sortProps,
        paginationProps
      ) => (
        <this.RowExpandContext.Provider
          { ...baseProps }
          ref={ n => this.rowExpandContext = n }
          expandRow={ this.props.expandRow }
          data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
        >
          {
            base(
              rootProps,
              filterProps,
              searchProps,
              sortProps,
              paginationProps
            )
          }
        </this.RowExpandContext.Provider>
      );
    }

    renderWithPaginationCtx(base) {
      return (
        rootProps,
        filterProps,
        searchProps,
        sortProps
      ) => (
        <this.PaginationContext.Provider
          ref={ n => this.paginationContext = n }
          pagination={ this.props.pagination }
          data={ rootProps.getData(filterProps, searchProps, sortProps) }
          bootstrap4={ this.props.bootstrap4 }
        >
          <this.PaginationContext.Consumer>
            {
              paginationProps => base(
                rootProps,
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
                filterProps,
                searchProps
              )
            }
          </this.SearchContext.Consumer>
        </this.SearchContext.Provider>
      );
    }

    renderWithFilterCtx(base, baseProps) {
      return rootProps => (
        <this.FilterContext.Provider
          { ...baseProps }
          ref={ n => this.filterContext = n }
          data={ rootProps.getData() }
        >
          <this.FilterContext.Consumer>
            {
              filterProps => base(
                rootProps,
                filterProps
              )
            }
          </this.FilterContext.Consumer>
        </this.FilterContext.Provider>
      );
    }

    renderWithDragCtx(base, baseProps) {
      return rootProps => (
        <this.DragContext.Provider
          { ...baseProps }
          drag={ this.props.drag }
        >
          { base(rootProps) }
        </this.DragContext.Provider>
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
          { base(rootProps) }
        </this.CellEditContext.Provider>
      );
    }

    render() {
      const { keyField, columns, bootstrap4, registerExposedAPI } = this.props;
      const baseProps = { keyField, columns };
      if (registerExposedAPI) baseProps.registerExposedAPI = registerExposedAPI;

      let base = this.renderBase();

      if (this.DragContext) {
        base = this.renderWithDragCtx(base, baseProps);
      }

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
        <BootstrapContext.Provider value={ { bootstrap4 } }>
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
        </BootstrapContext.Provider>
      );
    }
  };

export default withContext;
