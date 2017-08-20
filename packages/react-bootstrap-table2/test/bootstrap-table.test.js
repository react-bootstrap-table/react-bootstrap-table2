import React from 'react';
import { shallow } from 'enzyme';

import Header from '../src/header';
import Body from '../src/body';
import BootstrapTable from '../src/bootstrap-table';

describe('BootstrapTable', () => {
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

  describe('simplest table', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable keyField="id" columns={ columns } data={ data } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('table').length).toBe(1);
      expect(wrapper.find(Header).length).toBe(1);
      expect(wrapper.find(Body).length).toBe(1);
      expect(wrapper.find('.react-bootstrap-table-container').length).toBe(1);
    });
  });
});
