import React from 'react';
import { shallow } from 'enzyme';

import Cell from '../src/cell';

describe('Cell', () => {
  let wrapper;
  const value = 'test';

  describe('simplest cell', () => {
    beforeEach(() => {
      wrapper = shallow(<Cell value={ value } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.contains(<td>{ value }</td>)).toBe(true);
    });
  });
});
