import React from 'react';
import { shallow } from 'enzyme';

import Cell from '../src/cell';
import Row from '../src/row';

describe('Row', () => {
  let wrapper;
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const row = {
    id: 1,
    name: 'A'
  };

  describe('simplest row', () => {
    beforeEach(() => {
      wrapper = shallow(<Row rowIndex={ 1 } columns={ columns } row={ row } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(Cell).length).toBe(Object.keys(row).length);
    });
  });
});
