import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Const from '../../src/const';
import dataOperator from '../../src/store/operators';
import BootstrapTable from '../../src/bootstrap-table';
import createSortContext from '../../src/contexts/sort-context';

describe('SortContext', () => {
  let wrapper;
  let columns;
  let SortContext;

  let data;

  const mockBase = jest.fn((props => (
    <BootstrapTable
      data={ data }
      columns={ columns }
      keyField="id"
      { ...props }
    />
  )));

  beforeEach(() => {
    data = [{
      id: 1,
      name: 'A'
    }, {
      id: 2,
      name: 'B'
    }];
    columns = [{
      dataField: 'id',
      text: 'ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Name',
      sort: true
    }];
  });

  const handleRemoteSortChange = jest.fn();

  function shallowContext(enableRemote = false, providerProps = {}) {
    handleRemoteSortChange.mockReset();
    mockBase.mockReset();
    SortContext = createSortContext(
      dataOperator,
      jest.fn().mockReturnValue(enableRemote),
      handleRemoteSortChange
    );
    return (
      <SortContext.Provider
        columns={ columns }
        data={ data }
        { ...providerProps }
      >
        <SortContext.Consumer>
          {
            sortProps => mockBase(sortProps)
          }
        </SortContext.Consumer>
      </SortContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createSortContext', () => {
      expect(SortContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createSortContext', () => {
      expect(SortContext.Consumer).toBeDefined();
    });

    it('should have correct state.sortOrder', () => {
      expect(wrapper.state().sortOrder).toBe(undefined);
    });

    it('should have correct state.sortColumn', () => {
      expect(wrapper.state().sortColumn).toBe(undefined);
    });

    it('should pass correct sort props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenCalledWith({
        data,
        sortOrder: undefined,
        onSort: wrapper.instance().handleSort,
        sortField: null
      });
    });
  });

  describe('handleSort function', () => {
    let sortColumn;
    let nextOrderSpy;

    beforeEach(() => {
      sortColumn = columns[0];
      nextOrderSpy = jest.spyOn(dataOperator, 'nextOrder');
    });

    afterEach(() => {
      nextOrderSpy.mockRestore();
    });

    describe('when remote.sort is false', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        wrapper.instance().handleSort(sortColumn);
        wrapper.update();
        wrapper.render();
      });

      it('should set state correctly', () => {
        expect(wrapper.state().sortColumn).toEqual(sortColumn);
        expect(wrapper.state().sortOrder).toEqual(Const.SORT_DESC);
      });

      it('should call dataOperator.nextOrder correctly', () => {
        expect(nextOrderSpy).toHaveBeenCalledTimes(1);
        expect(nextOrderSpy).toHaveBeenCalledWith(
          sortColumn,
          { sortColumn: undefined, sortOrder: undefined },
          wrapper.props().defaultSortDirection
        );
      });

      it('should pass correct sort props to children element', () => {
        expect(wrapper.length).toBe(1);
        expect(mockBase).toHaveBeenLastCalledWith({
          data: data.reverse(),
          sortOrder: wrapper.state().sortOrder,
          onSort: wrapper.instance().handleSort,
          sortField: wrapper.state().sortColumn.dataField
        });
      });
    });

    describe('when remote.sort is true', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.render();

        nextOrderSpy = jest.spyOn(dataOperator, 'nextOrder');
        wrapper.instance().handleSort(sortColumn);
      });

      it('should set state correctly', () => {
        expect(wrapper.state().sortColumn).toEqual(sortColumn);
        expect(wrapper.state().sortOrder).toEqual(Const.SORT_DESC);
      });

      it('should call dataOperator.nextOrder correctly', () => {
        expect(nextOrderSpy).toHaveBeenCalledTimes(1);
        expect(nextOrderSpy).toHaveBeenCalledWith(
          sortColumn,
          { sortColumn: undefined, sortOrder: undefined },
          wrapper.props().defaultSortDirection
        );
      });

      it('should calling handleRemoteSortChange correctly', () => {
        expect(handleRemoteSortChange).toHaveBeenCalledTimes(1);
        expect(handleRemoteSortChange).toHaveBeenCalledWith(sortColumn.dataField, Const.SORT_DESC);
      });
    });

    describe('when column.onSort prop is defined', () => {
      const onSortCB = jest.fn();

      beforeEach(() => {
        columns[0].onSort = onSortCB;
        wrapper = shallow(shallowContext());
        wrapper.instance().handleSort(sortColumn);
      });

      it('should calling column.onSort function correctly', () => {
        expect(onSortCB).toHaveBeenCalledTimes(1);
        expect(onSortCB).toHaveBeenCalledWith(columns[0].dataField, Const.SORT_DESC);

        wrapper.instance().handleSort(sortColumn);
        expect(onSortCB).toHaveBeenCalledTimes(2);
        expect(onSortCB).toHaveBeenCalledWith(columns[0].dataField, Const.SORT_ASC);
      });
    });
  });

  describe('when defaultSorted prop is defined', () => {
    const defaultSorted = [{
      dataField: 'name',
      order: Const.SORT_DESC
    }];

    beforeEach(() => {
      wrapper = shallow(shallowContext(false, { defaultSorted }));
      wrapper.render();
    });

    it('should pass correct sort props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenLastCalledWith({
        data: data.reverse(),
        sortOrder: wrapper.state().sortOrder,
        onSort: wrapper.instance().handleSort,
        sortField: wrapper.state().sortColumn.dataField
      });
    });

    it('should have correct state.sortOrder', () => {
      expect(wrapper.state().sortOrder).toBe(defaultSorted[0].order);
    });

    it('should have correct state.sortColumn', () => {
      expect(wrapper.state().sortColumn).toBe(columns[1]);
    });

    describe('when column.onSort prop is defined', () => {
      const onSortCB = jest.fn();

      beforeEach(() => {
        columns[1].onSort = onSortCB;
        wrapper = shallow(shallowContext(false, { defaultSorted }));
      });

      it('should calling column.onSort function correctly', () => {
        expect(onSortCB).toHaveBeenCalledTimes(1);
        expect(onSortCB).toHaveBeenCalledWith(defaultSorted[0].dataField, defaultSorted[0].order);
      });
    });

    describe('when remote.sort is true', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext(true, { defaultSorted }));
        wrapper.render();
      });

      it('should calling handleRemoteSortChange correctly', () => {
        expect(handleRemoteSortChange).toHaveBeenCalledTimes(1);
        expect(handleRemoteSortChange)
          .toHaveBeenCalledWith(defaultSorted[0].dataField, defaultSorted[0].order);
      });
    });
  });
});
