import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import mockBodyResolvedProps from '../test-helpers/mock/body-resolved-props';
import SelectionContext from '../../src/contexts/selection-context';
import ExpansionContext from '../../src/contexts/row-expand-context';
import bindSelection from '../../src/row-selection/row-consumer';
import bindExpansion from '../../src/row-expand/row-consumer';
import ExpandCell from '../../src/row-expand/expand-cell';
import SelectionCell from '../../src/row-selection/selection-cell';
import RowAggregator from '../../src/row/aggregate-row';

describe('Row Aggregator', () => {
  let wrapper;
  let rowAggregator;
  const RowAggregatorWithSelection = bindSelection(RowAggregator);
  const RowAggregatorWithExpansion = bindExpansion(RowAggregator);

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
    value: row[keyField],
    columns,
    keyField,
    rowIndex,
    ...mockBodyResolvedProps
  });

  describe('when selectRow is enable', () => {
    describe('if props.selectRow.hideSelectColumn is false', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } />
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
            <RowAggregatorWithSelection { ...getBaseProps() } />
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
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should add onClick prop to Row Component', () => {
        const tr = wrapper.find('tr');
        expect(tr).toHaveLength(1);
        expect(tr.props().onClick).toBeDefined();
      });
    });
  });

  describe('when expandRow is enable', () => {
    describe('if props.expandRow.showExpandColumn is false', () => {
      beforeEach(() => {
        const expandRow = { renderer: jest.fn() };
        wrapper = mount(
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should not render expansion column', () => {
        const expandCell = wrapper.find(ExpandCell);
        expect(expandCell).toHaveLength(0);
      });
    });

    describe('if props.expandRow.showExpandColumn is true', () => {
      beforeEach(() => {
        const expandRow = { renderer: jest.fn(), showExpandColumn: true };
        wrapper = mount(
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
      });

      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        expect(rowAggregator).toHaveLength(1);
      });

      it('should render expansion column correctly', () => {
        const expandCell = wrapper.find(ExpandCell);
        expect(expandCell).toHaveLength(1);
        expect(expandCell.props().expanded).toEqual(rowAggregator.props().expanded);
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
            <RowAggregatorWithSelection { ...getBaseProps() } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        wrapper.find('tr').simulate('click');
      });

      it('should call attrs.onClick correctly', () => {
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.selectRow.clickToSelect is true', () => {
      const selectRow = { mode: 'radio', clickToSelect: true };
      beforeEach(() => {
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should call selectRow.onRowSelect correctly', () => {
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.selectRow.clickToSelect is true', () => {
      describe('but selectable props is false', () => {
        const selectRow = { mode: 'radio', clickToSelect: true, nonSelectable: [row[keyField]] };
        beforeEach(() => {
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <RowAggregatorWithSelection { ...getBaseProps() } />
            </SelectionContext.Provider>
          );
          wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
          wrapper.find('tr').simulate('click');
        });

        it('should call selectRow.onRowSelect correctly', () => {
          expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect)
            .toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('if props.expandRow is not defined', () => {
      describe('but expandable props is false', () => {
        const expandRow = { renderer: jest.fn(), nonExpandable: [row[keyField]] };
        beforeEach(() => {
          wrapper = mount(
            <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
              <RowAggregatorWithExpansion { ...getBaseProps() } />
            </ExpansionContext.Provider>
          );
          wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
          wrapper.find('tr').simulate('click');
        });

        it('should call expandRow.onRowExpand correctly', () => {
          expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand)
            .toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('if props.expandRow is defined', () => {
      const expandRow = { renderer: jest.fn() };
      beforeEach(() => {
        wrapper = mount(
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
        wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should call expandRow.onRowExpand correctly', () => {
        expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.attrs.onClick and props.expandRow both are defined', () => {
      const attrs = { onClick: jest.fn() };
      const expandRow = { renderer: jest.fn() };

      beforeEach(() => {
        wrapper = mount(
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            <RowAggregatorWithExpansion { ...getBaseProps() } attrs={ attrs } />
          </ExpansionContext.Provider>
        );
        wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should call attrs.onClick and expandRow.onRowExpand correctly', () => {
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
        expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand).toHaveBeenCalledTimes(1);
      });
    });

    describe('if props.attrs.onClick and props.selectRow.clickToSelect both are defined', () => {
      const attrs = { onClick: jest.fn() };
      const selectRow = { mode: 'radio', clickToSelect: true };

      beforeEach(() => {
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <RowAggregatorWithSelection { ...getBaseProps() } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      it('should call attrs.onClick and selectRow.onRowSelect correctly', () => {
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });
  });
});
