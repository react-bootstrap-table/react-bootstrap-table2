/* eslint no-return-assign: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
// import Store from './store';
// import withSort from './sort/wrapper';
// import withSelection from './row-selection/wrapper';
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
      SortContext = createSortContext();
    }

    render() {
      const { keyField, columns, remote } = this.props;
      const baseProps = { keyField, columns, remote };

      return (
        <DataContext.Provider data={ this.props.data }>
          <DataContext.Consumer>
            {
              dataProps => (
                <SelectionContext.Provider
                  { ...baseProps }
                  selectRow={ this.props.selectRow }
                  data={ dataProps }
                >
                  <SelectionContext.Consumer>
                    {
                      selectionProps => (
                        <SortContext.Provider
                          { ...baseProps }
                          defaultSorted={ this.props.defaultSorted }
                          defaultSortDirection={ this.props.defaultSortDirection }
                          data={ dataProps }
                        >
                          <SortContext.Consumer>
                            {
                              sortProps => (
                                <Base
                                  { ...this.props }
                                  { ...dataProps }
                                  { ...selectionProps }
                                  { ...sortProps }
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
