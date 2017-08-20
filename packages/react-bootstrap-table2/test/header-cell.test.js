import React from 'react';
import { shallow } from 'enzyme';

import HeaderCell from '../src/header-cell';

describe('HeaderCell', () => {
  let wrapper;
  const column = {
    dataField: 'id',
    text: 'ID'
  };

  describe('simplest header cell', () => {
    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(1);
      expect(wrapper.contains(<th>{ column.text }</th>)).toBe(true);
    });
  });
});
