import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import HeaderCell from '../src/header-cell';

describe('HeaderCell', () => {
  let wrapper;
  const index = 1;

  describe('simplest header cell', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(1);
      expect(wrapper.text()).toEqual(column.text);
    });

    it('should have correct default style', () => {
      const style = wrapper.find('th').prop('style');
      expect(style).toBeDefined();
    });
  });

  describe('when column.headerTitle prop is defined', () => {
    let column;
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerTitle is boolean', () => {
      beforeEach(() => {
        column.headerTitle = true;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render title as column.text as default', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('title')).toBe(column.text);
      });
    });

    describe('when headerTitle is custom function', () => {
      const customTitle = 'test_title';
      let titleCallBack;

      beforeEach(() => {
        titleCallBack = sinon.stub()
          .withArgs(column)
          .returns(customTitle);
        column.headerTitle = titleCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render title correctly by custom title function', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('title')).toBe(customTitle);
      });

      it('should call custom title function correctly', () => {
        expect(titleCallBack.callCount).toBe(1);
        expect(titleCallBack.calledWith(column)).toBe(true);
      });
    });
  });

  describe('when column.headerAlign prop is defined', () => {
    let column;
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerAlign is string', () => {
      beforeEach(() => {
        column.headerAlign = 'center';
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render style.textAlign correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style').textAlign).toBe(column.headerAlign);
      });
    });

    describe('when headerAlign is custom function', () => {
      const customAlign = 'center';
      let alignCallBack;

      beforeEach(() => {
        alignCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(customAlign);
        column.headerAlign = alignCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render style.textAlign correctly by custom headerAlign function', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style').textAlign).toBe(customAlign);
      });

      it('should call custom headerAlign function correctly', () => {
        expect(alignCallBack.callCount).toBe(1);
        expect(alignCallBack.calledWith(column, index)).toBe(true);
      });
    });
  });
});
