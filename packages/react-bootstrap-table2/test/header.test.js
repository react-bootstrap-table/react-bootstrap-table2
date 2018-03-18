import React from 'react';
import { shallow } from 'enzyme';

import HeaderCell from '../src/header-cell';
import SelectionHeaderCell from '../src//row-selection/selection-header-cell';
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
        wrapper = shallow(
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
            selectRow={ selectRow }
          />
        );
      });

      it('should render <SelectionHeaderCell />', () => {
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      describe('when selectRow.hideSelectColumn is true', () => {
        beforeEach(() => {
          const selectRow = { mode: 'radio', hideSelectColumn: true };
          wrapper = shallow(
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
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
        wrapper = shallow(
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
            selectRow={ selectRow }
          />
        );
      });

      it('should render <SelectionHeaderCell />', () => {
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      describe('when selectRow.hideSelectColumn is true', () => {
        beforeEach(() => {
          const selectRow = { mode: 'checkbox', hideSelectColumn: true };
          wrapper = shallow(
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
          );
        });

        it('should not render <SelectionHeaderCell />', () => {
          expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
        });
      });
    });
  });
});
