/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import createDataContext from './data-context';
import createSortContext from './sort-context';
import createSelectionContext from './selection-context';
import remoteResolver from '../props-resolver/remote-resolver';

const withContext = (Base) => {
  let DataContext;
  let SelectionContext;
  let SortContext;

  return class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props) {
      super(props);
      DataContext = createDataContext(this.props.data);
      SelectionContext = createSelectionContext();
      SortContext = createSortContext(this.isRemoteSort, this.handleSortChange);
    }

    render() {
      const { keyField, columns } = this.props;
      const baseProps = { keyField, columns };

      return (
        <DataContext.Provider
          { ...baseProps }
          data={ this.props.data }
        >
          <DataContext.Consumer>
            {
              rootProps => (
                <SelectionContext.Provider
                  { ...baseProps }
                  selectRow={ this.props.selectRow }
                  data={ rootProps.data }
                >
                  <SelectionContext.Consumer>
                    {
                      selectionProps => (
                        <SortContext.Provider
                          ref={ n => this.sortProvider = n }
                          { ...baseProps }
                          defaultSorted={ this.props.defaultSorted }
                          defaultSortDirection={ this.props.defaultSortDirection }
                          data={ rootProps.data }
                        >
                          <SortContext.Consumer>
                            {
                              sortProps => (
                                <Base
                                  { ...this.props }
                                  { ...selectionProps }
                                  { ...sortProps }
                                  data={ sortProps.data }
                                />
                              )
                            }
                          </SortContext.Consumer>
                        </SortContext.Provider>
                      )
                    }
                  </SelectionContext.Consumer>
                </SelectionContext.Provider>
              )
            }
          </DataContext.Consumer>
        </DataContext.Provider>
      );
    }
  };
};

export default withContext;
