import React from 'react';
import { shallow } from 'enzyme';

import Const from '../../src/const';
import SortCaret from '../../src/sort/caret';

describe('SortCaret', () => {
  let wrapper;

  describe('when bootstrap4 context is false', () => {
    describe(`when order prop is ${Const.SORT_ASC}`, () => {
      beforeEach(() => {
        wrapper = shallow(<SortCaret order={ Const.SORT_ASC } />);
        const Children = wrapper.props().children({ bootstrap4: false });
        wrapper = shallow(Children);
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
        wrapper = shallow(<SortCaret order={ Const.SORT_DESC } />);
        const Children = wrapper.props().children({ bootstrap4: false });
        wrapper = shallow(Children);
      });

      it('should render caret correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('span').length).toBe(2);
        expect(wrapper.find('.caret').length).toBe(1);
        expect(wrapper.find('.dropup').length).toBe(0);
      });
    });
  });

  describe('when bootstrap4 context is true', () => {
    describe(`when order prop is ${Const.SORT_ASC}`, () => {
      beforeEach(() => {
        wrapper = shallow(<SortCaret order={ Const.SORT_ASC } />);
        const Children = wrapper.props().children({ bootstrap4: true });
        wrapper = shallow(Children);
      });

      it('should render caret correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('.caret-4-asc').length).toBe(1);
      });
    });

    describe(`when order prop is ${Const.SORT_DESC}`, () => {
      beforeEach(() => {
        wrapper = shallow(<SortCaret order={ Const.SORT_DESC } />);
        const Children = wrapper.props().children({ bootstrap4: true });
        wrapper = shallow(Children);
      });

      it('should render caret correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('.caret-4-desc').length).toBe(1);
      });
    });
  });
});
