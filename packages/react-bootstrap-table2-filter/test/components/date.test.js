import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import DateFilter from '../../src/components/date';
import { FILTER_TYPE } from '../../src/const';
import * as Comparator from '../../src/comparison';


describe('Date Filter', () => {
  let wrapper;


  const onFilterFirstReturn = jest.fn();
  const onFilter = jest.fn().mockReturnValue(onFilterFirstReturn);

  const column = {
    dataField: 'price',
    text: 'Product Price'
  };

  afterEach(() => {
    onFilter.mockClear();
    onFilterFirstReturn.mockClear();

    // onFilter.returns(onFilterFirstReturn);
  });

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = mount(
        <DateFilter onFilter={ onFilter } column={ column } />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter-input')).toHaveLength(1);
      expect(wrapper.find('.date-filter-comparator')).toHaveLength(1);
      expect(wrapper.find('.date-filter')).toHaveLength(1);
    });

    it('should rendering comparator options correctly', () => {
      const select = wrapper.find('select');
      expect(select.find('option')).toHaveLength(wrapper.prop('comparators').length + 1);
    });
  });

  describe('when withoutEmptyComparatorOption prop is true', () => {
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          withoutEmptyComparatorOption
        />
      );
    });

    it('should rendering comparator options correctly', () => {
      const select = wrapper.find('.date-filter-comparator');
      expect(select.find('option')).toHaveLength(wrapper.prop('comparators').length);
    });
  });

  describe('when defaultValue.date props is defined', () => {
    const date = new Date(2018, 0, 1);

    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          defaultValue={ { date } }
        />
      );
    });

    it('should rendering input successfully', () => {
      expect(wrapper).toHaveLength(1);
      const input = wrapper.find('.date-filter-input');
      expect(input).toHaveLength(1);
      expect(input.props().defaultValue).toEqual(wrapper.instance().getDefaultDate());
    });
  });

  describe('when defaultValue.comparator props is defined', () => {
    const comparator = Comparator.EQ;

    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          defaultValue={ { comparator } }
        />
      );
    });

    it('should rendering comparator select successfully', () => {
      expect(wrapper).toHaveLength(1);
      const select = wrapper.find('.date-filter-comparator');
      expect(select).toHaveLength(1);
      expect(select.props().defaultValue).toEqual(comparator);
    });
  });

  describe('when props.getFilter is defined', () => {
    let programmaticallyFilter;

    const comparator = Comparator.EQ;
    const date = new Date(2018, 0, 1);

    const getFilter = (filter) => {
      programmaticallyFilter = filter;
    };

    beforeEach(() => {
      wrapper = mount(
        <DateFilter onFilter={ onFilter } column={ column } getFilter={ getFilter } />
      );

      programmaticallyFilter({ comparator, date });
    });

    it('should do onFilter correctly when exported function was executed', () => {
      expect(onFilter).toHaveBeenCalledTimes(1);
      expect(onFilter).toHaveBeenCalledWith(column, FILTER_TYPE.DATE);
      expect(onFilterFirstReturn).toHaveBeenCalledTimes(1);
      expect(onFilterFirstReturn).toHaveBeenCalledWith({ comparator, date });
    });
  });

  describe('when defaultValue.number and defaultValue.comparator props are defined', () => {
    let date;
    let comparator;

    beforeEach(() => {
      date = new Date();
      comparator = Comparator.EQ;
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          defaultValue={ { date, comparator } }
        />
      );
    });

    it('should calling onFilter on componentDidMount', () => {
      expect(onFilter).toHaveBeenCalledTimes(1);
      expect(onFilter).toHaveBeenCalledWith(column, FILTER_TYPE.DATE);
      expect(onFilterFirstReturn).toHaveBeenCalledTimes(1);
      // expect(onFilterFirstReturn).toHaveBeenCalledWith({ comparator, date });
    });
  });

  describe('when style props is defined', () => {
    const style = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          style={ style }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter').prop('style')).toEqual(style);
    });
  });

  describe('when dateStyle props is defined', () => {
    const dateStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          dateStyle={ dateStyle }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter-input').prop('style')).toEqual(dateStyle);
    });
  });

  describe('when comparatorStyle props is defined', () => {
    const comparatorStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          comparatorStyle={ comparatorStyle }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter-comparator').prop('style')).toEqual(comparatorStyle);
    });
  });

  describe('when className props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
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

  describe('when dateClassName props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          dateClassName={ className }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter-input').prop('className').indexOf(className) > -1).toBeTruthy();
    });
  });

  describe('when comparatorClassName props is defined', () => {
    const className = 'test';
    beforeEach(() => {
      wrapper = mount(
        <DateFilter
          onFilter={ onFilter }
          column={ column }
          comparatorClassName={ className }
        />
      );
    });

    it('should rendering component successfully', () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find('.date-filter-comparator').prop('className').indexOf(className) > -1).toBeTruthy();
    });
  });
});
