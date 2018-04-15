import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import NumberFilter from '../../src/components/number';
import { FILTER_TYPE } from '../../src/const';
import * as Comparator from '../../src/comparison';


describe('Number Filter', () => {
  let wrapper;

  // onFilter(x)(y) = filter result
  const onFilter = sinon.stub();
  const onFilterFirstReturn = sinon.stub();

  const column = {
    dataField: 'price',
    text: 'Product Price'
  };

  afterEach(() => {
    onFilter.reset();
    onFilterFirstReturn.reset();

    onFilter.returns(onFilterFirstReturn);
  });

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter onFilter={ onFilter } column={ column } />
      );
    });

    it('should have correct state', () => {
      expect(wrapper.state().isSelected).toBeFalsy();
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('select')).toHaveLength(1);
      expect(wrapper.find('input[type="number"]')).toHaveLength(1);
      expect(wrapper.find('.number-filter')).toHaveLength(1);
    });

    it('should rendering comparator options correctly', () => {
      const select = wrapper.find('select');
      expect(select.find('option')).toHaveLength(wrapper.prop('comparators').length + 1);
    });
  });

  describe('when withoutEmptyComparatorOption prop is true', () => {
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter onFilter={ onFilter } column={ column } withoutEmptyComparatorOption />
      );
    });

    it('should rendering comparator options correctly', () => {
      const select = wrapper.find('select');
      expect(select.find('option')).toHaveLength(wrapper.prop('comparators').length);
    });
  });

  describe('when defaultValue.number props is defined', () => {
    const number = 203;

    beforeEach(() => {
      wrapper = mount(
        <NumberFilter onFilter={ onFilter } column={ column } defaultValue={ { number } } />
      );
    });

    it('should rendering input successfully', () => {
      expect(wrapper).toHaveLength(1);
      const input = wrapper.find('input[type="number"]');
      expect(input).toHaveLength(1);
      expect(input.props().defaultValue).toEqual(number);
    });
  });

  describe('when defaultValue.comparator props is defined', () => {
    const comparator = Comparator.EQ;

    beforeEach(() => {
      wrapper = mount(
        <NumberFilter onFilter={ onFilter } column={ column } defaultValue={ { comparator } } />
      );
    });

    it('should rendering comparator select successfully', () => {
      expect(wrapper).toHaveLength(1);
      const select = wrapper.find('.number-filter-comparator');
      expect(select).toHaveLength(1);
      expect(select.props().defaultValue).toEqual(comparator);
    });
  });

  describe('when props.getFilter is defined', () => {
    let programmaticallyFilter;

    const comparator = Comparator.EQ;
    const number = 123;

    const getFilter = (filter) => {
      programmaticallyFilter = filter;
    };

    beforeEach(() => {
      wrapper = mount(
        <NumberFilter onFilter={ onFilter } column={ column } getFilter={ getFilter } />
      );

      programmaticallyFilter({ comparator, number });
    });

    it('should do onFilter correctly when exported function was executed', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.NUMBER)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith({ comparator, number })).toBeTruthy();
    });

    it('should setState correctly when exported function was executed', () => {
      expect(wrapper.state().isSelected).toBeTruthy();
    });
  });

  describe('when defaultValue.number and defaultValue.comparator props is defined', () => {
    const number = 203;
    const comparator = Comparator.EQ;

    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          defaultValue={ { number, comparator } }
        />
      );
    });

    it('should have correct state', () => {
      expect(wrapper.state().isSelected).toBeTruthy();
    });

    it('should calling onFilter on componentDidMount', () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(onFilter.calledWith(column, FILTER_TYPE.NUMBER)).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith({ number: `${number}`, comparator })).toBeTruthy();
    });
  });

  describe('when options props is defined', () => {
    const options = [2100, 2103, 2105];

    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          options={ options }
        />
      );
    });

    it('should rendering number options instead of number input', () => {
      expect(wrapper).toHaveLength(1);
      const select = wrapper.find('.select-filter.placeholder-selected');
      expect(select).toHaveLength(1);
      expect(select.find('option')).toHaveLength(options.length + 1);
    });

    describe('when withoutEmptyNumberOption props is defined', () => {
      beforeEach(() => {
        wrapper = mount(
          <NumberFilter
            onFilter={ onFilter }
            column={ column }
            options={ options }
            withoutEmptyNumberOption
          />
        );
      });

      it('should rendering number options instead of number input', () => {
        const select = wrapper.find('.select-filter.placeholder-selected');
        expect(select).toHaveLength(1);
        expect(select.find('option')).toHaveLength(options.length);
      });
    });

    describe('when defaultValue.number props is defined', () => {
      const number = 203;

      beforeEach(() => {
        wrapper = mount(
          <NumberFilter
            onFilter={ onFilter }
            column={ column }
            defaultValue={ { number } }
            options={ options }
          />
        );
      });

      it('should rendering number options successfully', () => {
        const select = wrapper.find('.select-filter.placeholder-selected');
        expect(select).toHaveLength(1);
        expect(select.props().defaultValue).toEqual(number);
      });
    });

    describe('when defaultValue.number and defaultValue.comparator props is defined', () => {
      const number = options[1];
      const comparator = Comparator.EQ;

      beforeEach(() => {
        wrapper = mount(
          <NumberFilter
            onFilter={ onFilter }
            column={ column }
            defaultValue={ { number, comparator } }
            options={ options }
          />
        );
      });

      it('should rendering number options successfully', () => {
        let select = wrapper.find('.placeholder-selected');
        expect(select).toHaveLength(0);

        select = wrapper.find('.select-filter');
        expect(select).toHaveLength(1);
      });
    });
  });

  describe('when style props is defined', () => {
    const style = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          style={ style }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.number-filter').prop('style')).toEqual(style);
    });
  });

  describe('when numberStyle props is defined', () => {
    const numberStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          numberStyle={ numberStyle }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.number-filter-input').prop('style')).toEqual(numberStyle);
    });
  });

  describe('when comparatorStyle props is defined', () => {
    const comparatorStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          comparatorStyle={ comparatorStyle }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('select').prop('style')).toEqual(comparatorStyle);
    });
  });

  describe('when className props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          className={ className }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });

  describe('when numberClassName props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          numberClassName={ className }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.number-filter-input').prop('className').indexOf(className) > -1).toBeTruthy();
    });
  });

  describe('when comparatorClassName props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <NumberFilter
          onFilter={ onFilter }
          column={ column }
          comparatorClassName={ className }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('select').prop('className').indexOf(className) > -1).toBeTruthy();
    });
  });
});
