import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import BootstrapTable from 'react-bootstrap-table-next/src/bootstrap-table';

import Pagination from '../src/pagination';
import Const from '../src/const';
import createPaginationContext from '../src/context';
import paginationFactory from '../index';

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`
  });
}

describe('PaginationContext', () => {
  let wrapper;
  let PaginationContext;

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const defaultPagination = { options: {} };

  const mockBase = jest.fn((props => (
    <BootstrapTable
      keyField="id"
      data={ data }
      columns={ columns }
      { ...props }
    />
  )));

  const handleRemotePaginationChange = jest.fn();

  function shallowContext(
    customPagination = defaultPagination,
    enableRemote = false
  ) {
    mockBase.mockReset();
    handleRemotePaginationChange.mockReset();
    PaginationContext = createPaginationContext(
      jest.fn().mockReturnValue(enableRemote),
      handleRemotePaginationChange
    );

    return (
      <PaginationContext.Provider
        pagination={ paginationFactory(customPagination) }
        columns={ columns }
        data={ data }
      >
        <PaginationContext.Consumer>
          {
            paginationProps => mockBase(paginationProps)
          }
        </PaginationContext.Consumer>
      </PaginationContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createPaginationContext', () => {
      expect(PaginationContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createPaginationContext', () => {
      expect(PaginationContext.Consumer).toBeDefined();
    });

    it('should have correct currPage', () => {
      expect(wrapper.instance().currPage).toEqual(Const.PAGE_START_INDEX);
    });

    it('should have correct currSizePerPage', () => {
      expect(wrapper.instance().currSizePerPage).toEqual(Const.SIZE_PER_PAGE_LIST[0]);
    });

    it('should render Pagination component correctly', () => {
      expect(wrapper.length).toBe(1);
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
      expect(pagination.prop('paginationTotalRenderer')).toBeNull();
    });

    it('should pass correct cell editing props to children element', () => {
      expect(mockBase.mock.calls[0][0].data).toHaveLength(Const.SIZE_PER_PAGE_LIST[0]);
    });
  });

  describe('componentWillReceiveProps', () => {
    let instance;
    let nextProps;

    describe('when nextProps.pagination.options.page is existing', () => {
      const onPageChange = jest.fn();
      afterEach(() => {
        onPageChange.mockReset();
      });

      describe('and if it is different with currPage', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext());
          instance = wrapper.instance();
          wrapper.render();
          nextProps = {
            data,
            pagination: {
              options: {
                page: 2,
                onPageChange
              }
            }
          };
          instance.componentWillReceiveProps(nextProps);
        });

        it('should call options.onPageChange', () => {
          expect(onPageChange).toHaveBeenCalledTimes(1);
          expect(onPageChange).toHaveBeenCalledWith(
            instance.currPage,
            instance.currSizePerPage
          );
        });

        it('should set correct currPage', () => {
          expect(instance.currPage).toEqual(nextProps.pagination.options.page);
        });
      });

      describe('and if it is same as currPage', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext());
          instance = wrapper.instance();
          wrapper.render();
          nextProps = {
            data,
            pagination: {
              options: {
                page: 1,
                onPageChange
              }
            }
          };
          instance.componentWillReceiveProps(nextProps);
        });

        it('shouldn\'t call options.onPageChange', () => {
          expect(onPageChange).toHaveBeenCalledTimes(0);
        });

        it('should have correct currPage', () => {
          expect(instance.currPage).toEqual(nextProps.pagination.options.page);
        });
      });
    });

    describe('when nextProps.pagination.options.page is not existing', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          page: 3
        }));
        instance = wrapper.instance();
        wrapper.render();
        nextProps = { data, pagination: defaultPagination };
        instance.componentWillReceiveProps(nextProps);
      });

      it('should not set currPage', () => {
        expect(instance.currPage).toEqual(3);
      });
    });

    describe('when nextProps.pagination.options.sizePerPage is existing', () => {
      const onPageChange = jest.fn();
      afterEach(() => {
        onPageChange.mockReset();
      });

      describe('and if it is different with currSizePerPage', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext());
          instance = wrapper.instance();
          wrapper.render();
          nextProps = {
            data,
            pagination: {
              options: {
                sizePerPage: Const.SIZE_PER_PAGE_LIST[2],
                onPageChange
              }
            }
          };
          instance.componentWillReceiveProps(nextProps);
        });

        it('should call options.onPageChange', () => {
          expect(onPageChange).toHaveBeenCalledTimes(1);
          expect(onPageChange).toHaveBeenCalledWith(
            instance.currPage,
            instance.currSizePerPage
          );
        });

        it('should set correct currSizePerPage', () => {
          expect(instance.currSizePerPage).toEqual(nextProps.pagination.options.sizePerPage);
        });
      });

      describe('and if it is same as currSizePerPage', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext());
          instance = wrapper.instance();
          wrapper.render();
          nextProps = {
            data,
            pagination: {
              options: {
                sizePerPage: Const.SIZE_PER_PAGE_LIST[0],
                onPageChange
              }
            }
          };
          instance.componentWillReceiveProps(nextProps);
        });

        it('shouldn\'t  call options.onPageChange', () => {
          expect(onPageChange).toHaveBeenCalledTimes(0);
        });

        it('should have correct currSizePerPage', () => {
          expect(instance.currSizePerPage).toEqual(nextProps.pagination.options.sizePerPage);
        });
      });
    });

    describe('when nextProps.pagination.options.sizePerPage is not existing', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          sizePerPage: Const.SIZE_PER_PAGE_LIST[2]
        }));
        instance = wrapper.instance();
        wrapper.render();
        nextProps = { data, pagination: defaultPagination };
        instance.componentWillReceiveProps(nextProps);
      });

      it('should not set currPage', () => {
        expect(instance.currSizePerPage).toEqual(Const.SIZE_PER_PAGE_LIST[2]);
      });
    });
  });

  describe('handleChangePage', () => {
    let instance;
    const newPage = 3;

    describe('should update component correctly', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangePage(newPage);
      });

      it('', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
      });
    });

    describe('if options.onPageChange is defined', () => {
      const onPageChange = jest.fn();
      beforeEach(() => {
        onPageChange.mockClear();
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          onPageChange
        }));
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangePage(newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
      });

      it('should call options.onPageChange correctly', () => {
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(newPage, instance.currSizePerPage);
      });
    });

    describe('if remote pagination is enable', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination
        }, true));
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangePage(newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(0);
      });

      it('should call handleRemotePageChange correctly', () => {
        expect(handleRemotePaginationChange).toHaveBeenCalledTimes(1);
        expect(handleRemotePaginationChange)
          .toHaveBeenCalledWith(newPage, instance.currSizePerPage);
      });
    });
  });

  describe('handleChangeSizePerPage', () => {
    let instance;
    const newPage = 2;
    const newSizePerPage = 15;

    describe('should update component correctly', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangeSizePerPage(newSizePerPage, newPage);
      });

      it('', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.currSizePerPage).toEqual(newSizePerPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
      });
    });

    describe('if options.onSizePerPageChange is defined', () => {
      const onSizePerPageChange = jest.fn();
      beforeEach(() => {
        onSizePerPageChange.mockClear();
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          onSizePerPageChange
        }));
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangeSizePerPage(newSizePerPage, newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.currSizePerPage).toEqual(newSizePerPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
      });

      it('should call options.onSizePerPageChange correctly', () => {
        expect(onSizePerPageChange).toHaveBeenCalledTimes(1);
        expect(onSizePerPageChange).toHaveBeenCalledWith(newSizePerPage, newPage);
      });
    });

    describe('if remote pagination is enable', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination
        }, true));
        instance = wrapper.instance();
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangeSizePerPage(newSizePerPage, newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.currSizePerPage).toEqual(newSizePerPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(0);
      });

      it('should call handleRemotePageChange correctly', () => {
        expect(handleRemotePaginationChange).toHaveBeenCalledTimes(1);
        expect(handleRemotePaginationChange)
          .toHaveBeenCalledWith(newPage, newSizePerPage);
      });
    });
  });

  describe('when options.page is defined', () => {
    const page = 3;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        page
      }));
      wrapper.render();
    });

    it('should set correct currPage', () => {
      expect(wrapper.instance().currPage).toEqual(page);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('currPage')).toEqual(page);
    });
  });

  describe('when options.sizePerPage is defined', () => {
    const sizePerPage = Const.SIZE_PER_PAGE_LIST[2];

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        sizePerPage
      }));
      wrapper.render();
    });

    it('should set correct currSizePerPage', () => {
      expect(wrapper.instance().currSizePerPage).toEqual(sizePerPage);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('currSizePerPage')).toEqual(sizePerPage);
    });
  });

  describe('when options.totalSize is defined', () => {
    const totalSize = 100;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        totalSize
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('dataSize')).toEqual(totalSize);
    });
  });

  describe('when options.showTotal is defined', () => {
    const showTotal = true;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        showTotal
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('showTotal')).toEqual(showTotal);
    });
  });

  describe('when options.pageStartIndex is defined', () => {
    const pageStartIndex = -1;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        pageStartIndex
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('pageStartIndex')).toEqual(pageStartIndex);
    });
  });

  describe('when options.sizePerPageList is defined', () => {
    const sizePerPageList = [10, 40];

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        sizePerPageList
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('sizePerPageList')).toEqual(sizePerPageList);
    });
  });

  describe('when options.paginationSize is defined', () => {
    const paginationSize = 10;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        paginationSize
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('paginationSize')).toEqual(paginationSize);
    });
  });

  describe('when options.withFirstAndLast is defined', () => {
    const withFirstAndLast = false;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        withFirstAndLast
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('withFirstAndLast')).toEqual(withFirstAndLast);
    });
  });

  describe('when options.alwaysShowAllBtns is defined', () => {
    const alwaysShowAllBtns = true;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        alwaysShowAllBtns
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('alwaysShowAllBtns')).toEqual(alwaysShowAllBtns);
    });
  });

  describe('when options.firstPageText is defined', () => {
    const firstPageText = '1st';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        firstPageText
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageText')).toEqual(firstPageText);
    });
  });

  describe('when options.prePageText is defined', () => {
    const prePageText = 'PRE';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        prePageText
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageText')).toEqual(prePageText);
    });
  });

  describe('when options.nextPageText is defined', () => {
    const nextPageText = 'NEXT';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        nextPageText
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageText')).toEqual(nextPageText);
    });
  });

  describe('when options.lastPageText is defined', () => {
    const lastPageText = 'LAST';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        lastPageText
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageText')).toEqual(lastPageText);
    });
  });

  describe('when options.firstPageTitle is defined', () => {
    const firstPageTitle = '1st';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        firstPageTitle
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageTitle')).toEqual(firstPageTitle);
    });
  });

  describe('when options.prePageTitle is defined', () => {
    const prePageTitle = 'PRE';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        prePageTitle
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageTitle')).toEqual(prePageTitle);
    });
  });

  describe('when options.nextPageTitle is defined', () => {
    const nextPageTitle = 'NEXT';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        nextPageTitle
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageTitle')).toEqual(nextPageTitle);
    });
  });

  describe('when options.lastPageTitle is defined', () => {
    const lastPageTitle = 'nth';

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        lastPageTitle
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageTitle')).toEqual(lastPageTitle);
    });
  });

  describe('when options.hideSizePerPage is defined', () => {
    const hideSizePerPage = true;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        hideSizePerPage
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('hideSizePerPage')).toEqual(hideSizePerPage);
    });
  });

  describe('when options.hidePageListOnlyOnePage is defined', () => {
    const hidePageListOnlyOnePage = true;

    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        hidePageListOnlyOnePage
      }));
      wrapper.render();
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('hidePageListOnlyOnePage')).toEqual(hidePageListOnlyOnePage);
    });
  });
});
