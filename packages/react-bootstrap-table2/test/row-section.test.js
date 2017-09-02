import React from 'react';
import { shallow } from 'enzyme';

import RowSection from '../src/row-section';

describe('Row', () => {
  const colSpan = 3;
  let wrapper;
  let content;

  describe('simplest row-section', () => {
    beforeEach(() => {
      wrapper = shallow(<RowSection content={ content } colSpan={ colSpan } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('td').length).toBe(1);
      expect(wrapper.find('td').prop('colSpan')).toEqual(colSpan);
      expect(wrapper.find('.react-bs-table-no-data').length).toBe(1);
    });
  });
});
