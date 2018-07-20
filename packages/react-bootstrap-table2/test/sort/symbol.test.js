import React from 'react';
import { shallow } from 'enzyme';

import SortSymbol from '../../src/sort/symbol';

describe('SortSymbol', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SortSymbol />);
    const Children = wrapper.props().children({ bootstrap4: false });
    wrapper = shallow(Children);
  });
  it('should render sort symbol correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.order').length).toBe(1);
    expect(wrapper.find('.caret').length).toBe(2);
    expect(wrapper.find('.dropdown').length).toBe(1);
    expect(wrapper.find('.dropup').length).toBe(1);
  });

  describe('if bootstrap4 prop is true', () => {
    beforeEach(() => {
      wrapper = shallow(<SortSymbol />);
      const Children = wrapper.props().children({ bootstrap4: true });
      wrapper = shallow(Children);
    });
    it('should render sort symbol correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('.order-4').length).toBe(1);
    });
  });
});
