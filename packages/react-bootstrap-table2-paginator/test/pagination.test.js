import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SizePerPageDropDown from '../src/size-per-page-dropdown';
import PaginationList from '../src/pagination-list';
import Pagination from '../src/pagination';
import PaginationTotal from '../src/pagination-total';

describe('Pagination', () => {
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
      wrapper = shallow(<Pagination { ...props } />);
      instance = wrapper.instance();
    });

    it('should rendering correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.dive().hasClass('react-bootstrap-table-pagination')).toBeTruthy();
      expect(wrapper.find('.react-bootstrap-table-pagination-list-hidden').length).toBe(0);
    });

    it('should having correct state', () => {
      expect(instance.state).toBeDefined();
      expect(instance.state.totalPages).toEqual(instance.calculateTotalPage());
      expect(instance.state.lastPage).toEqual(
        instance.calculateLastPage(instance.state.totalPages));
      expect(instance.state.dropdownOpen).toBeFalsy();
    });
  });

  describe('when props.hidePageListOnlyOnePage is true', () => {
    beforeEach(() => {
      const props = createMockProps({ hidePageListOnlyOnePage: true, dataSize: 7 });
      wrapper = shallow(<Pagination { ...props } />);
      instance = wrapper.instance();
    });

    it('should find react-bootstrap-table-pagination-list-hidden class when only one page', () => {
      expect(wrapper.dive().find('.react-bootstrap-table-pagination-list-hidden').length).toBe(1);
    });
  });

  describe('when props.pageListRenderer is defined', () => {
    let pageListRenderer;
    beforeEach(() => {
      pageListRenderer = jest.fn().mockReturnValue(null);
      const props = createMockProps({ pageListRenderer });
      wrapper = shallow(<Pagination { ...props } />);
      wrapper.render();
      instance = wrapper.instance();
    });

    it('should not render PaginationList', () => {
      expect(wrapper.dive().find(PaginationList)).toHaveLength(0);
    });

    it('should call props.pageListRenderer correctly', () => {
      expect(pageListRenderer).toHaveBeenCalledTimes(1);
    });
  });

  describe('when props.sizePerPageRenderer is defined', () => {
    let sizePerPageRenderer;
    beforeEach(() => {
      sizePerPageRenderer = jest.fn().mockReturnValue(null);
      const props = createMockProps({ sizePerPageRenderer });
      wrapper = shallow(<Pagination { ...props } />);
      wrapper.render();
      instance = wrapper.instance();
    });

    it('should not render SizePerPageDropDown', () => {
      expect(wrapper.dive().find(SizePerPageDropDown)).toHaveLength(0);
    });

    it('should call props.sizePerPageRenderer correctly', () => {
      expect(sizePerPageRenderer).toHaveBeenCalledTimes(1);
    });
  });

  describe('when props.showTotal is true', () => {
    beforeEach(() => {
      const props = createMockProps({ showTotal: true });
      wrapper = shallow(<Pagination { ...props } />);
      wrapper.render();
      instance = wrapper.instance();
    });

    it('should render PaginationTotal correctly', () => {
      expect(wrapper.dive().find(PaginationTotal)).toHaveLength(1);
    });

    describe('if props.paginationTotalRenderer is defined', () => {
      let paginationTotalRenderer;

      beforeEach(() => {
        paginationTotalRenderer = jest.fn();
        const props = createMockProps({ showTotal: true, paginationTotalRenderer });
        wrapper = shallow(<Pagination { ...props } />);
        wrapper.render();
        instance = wrapper.instance();
      });

      it('should not render PaginationTotal', () => {
        expect(wrapper.dive().find(PaginationTotal)).toHaveLength(0);
      });

      it('should call props.paginationTotalRenderer correctly', () => {
        expect(paginationTotalRenderer).toHaveBeenCalledTimes(1);
      });
    });
  });
});
