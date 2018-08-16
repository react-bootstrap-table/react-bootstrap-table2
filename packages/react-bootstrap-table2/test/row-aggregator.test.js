import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import SelectionContext from '../src/contexts/selection-context';
import bindSelection from '../src/row-selection/row-binder';
import SelectionCell from '../src/row-selection/selection-cell';
import RowAggregator from '../src/row-aggregator';
import Row from '../src/row';

describe('Row Aggregator', () => {
  let wrapper;
  let rowAggregator;
  const RowAggregatorWithSelection = bindSelection(RowAggregator);

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'C'
  }];
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];
  const rowIndex = 1;
  const row = data[rowIndex];
  const keyField = 'id';

  const getBaseProps = () => ({
    row,
    columns,
    keyField,
    rowIndex
  });

  describe('when props.selectRow is defeind', () => {
    describe('if props.selectRow.hideSelectColumn is false', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } />
          </SelectionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should render selection column correctly', () => {
        const selectionCell = wrapper.find(SelectionCell);
        expect(selectionCell).toHaveLength(1);
        expect(selectionCell.props().selected).toEqual(rowAggregator.props().selected);
        expect(selectionCell.props().disabled).toEqual(!rowAggregator.props().selectable);
      });
    });

    describe('if props.selectRow.hideSelectColumn is true', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio', hideSelectColumn: true };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } />
          </SelectionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should not render selection column', () => {
        const selectionCell = wrapper.find(SelectionCell);
        expect(selectionCell).toHaveLength(0);
      });
    });

    describe('if props.selectRow.clickToSelect is defined', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio', clickToSelect: true };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } />
          </SelectionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should add onClick prop to Row Component', () => {
        const rowComp = wrapper.find(Row);
        expect(rowComp).toHaveLength(1);
        expect(rowComp.props().attrs.onClick).toBeDefined();
      });
    });
  });

  describe('createClickEventHandler', () => {
    describe('if props.attrs.onClick is defined', () => {
      const attrs = { onClick: jest.fn() };

      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        wrapper.find('tr').simulate('click');
      });

      it('should add onClick prop to Row Component', () => {
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.selectRow.clickToSelect is defined', () => {
      const selectRow = { mode: 'radio', clickToSelect: true };
      beforeEach(() => {
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } />
          </SelectionContext.Provider>
        );
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should add onClick prop to Row Component', () => {
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.attrs.onClick and props.selectRow.clickToSelect both are defined', () => {
      const attrs = { onClick: jest.fn() };
      const selectRow = { mode: 'radio', clickToSelect: true };

      beforeEach(() => {
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } cellEdit={ {} } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should add onClick prop to Row Component', () => {
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });
  });
});
