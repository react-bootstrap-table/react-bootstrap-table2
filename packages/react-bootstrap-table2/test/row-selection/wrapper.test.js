import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Store from '../../src/store';
import BootstrapTable from '../../src/bootstrap-table';
import wrapperFactory from '../../src/row-selection/wrapper';

describe('RowSelectionWrapper', () => {
  let wrapper;
  let selectRow;

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const rowIndex = 1;

  const keyField = 'id';

  const store = new Store(keyField);
  store.data = data;
  const RowSelectionWrapper = wrapperFactory(BootstrapTable);

  beforeEach(() => {
    selectRow = {
      mode: 'radio'
    };
    wrapper = shallow(
      <RowSelectionWrapper
        keyField={ keyField }
        data={ data }
        columns={ columns }
        selectRow={ selectRow }
        store={ store }
      />
    );
  });

  it('should render RowSelectionWrapper correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(BootstrapTable)).toBeDefined();
  });

  it('should have correct store.selected value', () => {
    expect(store.selected).toEqual([]);
  });

  it('should have correct state', () => {
    expect(wrapper.state().selectedRowKeys).toBeDefined();
    expect(wrapper.state().selectedRowKeys.length).toEqual(0);
  });

  it('should inject correct props to base component', () => {
    expect(wrapper.props().onRowSelect).toBeDefined();
    expect(wrapper.props().onAllRowsSelect).toBeDefined();
  });

  describe('componentWillReceiveProps', () => {
    const nextSelected = [0];
    const nextProps = {
      store: {
        selected: nextSelected
      },
      selectRow: {
        mode: 'checkbox',
        selected: nextSelected
      }
    };

    it('should update state.selectedRowKeys with next selected rows', () => {
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(nextProps.store.selected).toEqual(nextSelected);
      expect(wrapper.state('selectedRowKeys')).toEqual(nextSelected);
    });
  });

  describe('when selectRow.selected is defined', () => {
    beforeEach(() => {
      selectRow.mode = 'checkbox';
      selectRow.selected = [1, 3];
      wrapper = shallow(
        <RowSelectionWrapper
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          store={ store }
        />
      );
    });

    it('should have correct store.selected value', () => {
      expect(store.selected).toEqual(selectRow.selected);
    });

    it('should have correct state', () => {
      expect(wrapper.state().selectedRowKeys).toEqual(selectRow.selected);
    });
  });

  describe('when selectRow.mode is \'radio\'', () => {
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    it('call handleRowSelect function should setting correct state.selectedRowKeys', () => {
      wrapper.instance().handleRowSelect(firstSelectedRow, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual([firstSelectedRow]);

      wrapper.instance().handleRowSelect(secondSelectedRow, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual([secondSelectedRow]);
    });
  });

  describe('when selectRow.mode is \'checkbox\'', () => {
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    beforeEach(() => {
      selectRow.mode = 'checkbox';
      wrapper = shallow(
        <RowSelectionWrapper
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          store={ store }
        />
      );
    });

    it('call handleRowSelect function should setting correct state.selectedRowKeys', () => {
      wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleRowSelect(firstSelectedRow, false, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([secondSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, false, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual([]);
    });

    it('call handleAllRowsSelect function should setting correct state.selectedRowKeys', () => {
      wrapper.instance().handleAllRowsSelect();
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleAllRowsSelect();
      expect(wrapper.state('selectedRowKeys')).toEqual([]);
    });
  });

  describe('when selectRow.onSelect is defined', () => {
    const selectedRow = data[0][keyField];
    const onSelectCallBack = sinon.stub();

    beforeEach(() => {
      selectRow.mode = 'checkbox';
      selectRow.onSelect = onSelectCallBack;
      wrapper = shallow(
        <RowSelectionWrapper
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          store={ store }
        />
      );
    });

    it('selectRow.onSelect callback should be called correctly when calling handleRowSelect function', () => {
      wrapper.instance().handleRowSelect(selectedRow, true, rowIndex);
      expect(onSelectCallBack.callCount).toEqual(1);
      expect(onSelectCallBack.calledWith(data[0], true, rowIndex)).toBeTruthy();

      wrapper.instance().handleRowSelect(selectedRow, false, rowIndex);
      expect(onSelectCallBack.callCount).toEqual(2);
      expect(onSelectCallBack.calledWith(data[0], false, rowIndex)).toBeTruthy();
    });
  });

  describe('when selectRow.onSelectAll is defined', () => {
    const onSelectAllCallBack = sinon.stub();

    beforeEach(() => {
      selectRow.mode = 'checkbox';
      selectRow.onSelectAll = onSelectAllCallBack;
      wrapper = shallow(
        <RowSelectionWrapper
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          store={ store }
        />
      );
    });

    it('selectRow.onSelect callback should be called correctly when calling handleRowSelect function', () => {
      const e = {};
      wrapper.instance().handleAllRowsSelect(e);
      expect(onSelectAllCallBack.callCount).toEqual(1);
      expect(onSelectAllCallBack.calledWith(true, data, e)).toBeTruthy();

      wrapper.instance().handleAllRowsSelect(e);
      expect(onSelectAllCallBack.callCount).toEqual(2);
      expect(onSelectAllCallBack.calledWith(false, [], e)).toBeTruthy();
    });
  });
});
