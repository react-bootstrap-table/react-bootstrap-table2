import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import paginationFactory from '../index';
import Const from '../src/const';
import createStateContext from '../src/data-context';
import Pagination from '../src/pagination';
import { getByCurrPage } from '../src/page';

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`
  });
}

describe('PaginationDataContext', () => {
  let wrapper;
  let PaginationDataContext;

  const defaultPagination = { options: { totalSize: data.length }, createContext: jest.fn() };

  const MockComponent = () => null;
  const renderMockComponent = jest.fn((props => (
    <MockComponent { ...props } />
  )));

  const handleRemotePaginationChange = jest.fn();

  function shallowContext(
    customPagination = defaultPagination,
    remoteEnabled = false
  ) {
    renderMockComponent.mockReset();
    handleRemotePaginationChange.mockReset();
    PaginationDataContext = createStateContext();
    const isRemotePagination = jest.fn().mockReturnValue(remoteEnabled);
    const remoteEmitter = { emit: jest.fn() };

    return (
      <PaginationDataContext.Provider
        pagination={ paginationFactory(customPagination) }
        data={ data }
        remoteEmitter={ remoteEmitter }
        isRemotePagination={ isRemotePagination }
      >
        <PaginationDataContext.Consumer>
          {
            paginationProps => renderMockComponent(paginationProps)
          }
        </PaginationDataContext.Consumer>
      </PaginationDataContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createPaginationDataContext', () => {
      expect(PaginationDataContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createPaginationDataContext', () => {
      expect(PaginationDataContext.Consumer).toBeDefined();
    });

    it('should have correct currPage', () => {
      expect(wrapper.instance().currPage).toEqual(Const.PAGE_START_INDEX);
    });

    it('should have correct currSizePerPage', () => {
      expect(wrapper.instance().currSizePerPage).toEqual(Const.SIZE_PER_PAGE_LIST[0]);
    });

    it('should render correct data props to childrens', () => {
      const instance = wrapper.instance();
      expect(renderMockComponent).toHaveBeenCalledTimes(1);
      expect(renderMockComponent).toHaveBeenCalledWith({
        data: getByCurrPage(
          data,
          instance.currPage,
          instance.currSizePerPage,
          Const.PAGE_START_INDEX
        ),
        setRemoteEmitter: instance.setRemoteEmitter
      });
    });
  });

  describe('default render', () => {
    describe('when options.custom is negative', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
      });

      it('should render Pagination component correctly', () => {
        const instance = wrapper.instance();
        const pagination = wrapper.find(Pagination);
        expect(pagination).toHaveLength(1);

        expect(pagination.prop('dataSize')).toEqual(data.length);
        expect(pagination.prop('currPage')).toEqual(instance.currPage);
        expect(pagination.prop('currSizePerPage')).toEqual(instance.currSizePerPage);
        expect(pagination.prop('onPageChange')).toEqual(instance.handleChangePage);
        expect(pagination.prop('onSizePerPageChange')).toEqual(instance.handleChangeSizePerPage);
        expect(pagination.prop('sizePerPageList')).toEqual(Const.SIZE_PER_PAGE_LIST);
        expect(pagination.prop('paginationSize')).toEqual(Const.PAGINATION_SIZE);
        expect(pagination.prop('pageStartIndex')).toEqual(Const.PAGE_START_INDEX);
        expect(pagination.prop('withFirstAndLast')).toEqual(Const.With_FIRST_AND_LAST);
        expect(pagination.prop('alwaysShowAllBtns')).toEqual(Const.SHOW_ALL_PAGE_BTNS);
        expect(pagination.prop('firstPageText')).toEqual(Const.FIRST_PAGE_TEXT);
        expect(pagination.prop('prePageText')).toEqual(Const.PRE_PAGE_TEXT);
        expect(pagination.prop('nextPageText')).toEqual(Const.NEXT_PAGE_TEXT);
        expect(pagination.prop('lastPageText')).toEqual(Const.LAST_PAGE_TEXT);
        expect(pagination.prop('firstPageTitle')).toEqual(Const.FIRST_PAGE_TITLE);
        expect(pagination.prop('prePageTitle')).toEqual(Const.PRE_PAGE_TITLE);
        expect(pagination.prop('nextPageTitle')).toEqual(Const.NEXT_PAGE_TITLE);
        expect(pagination.prop('lastPageTitle')).toEqual(Const.LAST_PAGE_TITLE);
        expect(pagination.prop('hideSizePerPage')).toEqual(Const.HIDE_SIZE_PER_PAGE);
        expect(pagination.prop('hideSizePerPage')).toEqual(Const.HIDE_SIZE_PER_PAGE);
        expect(pagination.prop('paginationTotalRenderer')).toBeUndefined();
      });
    });

    describe('when options.custom is positive', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          custom: true
        }));
        wrapper.render();
      });

      it('should not render Pagination component', () => {
        const pagination = wrapper.find(Pagination);
        expect(pagination).toHaveLength(0);
      });
    });
  });

  describe('when remote pagination enabled', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext({}, true));
      wrapper.render();
    });

    it('just pass data props to children', () => {
      const instance = wrapper.instance();
      expect(renderMockComponent).toHaveBeenCalledTimes(1);
      expect(renderMockComponent).toHaveBeenCalledWith({
        data: instance.props.data,
        setRemoteEmitter: instance.setRemoteEmitter
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    let instance;
    let nextProps;
    describe('when page is not align', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          page: 2
        }));
        instance = wrapper.instance();
        wrapper.render();
        nextProps = {
          data: [],
          pagination: { ...defaultPagination }
        };
        instance.componentWillReceiveProps(nextProps);
      });

      it('should reset currPage to first page', () => {
        expect(instance.currPage).toEqual(1);
      });

      describe('if options.onPageChange is defined', () => {
        const onPageChange = jest.fn();
        beforeEach(() => {
          onPageChange.mockClear();
          wrapper = shallow(shallowContext({
            ...defaultPagination,
            page: 2
          }));
          instance = wrapper.instance();
          wrapper.render();
          nextProps = {
            data: [],
            pagination: { ...defaultPagination, options: { onPageChange } }
          };
          instance.componentWillReceiveProps(nextProps);
        });

        it('should call options.onPageChange correctly', () => {
          expect(onPageChange).toHaveBeenCalledTimes(1);
          expect(onPageChange).toHaveBeenCalledWith(instance.currPage, instance.currSizePerPage);
        });
      });
    });
  });
});
