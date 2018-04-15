import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import TextFilter from '../../src/components/text';
import { FILTER_TYPE } from '../../src/const';

jest.useFakeTimers();
describe('Text Filter', () => {
  let wrapper;
  let instance;

  // onFilter(x)(y) = filter result
  const onFilter = sinon.stub();
  const onFilterFirstReturn = sinon.stub();

  const column = {
    dataField: 'price',
    text: 'Price'
  };

  afterEach(() => {
    onFilter.reset();
    onFilterFirstReturn.reset();

    onFilter.returns(onFilterFirstReturn);
  });

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } />
      );
      instance = wrapper.instance();
    });

    it('should have correct state', () => {
      expect(instance.state.value).toEqual(instance.props.defaultValue);
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('input[type="text"]')).toHaveLength(1);
      expect(instance.input.getAttribute('placeholder')).toEqual(`Enter ${column.text}...`);
    });
  });

  describe('when defaultValue is defined', () => {
    const defaultValue = '123';
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } defaultValue={ defaultValue } />
      );
      instance = wrapper.instance();
    });

    it('should have correct state', () => {
      expect(instance.state.value).toEqual(defaultValue);
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(instance.input.value).toEqual(defaultValue);
    });

    it('should calling onFilter on componentDidMount', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.TEXT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(defaultValue)).toBeTruthy();
    });
  });

  describe('when props.getFilter is defined', () => {
    let programmaticallyFilter;

    const filterValue = 'foo';

    const getFilter = (filter) => {
      programmaticallyFilter = filter;
    };

    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } getFilter={ getFilter } />
      );
      instance = wrapper.instance();

      programmaticallyFilter(filterValue);
    });

    it('should do onFilter correctly when exported function was executed', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.TEXT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(filterValue)).toBeTruthy();
    });

    it('should setState correctly when exported function was executed', () => {
      expect(instance.state.value).toEqual(filterValue);
    });
  });

  describe('when placeholder is defined', () => {
    const placeholder = 'test';
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } placeholder={ placeholder } />
      );
      instance = wrapper.instance();
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(instance.input.getAttribute('placeholder')).toEqual(placeholder);
    });
  });

  describe('when style is defined', () => {
    const style = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } style={ style } />
      );
      instance = wrapper.instance();
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('input').prop('style')).toEqual(style);
    });
  });

  describe('componentWillReceiveProps', () => {
    const nextDefaultValue = 'tester';
    const nextProps = {
      onFilter,
      column,
      defaultValue: nextDefaultValue
    };

    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } />
      );
      instance = wrapper.instance();
      instance.componentWillReceiveProps(nextProps);
    });

    it('should setting state correctly when props.defaultValue is changed', () => {
      expect(instance.state.value).toEqual(nextDefaultValue);
    });

    it('should calling onFilter correctly when props.defaultValue is changed', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.TEXT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(nextDefaultValue)).toBeTruthy();
    });
  });

  describe('cleanFiltered', () => {
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } />
      );
      instance = wrapper.instance();
      instance.cleanFiltered();
    });

    it('should setting state correctly', () => {
      expect(instance.state.value).toEqual(instance.props.defaultValue);
    });

    it('should calling onFilter correctly', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.TEXT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(instance.props.defaultValue)).toBeTruthy();
    });
  });

  describe('applyFilter', () => {
    const filterText = 'test';
    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } />
      );
      instance = wrapper.instance();
      instance.applyFilter(filterText);
    });

    it('should setting state correctly', () => {
      expect(instance.state.value).toEqual(filterText);
    });

    it('should calling onFilter correctly', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.TEXT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(filterText)).toBeTruthy();
    });
  });

  describe('filter', () => {
    const event = { stopPropagation: sinon.stub(), target: { value: 'tester' } };

    beforeEach(() => {
      wrapper = mount(
        <TextFilter onFilter={ onFilter } column={ column } />
      );
      instance = wrapper.instance();
      instance.filter(event);
    });

    afterEach(() => {
      setTimeout.mockClear();
    });

    it('should calling e.stopPropagation', () => {
      expect(event.stopPropagation.calledOnce).toBeTruthy();
    });

    it('should setting state correctly', () => {
      expect(instance.state.value).toEqual(event.target.value);
    });

    it('should calling setTimeout correctly', () => {
      expect(setTimeout.mock.calls).toHaveLength(1);
      expect(setTimeout.mock.calls[0]).toHaveLength(2);
      expect(setTimeout.mock.calls[0][1]).toEqual(instance.props.delay);
    });
  });
});
