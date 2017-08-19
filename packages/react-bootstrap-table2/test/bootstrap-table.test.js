import React from 'react';
import { shallow } from 'enzyme';

import BootstrapTable from '../src/bootstrap-table';

describe('BootstrapTable', () => {
  describe('render', () => {
    test('it should render DOM correctly', () => {
      const wrapper = shallow(<BootstrapTable />);

      expect(wrapper.length).toBe(1);
      expect(wrapper.find('ul').length).toBe(1);
    });
  });
});
