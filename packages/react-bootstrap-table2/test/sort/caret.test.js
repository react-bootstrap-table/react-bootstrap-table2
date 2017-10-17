import React from 'react';
import { shallow } from 'enzyme';

import Const from '../../src/const';
import SortCaret from '../../src/sort/caret';

describe('SortCaret', () => {
  let wrapper;

  describe(`when order prop is ${Const.SORT_ASC}`, () => {
    beforeEach(() => {
      wrapper = shallow(
        <SortCaret order={ Const.SORT_ASC } />);
    });

    it('should render caret correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('span').length).toBe(2);
      expect(wrapper.find('.caret').length).toBe(1);
      expect(wrapper.find('.dropup').length).toBe(1);
    });
  });

  describe(`when order prop is ${Const.SORT_DESC}`, () => {
    beforeEach(() => {
      wrapper = shallow(
        <SortCaret order={ Const.SORT_DESC } />);
    });

    it('should render caret correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('span').length).toBe(2);
      expect(wrapper.find('.caret').length).toBe(1);
      expect(wrapper.find('.dropup').length).toBe(0);
    });
  });
});
