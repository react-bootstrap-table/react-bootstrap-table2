import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SizePerPageOption from '../src/size-per-page-option';
import SizePerPageDropDown from '../src/size-per-page-dropdown';

describe('SizePerPageDropDown', () => {
  let wrapper;
  const currSizePerPage = '25';
  const options = [{
    text: '10',
    page: 10
  }, {
    text: '25',
    page: 25
  }];
  const onClick = sinon.stub();
  const onBlur = sinon.stub();
  const onSizePerPageChange = sinon.stub();
  const props = {
    currSizePerPage,
    options,
    onClick,
    onBlur,
    onSizePerPageChange
  };

  describe('default SizePerPageDropDown component', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('button').text()).toEqual(`${currSizePerPage} `);
    });

    it('should rendering SizePerPageOption successfully', () => {
      expect(wrapper.find('ul.dropdown-menu').length).toBe(1);
      const sizePerPageOptions = wrapper.find(SizePerPageOption);
      expect(sizePerPageOptions.length).toBe(options.length);
      sizePerPageOptions.forEach((sizePerPage, i) => {
        const option = options[i];
        expect(sizePerPage.prop('text')).toEqual(option.text);
        expect(sizePerPage.prop('page')).toEqual(option.page);
        expect(sizePerPage.prop('onSizePerPageChange')).toEqual(onSizePerPageChange);
      });
    });

    it('default variation is dropdown', () => {
      expect(wrapper.hasClass('dropdown')).toBeTruthy();
    });

    it('default dropdown is not open', () => {
      expect(wrapper.hasClass('open show')).toBeFalsy();
      expect(wrapper.find('[aria-expanded=false]').length).toBe(1);
    });
  });

  describe('when open prop is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } open />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.hasClass('open show')).toBeTruthy();
      expect(wrapper.find('[aria-expanded=true]').length).toBe(1);
    });
  });

  describe('when hidden prop is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } hidden />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.prop('style')).toEqual({ visibility: 'hidden' });
    });
  });

  describe('when btnContextual prop is defined', () => {
    const contextual = 'btn-warning';
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } btnContextual={ contextual } />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.find(`button.${contextual}`).length).toBe(1);
    });
  });

  describe('when variation prop is defined', () => {
    const variation = 'dropup';
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } variation={ variation } />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.hasClass(variation)).toBeTruthy();
    });
  });

  describe('when className prop is defined', () => {
    const className = 'custom-class';
    beforeEach(() => {
      wrapper = shallow(
        <SizePerPageDropDown { ...props } className={ className } />
      );
    });

    it('should rendering SizePerPageDropDown correctly', () => {
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });
});
