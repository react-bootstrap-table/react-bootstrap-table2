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

  describe('when column.hidden props is true', () => {
    const column = {
      dataField: 'id',
      text: 'ID',
      hidden: true
    };

    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    it('should have \'none\' value for style.display', () => {
      const style = wrapper.find('th').prop('style');
      expect(style).toBeDefined();
      expect(style.display).toEqual('none');
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

  describe('when column.headerFormatter prop is defined', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };
    const formatterResult = (<h3>{ column.text }</h3>);
    const formatter = sinon.stub()
      .withArgs(column, index)
      .returns(formatterResult);
    column.headerFormatter = formatter;

    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    afterEach(() => { formatter.reset(); });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.contains(formatterResult)).toBe(true);
    });

    it('should call custom headerFormatter correctly', () => {
      expect(formatter.callCount).toBe(1);
      expect(formatter.calledWith(column, index)).toBe(true);
    });
  });

  describe('when column.headerEvents prop is defined', () => {
    let column;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        headerEvents: {
          onClick: sinon.stub()
        }
      };

      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    it('should attachs DOM event successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').prop('onClick')).toBeDefined();
    });

    it('event hook should be called when triggering', () => {
      wrapper.find('th').simulate('click');
      expect(column.headerEvents.onClick.callCount).toBe(1);
    });
  });
});
