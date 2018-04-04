import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import SelectFilter from '../../src/components/select';
import { FILTER_TYPE } from '../../src/const';


describe('Select Filter', () => {
  let wrapper;
  let instance;

  // onFilter(x)(y) = filter result
  const onFilter = sinon.stub();
  const onFilterFirstReturn = sinon.stub();

  const column = {
    dataField: 'quality',
    text: 'Product Quality'
  };

  const options = {
    0: 'Bad',
    1: 'Good',
    2: 'Unknown'
  };

  afterEach(() => {
    onFilter.reset();
    onFilterFirstReturn.reset();

    onFilter.returns(onFilterFirstReturn);
  });

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = mount(
        <SelectFilter onFilter={ onFilter } column={ column } options={ options } />
      );
      instance = wrapper.instance();
    });

    it('should have correct state', () => {
      expect(instance.state.isSelected).toBeFalsy();
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('select')).toHaveLength(1);
      expect(wrapper.find('.select-filter')).toHaveLength(1);
      expect(wrapper.find('.placeholder-selected')).toHaveLength(1);
    });

    it('should rendering select options correctly', () => {
      const select = wrapper.find('select');
      expect(select.find('option')).toHaveLength(Object.keys(options).length + 1);
      expect(select.childAt(0).text()).toEqual(`Select ${column.text}...`);

      Object.keys(options).forEach((key, i) => {
        expect(select.childAt(i + 1).prop('value')).toEqual(key);
        expect(select.childAt(i + 1).text()).toEqual(options[key]);
      });
    });
  });

  describe('when defaultValue is defined', () => {
    let defaultValue;

    describe('and it is valid', () => {
      beforeEach(() => {
        defaultValue = '0';
        wrapper = mount(
          <SelectFilter
            onFilter={ onFilter }
            column={ column }
            options={ options }
            defaultValue={ defaultValue }
          />
        );
        instance = wrapper.instance();
      });

      it('should have correct state', () => {
        expect(instance.state.isSelected).toBeTruthy();
      });

      it('should rendering component successfully', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('.placeholder-selected')).toHaveLength(0);
      });

      it('should calling onFilter on componentDidMount', () => {
        expect(onFilter.calledOnce).toBeTruthy();
        expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
        expect(onFilterFirstReturn.calledOnce).toBeTruthy();
        expect(onFilterFirstReturn.calledWith(defaultValue)).toBeTruthy();
      });
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
        <SelectFilter
          onFilter={ onFilter }
          column={ column }
          options={ options }
          getFilter={ getFilter }
        />
      );
      instance = wrapper.instance();

      programmaticallyFilter(filterValue);
    });

    it('should do onFilter correctly when exported function was executed', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(filterValue)).toBeTruthy();
    });

    it('should setState correctly when exported function was executed', () => {
      expect(instance.state.isSelected).toBeTruthy();
    });
  });

  describe('when placeholder is defined', () => {
    const placeholder = 'test';
    beforeEach(() => {
      wrapper = mount(
        <SelectFilter
          onFilter={ onFilter }
          column={ column }
          options={ options }
          placeholder={ placeholder }
        />
      );
      instance = wrapper.instance();
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      const select = wrapper.find('select');
      expect(select.childAt(0).text()).toEqual(placeholder);
    });
  });

  describe('when style is defined', () => {
    const style = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <SelectFilter
          onFilter={ onFilter }
          column={ column }
          options={ options }
          style={ style }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('select').prop('style')).toEqual(style);
    });
  });

  describe('when withoutEmptyOption is defined', () => {
    beforeEach(() => {
      wrapper = mount(
        <SelectFilter
          onFilter={ onFilter }
          column={ column }
          options={ options }
          withoutEmptyOption
        />
      );
    });

    it('should rendering select without default empty option', () => {
      const select = wrapper.find('select');
      expect(select.find('option')).toHaveLength(Object.keys(options).length);
    });
  });

  describe('componentDidUpdate', () => {
    let prevProps;

    describe('when props.defaultValue is diff from prevProps.defaultValue', () => {
      beforeEach(() => {
        wrapper = mount(
          <SelectFilter
            onFilter={ onFilter }
            column={ column }
            options={ options }
            defaultValue="0"
          />
        );
        prevProps = {
          column,
          options,
          defaultValue: '1'
        };
        instance = wrapper.instance();
        instance.componentDidUpdate(prevProps);
      });

      it('should update', () => {
        expect(onFilter.callCount).toBe(2);
        expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(2);
        expect(onFilterFirstReturn.calledWith(instance.props.defaultValue)).toBeTruthy();
      });
    });

    describe('when props.options is diff from prevProps.options', () => {
      beforeEach(() => {
        wrapper = mount(
          <SelectFilter
            onFilter={ onFilter }
            column={ column }
            options={ {
              ...options,
              3: 'Best'
            } }
            defaultValue="1"
          />
        );
        prevProps = {
          column,
          options
        };
        instance = wrapper.instance();
        instance.componentDidUpdate(prevProps);
      });

      it('should update', () => {
        expect(onFilter.callCount).toBe(2);
        expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(2);
        expect(onFilterFirstReturn.calledWith(instance.props.defaultValue)).toBeTruthy();
      });
    });
  });

  describe('cleanFiltered', () => {
    describe('when props.defaultValue is defined', () => {
      const defaultValue = '0';
      beforeEach(() => {
        wrapper = mount(
          <SelectFilter
            onFilter={ onFilter }
            column={ column }
            options={ options }
            defaultValue={ defaultValue }
          />
        );
        instance = wrapper.instance();
        instance.cleanFiltered();
      });

      it('should setting state correctly', () => {
        expect(instance.state.isSelected).toBeTruthy();
      });

      it('should calling onFilter correctly', () => {
        expect(onFilter.callCount).toBe(2);
        expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(2);
        expect(onFilterFirstReturn.calledWith(defaultValue)).toBeTruthy();
      });
    });

    describe('when props.defaultValue is not defined', () => {
      beforeEach(() => {
        wrapper = mount(
          <SelectFilter
            onFilter={ onFilter }
            column={ column }
            options={ options }
          />
        );
        instance = wrapper.instance();
        instance.cleanFiltered();
      });

      it('should setting state correctly', () => {
        expect(instance.state.isSelected).toBeFalsy();
      });

      it('should calling onFilter correctly', () => {
        expect(onFilter.callCount).toBe(1);
        expect(onFilterFirstReturn.callCount).toBe(1);
      });
    });
  });

  describe('applyFilter', () => {
    const value = '2';
    beforeEach(() => {
      wrapper = mount(
        <SelectFilter onFilter={ onFilter } column={ column } options={ options } />
      );
      instance = wrapper.instance();
      instance.applyFilter(value);
    });

    it('should setting state correctly', () => {
      expect(instance.state.isSelected).toBeTruthy();
    });

    it('should calling onFilter correctly', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(value)).toBeTruthy();
    });
  });

  describe('filter', () => {
    const event = { target: { value: 'tester' } };

    beforeEach(() => {
      wrapper = mount(
        <SelectFilter onFilter={ onFilter } column={ column } options={ options } />
      );
      instance = wrapper.instance();
      instance.filter(event);
    });

    it('should setting state correctly', () => {
      expect(instance.state.isSelected).toBeTruthy();
    });

    it('should calling onFilter correctly', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.SELECT)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(event.target.value)).toBeTruthy();
    });
  });
});
