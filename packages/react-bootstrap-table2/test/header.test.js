import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

import HeaderCell from '../src/header-cell';
import SelectionHeaderCell from '../src/row-selection/selection-header-cell';
import ExpandHeaderCell from '../src/row-expand/expand-header-cell';
import SelectionContext from '../src/contexts/selection-context';
import ExpansionContext from '../src/contexts/row-expand-context';
import Header from '../src/header';
import Const from '../src/const';
import mockHeaderResolvedProps from './test-helpers/mock/header-resolved-props';

describe('Header', () => {
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

  const keyField = 'id';

  describe('simplest header', () => {
    beforeEach(() => {
      wrapper = shallow(<Header { ...mockHeaderResolvedProps } columns={ columns } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(HeaderCell).length).toBe(columns.length);
    });
  });

  describe('className prop is exists', () => {
    const className = 'test-class';

    beforeEach(() => {
      wrapper = shallow(
        <Header
          { ...mockHeaderResolvedProps }
          columns={ columns }
          className={ className }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });

  describe('header with columns enable sort', () => {
    const sortField = columns[1].dataField;

    beforeEach(() => {
      wrapper = shallow(
        <Header
          { ...mockHeaderResolvedProps }
          columns={ columns }
          sortField={ sortField }
          sortOrder={ Const.SORT_ASC }
        />);
    });

    it('The HeaderCell should receive correct sorting props', () => {
      const headerCells = wrapper.find(HeaderCell);
      expect(headerCells.length).toBe(columns.length);
      expect(headerCells.at(0).prop('sorting')).toBe(false);
      expect(headerCells.at(1).prop('sorting')).toBe(true);
      expect(headerCells.at(1).prop('sortOrder')).toBe(Const.SORT_ASC);
    });
  });

  describe('selectRow', () => {
    describe('when selectRow.mode is ROW_SELECT_DISABLED (row is not able to select)', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
          />
        );
      });

      it('should not render <SelectionHeaderCell />', () => {
        expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
      });
    });

    describe('when selectRow.mode is radio (single selection)', () => {
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          <SelectionContext.Provider
            data={ data }
            keyField={ keyField }
            selectRow={ selectRow }
          >
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
          </SelectionContext.Provider>
        );
      });

      it('should render <SelectionHeaderCell />', () => {
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      describe('when selectRow.hideSelectColumn is true', () => {
        beforeEach(() => {
          const selectRow = { mode: 'radio', hideSelectColumn: true };
          wrapper = mount(
            <SelectionContext.Provider
              data={ data }
              keyField={ keyField }
              selectRow={ selectRow }
            >
              <Header
                { ...mockHeaderResolvedProps }
                columns={ columns }
                selectRow={ selectRow }
              />
            </SelectionContext.Provider>
          );
        });

        it('should not render <SelectionHeaderCell />', () => {
          expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
        });
      });
    });

    describe('when column.hidden is true', () => {
      beforeEach(() => {
        const newColumns = [{
          dataField: 'id',
          text: 'ID',
          hidden: true
        }, {
          dataField: 'name',
          text: 'Name'
        }];
        wrapper = shallow(
          <Header
            { ...mockHeaderResolvedProps }
            columns={ newColumns }
          />
        );
      });

      it('should not render column with hidden value true', () => {
        expect(wrapper.find(HeaderCell).length).toBe(1);
      });
    });

    describe('when selectRow.mode is checkbox (multiple selection)', () => {
      beforeEach(() => {
        const selectRow = { mode: 'checkbox' };
        wrapper = mount(
          <SelectionContext.Provider
            data={ data }
            keyField={ keyField }
            selectRow={ selectRow }
          >
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
          </SelectionContext.Provider>
        );
      });

      it('should render <SelectionHeaderCell />', () => {
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      describe('when selectRow.hideSelectColumn is true', () => {
        beforeEach(() => {
          const selectRow = { mode: 'checkbox', hideSelectColumn: true };
          wrapper = mount(
            <SelectionContext.Provider
              data={ data }
              keyField={ keyField }
              selectRow={ selectRow }
            >
              <Header
                { ...mockHeaderResolvedProps }
                columns={ columns }
                selectRow={ selectRow }
              />
            </SelectionContext.Provider>
          );
        });

        it('should not render <SelectionHeaderCell />', () => {
          expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
        });
      });
    });
  });

  describe('expandRow', () => {
    describe('when expandRow.showExpandColumn is false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
          />
        );
      });

      it('should not render <ExpandHeaderCell />', () => {
        expect(wrapper.find(ExpandHeaderCell).length).toBe(0);
      });
    });

    describe('when expandRow.showExpandColumn is true', () => {
      beforeEach(() => {
        const expandRow = { renderer: jest.fn(), expanded: [], showExpandColumn: true };
        wrapper = mount(
          <ExpansionContext.Provider
            data={ data }
            keyField={ keyField }
            expandRow={ expandRow }
          >
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              expandRow={ expandRow }
            />
          </ExpansionContext.Provider>
        );
      });

      it('should render <ExpandHeaderCell /> correctly', () => {
        expect(wrapper.find(ExpandHeaderCell).length).toBe(1);
      });
    });
  });
});
