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

  return class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      DataContext = createDataContext(props.data);
      SelectionContext = createSelectionContext(dataOperator);
      SortContext = createSortContext(dataOperator, this.isRemoteSort, this.handleSortChange);
      if (props.cellEdit && props.cellEdit.createContext) {
        CellEditContext = props.cellEdit.createContext(
          _, dataOperator, this.isRemoteCellEdit, this.handleCellChange);
      }
      if (props.filter) {
        FilterContext = props.filter.createContext(
          _, this.isRemoteFiltering, this.handleRemoteFilterChange);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.cellEdit) {
        CellEditContext = null;
      }
    }

    renderBase(baseProps) {
      return (rootProps, cellEditProps, filterProps) => (
        <SortContext.Provider
          { ...baseProps }
          ref={ n => this.sortContext = n }
          defaultSorted={ this.props.defaultSorted }
          defaultSortDirection={ this.props.defaultSortDirection }
          data={ filterProps ? filterProps.data : rootProps.data }
        >
          <SortContext.Consumer>
            {
              sortProps => (
                <SelectionContext.Provider
                  { ...baseProps }
                  selectRow={ this.props.selectRow }
                  data={ sortProps.data }
                >
                  <SelectionContext.Consumer>
                    {
                      selectionProps => (
                        <Base
                          { ...this.props }
                          { ...selectionProps }
                          { ...sortProps }
                          { ...cellEditProps }
                          { ...filterProps }
                          data={ sortProps.data }
                        />
                      )
                    }
                  </SelectionContext.Consumer>
                </SelectionContext.Provider>
              )
            }
          </SortContext.Consumer>
        </SortContext.Provider>
      );
    }

    renderWithFilter(base, baseProps) {
      return (rootProps, cellEditprops) => (
        <FilterContext.Provider
          { ...baseProps }
          ref={ n => this.filterContext = n }
          data={ rootProps.data }
        >
          <FilterContext.Consumer>
            {
              filterProps => base(rootProps, cellEditprops, filterProps)
            }
          </FilterContext.Consumer>
        </FilterContext.Provider>
      );
    }

    renderWithCellEdit(base, baseProps) {
      return rootProps => (
        <CellEditContext.Provider
          { ...baseProps }
          cellEdit={ this.props.cellEdit }
          data={ rootProps.data }
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

      let base = this.renderBase(baseProps);

      if (FilterContext) {
        base = this.renderWithFilter(base, baseProps);
      }

      if (CellEditContext) {
        base = this.renderWithCellEdit(base, baseProps);
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
