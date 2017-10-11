import React from 'react';
import { shallow } from 'enzyme';

import HeaderCell from 'src/header-cell';
import SelectionHeaderCell from 'src/row-selection/selection-header-cell';
import Header from 'src/header';
import Const from 'src/const';
import { headerResolvedProps, baseColumns } from 'test/factory';

const mockHeaderResolvedProps = headerResolvedProps();

describe('Header', () => {
  let wrapper;
  const columns = baseColumns();

  describe('simplest header', () => {
    beforeEach(() => {
      wrapper = shallow(<Header {...mockHeaderResolvedProps} columns={ columns } />);
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
          {...mockHeaderResolvedProps}
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

  describe('when the selectRow.mode is radio(single selection)', () => {
    beforeEach(() => {
      wrapper = shallow(<Header {...mockHeaderResolvedProps} columns={ columns } />);
    });

    it('should not render <SelectionHeaderCell />', () => {
      expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
    });
  });

  describe('when the selectRow.mode is checkbox(multiple selection)', () => {
    beforeEach(() => {
      const selectRow = { mode: 'checkbox' };
      wrapper = shallow(
        <Header
          {...mockHeaderResolvedProps}
          columns={ columns }
          selectRow={selectRow}
        />
      );
    });

    it('should render <SelectionHeaderCell />', () => {
      expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
    });
  });
});
