import React from 'react';
import { shallow } from 'enzyme';

import HeaderCell from '../src/header-cell';
import Header from '../src/header';

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
      wrapper = shallow(<Header columns={ columns } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(HeaderCell).length).toBe(columns.length);
    });
  });
});
