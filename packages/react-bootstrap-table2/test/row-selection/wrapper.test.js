import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Store from '../../src/store/base';
import BootstrapTable from '../../src/bootstrap-table';
import RowSelectionWrapper from '../../src/row-selection/wrapper';

describe('RowSelectionWrapper', () => {
  let wrapper;
  let elem;

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

  const keyField = 'id';

  const store = new Store({ data, keyField });

  beforeEach(() => {
    elem = React.createElement(BootstrapTable, { data, selectRow, columns, keyField, store });
    wrapper = shallow(
      <RowSelectionWrapper
        keyField={ keyField }
        selectRow={ selectRow }
        elem={ elem }
        store={ store }
        onUpdateCell={ sinon.stub() }
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

  it('should inject correct props to elem', () => {
    expect(wrapper.props().onRowSelect).toBeDefined();
    expect(wrapper.props().onAllRowsSelect).toBeDefined();
  });

  describe('when selectRow.mode is \'radio\'', () => {
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    it('call handleRowSelect function should seting correct state.selectedRowKeys', () => {
      wrapper.instance().handleRowSelect(firstSelectedRow);
      expect(wrapper.state('selectedRowKeys')).toEqual([firstSelectedRow]);

      wrapper.instance().handleRowSelect(secondSelectedRow);
      expect(wrapper.state('selectedRowKeys')).toEqual([secondSelectedRow]);
    });
  });

  describe('when selectRow.mode is \'checkbox\'', () => {
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    beforeEach(() => {
      selectRow.mode = 'checkbox';
      elem = React.createElement(BootstrapTable, { data, selectRow, columns, keyField, store });
      wrapper = shallow(
        <RowSelectionWrapper
          keyField={ keyField }
          selectRow={ selectRow }
          elem={ elem }
          store={ store }
          onUpdateCell={ sinon.stub() }
        />
      );
    });

    it('call handleRowSelect function should seting correct state.selectedRowKeys', () => {
      wrapper.instance().handleRowSelect(firstSelectedRow, true);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, true);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

      wrapper.instance().handleRowSelect(firstSelectedRow, false);
      expect(wrapper.state('selectedRowKeys')).toEqual(expect.arrayContaining([secondSelectedRow]));

      wrapper.instance().handleRowSelect(secondSelectedRow, false);
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
});
