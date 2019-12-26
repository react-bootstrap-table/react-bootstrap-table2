/* eslint no-unused-vars: 0 */
import 'jsdom-global/register';
import React from 'react';
import { shallow, render } from 'enzyme';

import Const from '../src/const';
import Footer from '../src/footer';
import FooterCell from '../src/footer-cell';

describe('Footer', () => {
  let wrapper;
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      footer: 'Footer 1'
    },
    {
      dataField: 'name',
      text: 'Name',
      footer: (columnData, column) => 'Footer 2'
    }
  ];

  const data = [
    {
      id: 1,
      name: 'A'
    },
    {
      id: 2,
      name: 'B'
    }
  ];

  const selectRow = {
    mode: Const.ROW_SELECT_DISABLED,
    selected: [],
    hideSelectColumn: true
  };
  const expandRow = {
    renderer: undefined,
    expanded: [],
    nonExpandable: []
  };

  const keyField = 'id';

  describe('simplest footer', () => {
    beforeEach(() => {
      wrapper = render(
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          expandRow={ expandRow }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('th').length).toBe(columns.length);
    });
  });

  describe('className prop is exists', () => {
    const className = 'test-class';

    beforeEach(() => {
      wrapper = shallow(
        <Footer
          data={ data }
          columns={ columns }
          className={ className }
          selectRow={ selectRow }
          expandRow={ expandRow }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });

  describe('when selectRow prop is enable', () => {
    beforeEach(() => {
      wrapper = render(
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ { ...selectRow, mode: 'radio', hideSelectColumn: false } }
          expandRow={ expandRow }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(columns.length + 1);
    });
  });

  describe('when expandRow prop is enable', () => {
    beforeEach(() => {
      wrapper = render(
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          expandRow={ { expandRow, showExpandColumn: true } }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(columns.length + 1);
    });
  });
});
