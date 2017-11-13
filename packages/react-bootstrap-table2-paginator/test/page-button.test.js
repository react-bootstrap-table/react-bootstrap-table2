import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import PageButton from '../src/page-button';

describe('PageButton', () => {
  let wrapper;
  const onPageChangeCallback = sinon.stub();
  const props = {
    onPageChange: onPageChangeCallback,
    page: 2
  };

  describe('default PageButton', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active disabled={ false } />
      );
    });

    it('should rendering PageButton correctly', () => {
      expect(wrapper.find('a.page-link').length).toBe(1);
      expect(wrapper.text()).toEqual(`${props.page}`);
    });

    describe('when clicking', () => {
      let preventDefault;
      beforeEach(() => {
        preventDefault = sinon.stub();
        wrapper.find('a.page-link').simulate('click', { preventDefault });
      });

      afterEach(() => {
        onPageChangeCallback.reset();
      });

      it('should calling e.preventDefault', () => {
        expect(preventDefault.calledOnce).toBeTruthy();
      });

      it('should calling onPageChange prop', () => {
        expect(onPageChangeCallback.calledOnce).toBeTruthy();
      });

      it('should calling onPageChange prop with correct argument', () => {
        expect(onPageChangeCallback.calledWith(props.page)).toBeTruthy();
      });
    });
  });

  describe('when active prop is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active disabled={ false } />
      );
    });

    it('should render PageButton correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass('active')).toBeTruthy();
    });
  });

  describe('when active prop is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active={ false } disabled={ false } />
      );
    });

    it('should render PageButton correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass('active')).toBeFalsy();
    });
  });

  describe('when disabled prop is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active disabled />
      );
    });

    it('should render PageButton correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass('disabled')).toBeTruthy();
    });
  });

  describe('when disabled prop is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active disabled={ false } />
      );
    });

    it('should render PageButton correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass('disabled')).toBeFalsy();
    });
  });

  describe('when title prop is defined', () => {
    const title = 'aTitle';
    beforeEach(() => {
      wrapper = shallow(
        <PageButton { ...props } active disabled={ false } title={ title } />
      );
    });

    it('should render PageButton correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.prop('title')).toEqual(title);
    });
  });
});
