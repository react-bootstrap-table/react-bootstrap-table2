import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Store from '../../src/store';
import BootstrapTable from '../../src/bootstrap-table';
import RowSelectionWrapper from '../../src/row-selection/wrapper';

describe('RowSelectionWrapper', () => {
  let wrapper;

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

  const selectRow = {
    mode: 'radio'
  };

  const rowIndex = 1;

  const keyField = 'id';

  const store = new Store(keyField);
  store.data = data;

  beforeEach(() => {
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

  it('should have correct state', () => {
    expect(wrapper.state().selectedRowKeys).toBeDefined();
    expect(wrapper.state().selectedRowKeys.length).toEqual(0);
  });

  it('should inject correct props to base component', () => {
    expect(wrapper.props().onRowSelect).toBeDefined();
    expect(wrapper.props().onAllRowsSelect).toBeDefined();
  });

  describe('when selectRow.mode is \'radio\'', () => {
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    it('call handleRowSelect function should seting correct state.selectedRowKeys', () => {
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

    it('call handleRowSelect function should seting correct state.selectedRowKeys', () => {
      wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleRowSelect(firstSelectedRow, false, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([secondSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, false, rowIndex);
      expect(wrapper.state('selectedRowKeys')).toEqual([]);
    });

    it('call handleAllRowsSelect function should seting correct state.selectedRowKeys', () => {
      wrapper.instance().handleAllRowsSelect();
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleAllRowsSelect();
      expect(wrapper.state('selectedRowKeys')).toEqual([]);
    });

    it('call handleAllRowsSelect function with a bool args should seting correct state.selectedRowKeys', () => {
      wrapper.instance().handleAllRowsSelect(true);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleAllRowsSelect(false);
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
      wrapper.instance().handleAllRowsSelect();
      expect(onSelectAllCallBack.callCount).toEqual(1);
      expect(onSelectAllCallBack.calledWith(true, data)).toBeTruthy();

      wrapper.instance().handleAllRowsSelect();
      expect(onSelectAllCallBack.callCount).toEqual(2);
      expect(onSelectAllCallBack.calledWith(false, [])).toBeTruthy();
    });
  });
});
