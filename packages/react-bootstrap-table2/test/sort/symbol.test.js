import React from 'react';
import { shallow } from 'enzyme';

import SortSymbol from '../../src/sort/symbol';

describe('SortSymbol', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <SortSymbol />);
  });
  it('should render sort symbol correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.order').length).toBe(1);
    expect(wrapper.find('.caret').length).toBe(2);
    expect(wrapper.find('.dropdown').length).toBe(1);
    expect(wrapper.find('.dropup').length).toBe(1);
  });
});
