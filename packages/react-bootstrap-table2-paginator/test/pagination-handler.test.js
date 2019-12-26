import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import paginationHandler from '../src/pagination-handler';

const MockComponent = () => null;
const MockComponentWithPaginationHandler = paginationHandler(MockComponent);

describe('paginationHandler', () => {
  let wrapper;
  let instance;

  const createMockProps = props => ({
    dataSize: 100,
    sizePerPageList: [10, 20, 30, 50],
    currPage: 1,
    currSizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 5,
    withFirstAndLast: true,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    alwaysShowAllBtns: false,
    onPageChange: sinon.stub(),
    onSizePerPageChange: sinon.stub(),
    hidePageListOnlyOnePage: false,
    hideSizePerPage: false,
    ...props
  });

  describe('default pagiantion', () => {
    const props = createMockProps();

    beforeEach(() => {
      wrapper = shallow(<MockComponentWithPaginationHandler { ...props } />);
      instance = wrapper.instance();
    });

    it('should having correct state', () => {
      expect(instance.state).toBeDefined();
      expect(instance.state.totalPages).toEqual(instance.calculateTotalPage());
      expect(instance.state.lastPage).toEqual(
        instance.calculateLastPage(instance.state.totalPages));
    });

    it('should rendering PaginationList component successfully', () => {
      const wrapperedComponent = wrapper.find(MockComponent);
      expect(wrapperedComponent.length).toBe(1);
      expect(wrapperedComponent.props().lastPage).toEqual(instance.state.lastPage);
      expect(wrapperedComponent.props().totalPages).toEqual(instance.state.totalPages);
      expect(wrapperedComponent.props().onPageChange).toEqual(instance.handleChangePage);
      expect(wrapperedComponent.props().onSizePerPageChange)
        .toEqual(instance.handleChangeSizePerPage);
    });
  });

  describe('handleChangePage', () => {
    const props = createMockProps();

    beforeEach(() => {
      props.currPage = 6;
      wrapper = shallow(<MockComponentWithPaginationHandler { ...props } />);
      instance = wrapper.instance();
    });

    afterEach(() => {
      props.onPageChange.reset();
    });

    it('should calling props.onPageChange correctly when new page is eq props.prePageText', () => {
      instance.handleChangePage(props.prePageText);
      expect(props.onPageChange.callCount).toBe(1);
      expect(props.onPageChange.calledWith(5)).toBeTruthy();
    });

    it('should calling props.onPageChange correctly when new page is eq props.nextPageText', () => {
      instance.handleChangePage(props.nextPageText);
      expect(props.onPageChange.callCount).toBe(1);
      expect(props.onPageChange.calledWith(7)).toBeTruthy();
    });

    it('should calling props.onPageChange correctly when new page is eq props.lastPageText', () => {
      instance.handleChangePage(props.lastPageText);
      expect(props.onPageChange.callCount).toBe(1);
      expect(props.onPageChange.calledWith(10)).toBeTruthy();
    });

    it('should calling props.onPageChange correctly when new page is eq props.firstPageText', () => {
      instance.handleChangePage(props.firstPageText);
      expect(props.onPageChange.callCount).toBe(1);
      expect(props.onPageChange.calledWith(props.pageStartIndex)).toBeTruthy();
    });

    it('should calling props.onPageChange correctly when new page is a numeric page', () => {
      const newPage = '8';
      instance.handleChangePage(newPage);
      expect(props.onPageChange.callCount).toBe(1);
      expect(props.onPageChange.calledWith(parseInt(newPage, 10))).toBeTruthy();
    });

    it('should not calling props.onPageChange correctly when page is not changed', () => {
      const newPage = props.currPage;
      instance.handleChangePage(newPage);
      expect(props.onPageChange.callCount).toBe(0);
    });
  });

  describe('handleChangeSizePerPage', () => {
    const props = createMockProps();

    beforeEach(() => {
      wrapper = shallow(<MockComponentWithPaginationHandler { ...props } />);
      instance = wrapper.instance();
    });

    it('should always setting state.dropdownOpen to false', () => {
      instance.handleChangeSizePerPage(10);
      expect(instance.state.dropdownOpen).toBeFalsy();
    });

    describe('when new sizePerPage is same as current one', () => {
      it('should not calling props.onSizePerPageChange callback', () => {
        instance.handleChangeSizePerPage(10);
        expect(props.onSizePerPageChange.callCount).toBe(0);
      });
    });

    describe('when new sizePerPage is diff than current one', () => {
      it('should not calling props.onSizePerPageChange callback', () => {
        instance.handleChangeSizePerPage(30);
        expect(props.onSizePerPageChange.callCount).toBe(1);
      });

      describe('and new current page is still in the new lagination list', () => {
        it('should calling props.onSizePerPageChange with correct argument', () => {
          expect(props.onSizePerPageChange.calledWith(30, props.currPage));
        });
      });

      describe('and new current page is still in the new lagination list', () => {
        beforeEach(() => {
          wrapper = shallow(
            <MockComponentWithPaginationHandler { ...createMockProps({ currPage: 10 }) } />);
          instance = wrapper.instance();
        });

        it('should calling props.onSizePerPageChange with correct argument', () => {
          expect(props.onSizePerPageChange.calledWith(30, 4));
        });
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when next props.currSizePerPage is diff than current one', () => {
      const nextProps = createMockProps({ currSizePerPage: 20 });

      beforeEach(() => {
        wrapper = shallow(<MockComponentWithPaginationHandler { ...createMockProps() } />);
        instance = wrapper.instance();
      });

      it('should setting correct state.totalPages', () => {
        instance.UNSAFE_componentWillReceiveProps(nextProps);
        expect(instance.state.totalPages).toEqual(
          instance.calculateTotalPage(nextProps.currSizePerPage));
      });

      it('should setting correct state.lastPage', () => {
        instance.UNSAFE_componentWillReceiveProps(nextProps);
        const totalPages = instance.calculateTotalPage(nextProps.currSizePerPage);
        expect(instance.state.lastPage).toEqual(
          instance.calculateLastPage(totalPages));
      });
    });

    describe('when next props.dataSize is diff than current one', () => {
      const nextProps = createMockProps({ dataSize: 33 });

      beforeEach(() => {
        wrapper = shallow(<MockComponentWithPaginationHandler { ...createMockProps() } />);
        instance = wrapper.instance();
      });

      it('should setting correct state.totalPages', () => {
        instance.UNSAFE_componentWillReceiveProps(nextProps);
        expect(instance.state.totalPages).toEqual(
          instance.calculateTotalPage(nextProps.currSizePerPage, nextProps.dataSize));
      });

      it('should setting correct state.lastPage', () => {
        instance.UNSAFE_componentWillReceiveProps(nextProps);
        const totalPages = instance.calculateTotalPage(
          nextProps.currSizePerPage, nextProps.dataSize);
        expect(instance.state.lastPage).toEqual(
          instance.calculateLastPage(totalPages));
      });
    });
  });
});
