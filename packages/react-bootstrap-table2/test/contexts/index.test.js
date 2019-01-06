/* eslint no-param-reassign: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import Base from '../../src/bootstrap-table';
import withContext from '../../src/contexts';

describe('Context', () => {
  let wrapper;

  const keyField = 'id';

  let columns;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const BootstrapTable = withContext(Base);

  beforeEach(() => {
    columns = [{
      dataField: keyField,
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }];
  });

  describe('basic render', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField={ keyField } data={ data } columns={ columns } />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });

    it('should render correctly', () => {
      const dataProvider = wrapper.find(wrapper.instance().DataContext.Provider);
      expect(dataProvider).toHaveLength(1);
      expect(dataProvider.props().data).toEqual(data);
      expect(dataProvider.props().keyField).toEqual(keyField);
      expect(dataProvider.props().columns).toEqual(columns);
    });
  });

  describe('if there\'s sort is enable', () => {
    beforeEach(() => {
      const columnsWithSort = columns.map((c) => {
        c.sort = true;
        return c;
      });
      wrapper = shallow(
        <BootstrapTable keyField={ keyField } data={ data } columns={ columnsWithSort } />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  describe('if row selection is enable', () => {
    beforeEach(() => {
      const selectRow = { mode: 'radio' };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
        />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  describe('if cell editing is enable', () => {
    beforeEach(() => {
      const CellEditContext = React.createContext();
      const cellEdit = {
        createContext: jest.fn().mockReturnValue({
          Provider: CellEditContext.Provider,
          Consumer: CellEditContext.Consumer
        }),
        options: {},
        createEditingCell: jest.fn().mockReturnValue(() => null),
        withRowLevelCellEdit: jest.fn().mockReturnValue(() => null)
      };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  describe('if search is enable', () => {
    beforeEach(() => {
      const SearchContext = React.createContext();
      const search = {
        searchContext: jest.fn().mockReturnValue(SearchContext),
        searchText: ''
      };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          search={ search }
        />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SearchContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  describe('if column filter is enable', () => {
    beforeEach(() => {
      const FilterContext = React.createContext();
      const filter = {
        createContext: jest.fn().mockReturnValue({
          Provider: FilterContext.Provider,
          Consumer: FilterContext.Consumer
        })
      };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          filter={ filter }
        />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).toBeDefined();
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  describe('if pagination is enable', () => {
    beforeEach(() => {
      const PaginationContext = React.createContext();
      const paginator = {
        createContext: jest.fn().mockReturnValue({
          Provider: PaginationContext.Provider,
          Consumer: PaginationContext.Consumer
        })
      };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ paginator }
        />
      );
      wrapper.render();
    });

    it('should create contexts correctly', () => {
      expect(wrapper.instance().DataContext).toBeDefined();
      expect(wrapper.instance().SortContext).not.toBeDefined();
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      expect(wrapper.instance().PaginationContext).toBeDefined();
    });
  });

  describe('if registerExposedAPI props is defined', () => {
    const registerExposedAPI = jest.fn();
    beforeEach(() => {
      const PaginationContext = React.createContext();
      const paginator = {
        createContext: jest.fn().mockReturnValue({
          Provider: PaginationContext.Provider,
          Consumer: PaginationContext.Consumer
        })
      };
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ paginator }
          registerExposedAPI={ registerExposedAPI }
        />
      );
      wrapper.render();
    });

    it('should call props.registerExposedAPI correctly', () => {
      expect(registerExposedAPI).toHaveBeenCalledTimes(1);
    });
  });
});
