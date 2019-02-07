import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import _ from 'react-bootstrap-table-next/src/utils';
import BootstrapTable from 'react-bootstrap-table-next/src/bootstrap-table';

import {
  FILTER_TYPE
} from '../src/const';
import createFilterContext from '../src/context';
import { textFilter } from '../index';

describe('FilterContext', () => {
  let wrapper;
  let FilterContext;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const columns = [{
    dataField: 'id',
    text: 'ID',
    filter: textFilter()
  }, {
    dataField: 'name',
    text: 'Name',
    filter: textFilter()
  }];

  const mockBase = jest.fn((props => (
    <BootstrapTable
      keyField="id"
      data={ data }
      columns={ columns }
      { ...props }
    />
  )));

  const handleFilterChange = jest.fn();

  function shallowContext(
    enableRemote = false,
    tableColumns = columns,
    dataChangeListener,
  ) {
    mockBase.mockReset();
    handleFilterChange.mockReset();
    FilterContext = createFilterContext(
      _,
      jest.fn().mockReturnValue(enableRemote),
      handleFilterChange
    );

    return (
      <FilterContext.Provider
        columns={ tableColumns }
        data={ data }
        dataChangeListener={ dataChangeListener }
      >
        <FilterContext.Consumer>
          {
            filterProps => mockBase(filterProps)
          }
        </FilterContext.Consumer>
      </FilterContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createFilterContext', () => {
      expect(FilterContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createFilterContext', () => {
      expect(FilterContext.Consumer).toBeDefined();
    });

    it('should have correct currFilters', () => {
      expect(wrapper.instance().currFilters).toEqual({});
    });

    it('should pass correct cell editing props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenCalledWith({
        data,
        onFilter: wrapper.instance().onFilter,
        onExternalFilter: wrapper.instance().onExternalFilter
      });
    });
  });

  describe('when remote filter is enable', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext(true));
      wrapper.render();
      wrapper.instance().currFilters = { price: { filterVal: 20, filterType: FILTER_TYPE.TEXT } };
    });

    it('should pass original data without internal filtering', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenCalledWith({
        data,
        onFilter: wrapper.instance().onFilter,
        onExternalFilter: wrapper.instance().onExternalFilter
      });
    });
  });

  describe('componentDidMount', () => {
    describe('when remote filter is disabled', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        wrapper.instance().componentDidMount();
      });

      it('should not call handleFilterChange', () => {
        expect(handleFilterChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('when remote filter is enable but currFilters is empty', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.render();
        wrapper.instance().componentDidMount();
      });

      it('should not call handleFilterChange', () => {
        expect(handleFilterChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('when remote filter is enable and currFilters is not empty', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.instance().currFilters.price = { filterVal: 40, filterType: FILTER_TYPE.TEXT };
      });

      it('should not call handleFilterChange', () => {
        wrapper.instance().componentDidMount();
        expect(handleFilterChange).toHaveBeenCalledTimes(1);
        expect(handleFilterChange).toHaveBeenCalledWith(wrapper.instance().currFilters);
      });
    });
  });

  describe('onFilter', () => {
    let instance;
    describe('when filterVal is empty or undefined', () => {
      const filterVals = ['', undefined, []];

      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should correct currFilters', () => {
        filterVals.forEach((filterVal) => {
          instance.onFilter(columns[1], FILTER_TYPE.TEXT)(filterVal);
          expect(Object.keys(instance.currFilters)).toHaveLength(0);
        });
      });
    });

    describe('when filterVal is existing', () => {
      const filterVal = '3';

      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should correct currFilters', () => {
        instance.onFilter(columns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(Object.keys(instance.currFilters)).toHaveLength(1);
      });
    });

    describe('when remote filter is enabled', () => {
      const filterVal = '3';

      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.render();
        instance = wrapper.instance();
        instance.onFilter(columns[1], FILTER_TYPE.TEXT)(filterVal);
      });

      it('should correct currFilters', () => {
        expect(Object.keys(instance.currFilters)).toHaveLength(1);
      });

      it('should calling handleFilterChange correctly', () => {
        expect(handleFilterChange).toHaveBeenCalledTimes(1);
        expect(handleFilterChange).toHaveBeenCalledWith(instance.currFilters);
      });
    });

    describe('when remote filter is enabled but initialize argument is true', () => {
      const filterVal = '3';

      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.render();
        instance = wrapper.instance();
        instance.onFilter(columns[1], FILTER_TYPE.TEXT, true)(filterVal);
      });

      it('should correct currFilters', () => {
        expect(Object.keys(instance.currFilters)).toHaveLength(1);
      });

      it('should not call handleFilterChange correctly', () => {
        expect(handleFilterChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('if filter.props.onFilter is defined', () => {
      const filterVal = '3';
      const onFilter = jest.fn();
      const customColumns = columns.map((column, i) => {
        if (i === 1) {
          return {
            ...column,
            filter: textFilter({ onFilter })
          };
        }
        return column;
      });

      beforeEach(() => {
        wrapper = shallow(shallowContext(false, customColumns));
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should call filter.props.onFilter correctly', () => {
        instance.onFilter(customColumns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(onFilter).toHaveBeenCalledTimes(1);
        expect(onFilter).toHaveBeenCalledWith(filterVal);
      });
    });

    describe('if filter.props.onFilter is defined and return an undefined data', () => {
      const mockReturn = [{
        id: 1,
        name: 'A'
      }];
      const filterVal = 'A';
      const onFilter = jest.fn().mockReturnValue(mockReturn);
      const customColumns = columns.map((column, i) => {
        if (i === 1) {
          return {
            ...column,
            filter: textFilter({ onFilter })
          };
        }
        return column;
      });

      beforeEach(() => {
        wrapper = shallow(shallowContext(false, customColumns));
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should call filter.props.onFilter correctly', () => {
        instance.onFilter(customColumns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(onFilter).toHaveBeenCalledTimes(1);
        expect(onFilter).toHaveBeenCalledWith(filterVal);
      });

      it('should set state.data correctly', () => {
        instance.onFilter(customColumns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(instance.state.data).toEqual(mockReturn);
      });
    });

    describe('when props.dataChangeListener is defined', () => {
      const filterVal = '3';
      const newDataLength = 0;
      const dataChangeListener = { emit: jest.fn() };

      beforeEach(() => {
        wrapper = shallow(shallowContext(false, columns, dataChangeListener));
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should call dataChangeListener.emit correctly', () => {
        instance.onFilter(columns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(dataChangeListener.emit).toHaveBeenCalledWith('filterChanged', newDataLength);
      });
    });

    describe('combination', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should set correct currFilters', () => {
        instance.onFilter(columns[0], FILTER_TYPE.TEXT)('3');
        expect(Object.keys(instance.currFilters)).toHaveLength(1);

        instance.onFilter(columns[0], FILTER_TYPE.TEXT)('2');
        expect(Object.keys(instance.currFilters)).toHaveLength(1);

        instance.onFilter(columns[1], FILTER_TYPE.TEXT)('2');
        expect(Object.keys(instance.currFilters)).toHaveLength(2);

        instance.onFilter(columns[1], FILTER_TYPE.TEXT)('');
        expect(Object.keys(instance.currFilters)).toHaveLength(1);

        instance.onFilter(columns[0], FILTER_TYPE.TEXT)('');
        expect(Object.keys(instance.currFilters)).toHaveLength(0);
      });
    });
  });
});
