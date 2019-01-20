/* eslint no-unused-vars: 0 */
import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

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

  const keyField = 'id';

  describe('simplest footer', () => {
    beforeEach(() => {
      wrapper = shallow(<Footer data={ data } columns={ columns } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(FooterCell).length).toBe(columns.length);
    });
  });

  describe('className prop is exists', () => {
    const className = 'test-class';

    beforeEach(() => {
      wrapper = shallow(<Footer data={ data } columns={ columns } className={ className } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });
});
