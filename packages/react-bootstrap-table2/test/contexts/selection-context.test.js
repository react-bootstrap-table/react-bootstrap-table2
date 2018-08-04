import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import dataOperator from '../../src/store/operators';
import BootstrapTable from '../../src/bootstrap-table';
import createSelectionContext from '../../src/contexts/selection-context';

describe('DataContext', () => {
  let wrapper;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'B'
  }];

  const keyField = 'id';

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const mockBase = jest.fn((props => (
    <BootstrapTable
      data={ data }
      columns={ columns }
      keyField={ keyField }
      { ...props }
    />
  )));

  const defaultSelectRow = {
    mode: 'checkbox'
  };
  const SelectionContext = createSelectionContext(dataOperator);

  function shallowContext(selectRow = defaultSelectRow) {
    return (
      <SelectionContext.Provider
        data={ data }
        keyField={ keyField }
        selectRow={ selectRow }
      >
        <SelectionContext.Consumer>
          {
            selectionProps => mockBase(selectionProps)
          }
        </SelectionContext.Consumer>
      </SelectionContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createSelectionContext', () => {
      expect(SelectionContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createSelectionContext', () => {
      expect(SelectionContext.Consumer).toBeDefined();
    });

    it('should have correct state.data', () => {
      expect(wrapper.state().selected).toEqual([]);
    });

    it('should pass correct sort props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenCalledWith({
        selected: wrapper.state().selected,
        onRowSelect: wrapper.instance().handleRowSelect,
        onAllRowsSelect: wrapper.instance().handleAllRowsSelect
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    const newSelectRow = {
      ...defaultSelectRow,
      selected: [1]
    };

    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.instance().componentWillReceiveProps({
        selectRow: newSelectRow
      });
    });

    it('should have correct state.selected', () => {
      expect(wrapper.state().selected).toEqual(newSelectRow.selected);
    });

    describe('if nextProps.selectRow is not existing', () => {
      const defaultSelected = [1];
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          selected: defaultSelected
        }));
        wrapper.instance().componentWillReceiveProps({
          selectRow: defaultSelectRow
        });
      });

      it('should keep origin state.selected', () => {
        expect(wrapper.state().selected).toEqual(defaultSelected);
      });
    });

    describe('if nextProps.selectRow is not existing', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.instance().componentWillReceiveProps({});
      });

      it('should not set state.selected', () => {
        expect(wrapper.state().selected).toEqual([]);
      });
    });
  });

  describe('when selectRow.selected prop is defined', () => {
    let selectRow;

    beforeEach(() => {
      selectRow = {
        ...defaultSelectRow,
        selected: [1]
      };
      wrapper = shallow(shallowContext(selectRow));
    });

    it('should have correct state.data', () => {
      expect(wrapper.state().selected).toEqual(selectRow.selected);
    });
  });

  describe('handleRowSelect', () => {
    const rowIndex = 1;
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    describe('when selectRow.mode is \'radio\'', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = shallow(shallowContext(selectRow));
      });

      it('should set state.selected correctly', () => {
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
        expect(wrapper.state('selected')).toEqual([firstSelectedRow]);

        wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
        expect(wrapper.state('selected')).toEqual([secondSelectedRow]);
      });
    });

    describe('when selectRow.mode is \'checkbox\'', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
      });

      it('should set state.selected correctly', () => {
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
        expect(wrapper.state('selected')).toEqual(expect.arrayContaining([firstSelectedRow]));

        wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
        expect(wrapper.state('selected')).toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

        wrapper.instance().handleRowSelect(firstSelectedRow, false, rowIndex);
        expect(wrapper.state('selected')).toEqual(expect.arrayContaining([secondSelectedRow]));

        wrapper.instance().handleRowSelect(secondSelectedRow, false, rowIndex);
        expect(wrapper.state('selected')).toEqual([]);
      });
    });

    describe('when selectRow.onSelect is defined', () => {
      const onSelect = jest.fn();
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          onSelect
        }));
      });

      it('call selectRow.onSelect correctly', () => {
        const e = { target: {} };
        const row = dataOperator.getRowByRowId(data, keyField, firstSelectedRow);
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex, e);
        expect(onSelect).toHaveBeenCalledWith(row, true, rowIndex, e);
      });
    });
  });

  describe('handleAllRowsSelect', () => {
    const e = { target: {} };

    describe('when isUnSelect argument is false', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.instance().handleAllRowsSelect(e, false);
      });

      it('should set state.selected correctly', () => {
        expect(wrapper.state('selected')).toEqual(data.map(d => d[keyField]));
      });
    });

    describe('when isUnSelect argument is true', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          selected: data.map(d => d[keyField])
        }));
        wrapper.instance().handleAllRowsSelect(e, true);
      });

      it('should set state.selected correctly', () => {
        expect(wrapper.state('selected')).toEqual([]);
      });
    });

    describe('when selectRow.onSelectAll is defined', () => {
      const onSelectAll = jest.fn();
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          onSelectAll
        }));
        wrapper.instance().handleAllRowsSelect(e, false);
      });

      it('should call selectRow.onSelectAll correctly', () => {
        expect(onSelectAll).toHaveBeenCalledWith(
          true,
          dataOperator.getSelectedRows(data, keyField, wrapper.state('selected')),
          e
        );
      });
    });
  });
});
