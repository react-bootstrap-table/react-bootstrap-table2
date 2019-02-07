/* eslint no-param-reassign: 0 */
import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Const from '../src/const';
import createStateContext from '../src/state-context';
import paginationFactory from '../index';

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`
  });
}

describe('PaginationStateContext', () => {
  let wrapper;
  let remoteEmitter;
  let PaginationStateContext;

  const defaultPagination = { options: {}, createContext: jest.fn() };

  const MockComponent = () => null;
  const renderMockComponent = jest.fn((props => (
    <MockComponent { ...props } />
  )));

  const handleRemotePaginationChange = jest.fn();

  function shallowContext(
    customPagination = defaultPagination
  ) {
    const additionProps = {};
    renderMockComponent.mockReset();
    handleRemotePaginationChange.mockReset();
    PaginationStateContext = createStateContext();

    return (
      <PaginationStateContext.Provider
        pagination={ paginationFactory(customPagination) }
        data={ data }
        { ...additionProps }
      >
        <PaginationStateContext.Consumer>
          {
            paginationProps => renderMockComponent(paginationProps)
          }
        </PaginationStateContext.Consumer>
      </PaginationStateContext.Provider>
    );
  }

  function setRemotePaginationEmitter(
    instance,
    remoteEnabled = false
  ) {
    remoteEmitter = { emit: jest.fn() };
    if (remoteEnabled) {
      remoteEmitter.emit = jest.fn().mockImplementation((evtName, d = {}) => {
        if (evtName === 'isRemotePagination') {
          d.result = remoteEnabled;
        }
      });
    }
    instance.setPaginationRemoteEmitter(remoteEmitter);
  }

  describe('default render', () => {
    const options = { totalSize: data.length };

    beforeEach(() => {
      wrapper = shallow(shallowContext(options));
      wrapper.render();
    });

    it('should have correct Provider property after calling createPaginationStateContext', () => {
      expect(PaginationStateContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createPaginationStateContext', () => {
      expect(PaginationStateContext.Consumer).toBeDefined();
    });

    it('should have correct currPage', () => {
      expect(wrapper.instance().currPage).toEqual(Const.PAGE_START_INDEX);
    });

    it('should have correct currSizePerPage', () => {
      expect(wrapper.instance().currSizePerPage).toEqual(Const.SIZE_PER_PAGE_LIST[0]);
    });

    it('should have correct dataSize', () => {
      expect(wrapper.instance().dataSize).toEqual(options.totalSize);
    });

    it('should get correct pagination props', () => {
      const instance = wrapper.instance();
      expect(wrapper.length).toBe(1);
      expect(renderMockComponent).toHaveBeenCalledTimes(1);
      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
    });

    it('should return correct pagination states from getPaginationProps function', () => {
      const instance = wrapper.instance();
      const paginationProps = instance.getPaginationProps();

      expect(paginationProps.dataSize).toEqual(data.length);
      expect(paginationProps.page).toEqual(instance.currPage);
      expect(paginationProps.sizePerPage).toEqual(instance.currSizePerPage);
      expect(paginationProps.onPageChange).toEqual(instance.handleChangePage);
      expect(paginationProps.onSizePerPageChange).toEqual(instance.handleChangeSizePerPage);
      expect(paginationProps.sizePerPageList).toEqual(Const.SIZE_PER_PAGE_LIST);
      expect(paginationProps.paginationSize).toEqual(Const.PAGINATION_SIZE);
      expect(paginationProps.showTotal).toEqual(options.showTotal);
      expect(paginationProps.hidePageListOnlyOnePage).toEqual(Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE);
      expect(paginationProps.pageStartIndex).toEqual(Const.PAGE_START_INDEX);
      expect(paginationProps.withFirstAndLast).toEqual(Const.With_FIRST_AND_LAST);
      expect(paginationProps.alwaysShowAllBtns).toEqual(Const.SHOW_ALL_PAGE_BTNS);
      expect(paginationProps.firstPageText).toEqual(Const.FIRST_PAGE_TEXT);
      expect(paginationProps.prePageText).toEqual(Const.PRE_PAGE_TEXT);
      expect(paginationProps.nextPageText).toEqual(Const.NEXT_PAGE_TEXT);
      expect(paginationProps.lastPageText).toEqual(Const.LAST_PAGE_TEXT);
      expect(paginationProps.firstPageTitle).toEqual(Const.FIRST_PAGE_TITLE);
      expect(paginationProps.prePageTitle).toEqual(Const.PRE_PAGE_TITLE);
      expect(paginationProps.nextPageTitle).toEqual(Const.NEXT_PAGE_TITLE);
      expect(paginationProps.lastPageTitle).toEqual(Const.LAST_PAGE_TITLE);
      expect(paginationProps.hideSizePerPage).toEqual(Const.HIDE_SIZE_PER_PAGE);
      expect(paginationProps.paginationTotalRenderer).toEqual(options.paginationTotalRenderer);
    });
  });

  describe('compoientWillReceiveProps', () => {
    let instance;
    let nextProps;

    describe('if remote pagination is enable', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination
        }, true));
        instance = wrapper.instance();
        setRemotePaginationEmitter(instance, true);
        nextProps = {
          data,
          pagination: { ...defaultPagination, options: { page: 3, sizePerPage: 5 } }
        };
        instance.componentWillReceiveProps(nextProps);
      });

      it('should always reset currPage and currSizePerPage', () => {
        expect(instance.currPage).toEqual(nextProps.pagination.options.page);
        expect(instance.currSizePerPage).toEqual(nextProps.pagination.options.sizePerPage);
      });
    });

    describe('if options.custom is true', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultPagination,
          custom: true
        }, true));
        instance = wrapper.instance();
        setRemotePaginationEmitter(instance, true);
        nextProps = {
          data,
          pagination: { ...defaultPagination, options: { page: 3, sizePerPage: 5, custom: true } }
        };
        instance.componentWillReceiveProps(nextProps);
      });

      it('should always reset currPage and currSizePerPage', () => {
        expect(instance.currPage).toEqual(nextProps.pagination.options.page);
        expect(instance.currSizePerPage).toEqual(nextProps.pagination.options.sizePerPage);
      });
    });
  });

  describe('handleDataSizeChange', () => {
    let instance;
    const newTotalSize = 8;
    beforeEach(() => {
      wrapper = shallow(shallowContext({
        ...defaultPagination,
        page: 3
      }));
      instance = wrapper.instance();
      setRemotePaginationEmitter(instance);
      jest.spyOn(instance, 'forceUpdate');
      instance.handleDataSizeChange(newTotalSize);
    });

    it('should update dataSize correctly', () => {
      expect(instance.dataSize).toEqual(newTotalSize);
      expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
    });

    it('should update currPage correctly if page list shrink', () => {
      expect(instance.currPage).toEqual(Const.PAGE_START_INDEX);
      expect(instance.forceUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleChangePage', () => {
    let instance;
    const newPage = 3;

    describe('should update component correctly', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        instance = wrapper.instance();
        setRemotePaginationEmitter(instance);
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
        setRemotePaginationEmitter(instance);
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
        setRemotePaginationEmitter(instance, true);
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangePage(newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(0);
      });

      it('should emit paginationChange event correctly', () => {
        expect(remoteEmitter.emit).toHaveBeenLastCalledWith('paginationChange', instance.currPage, instance.currSizePerPage);
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
        setRemotePaginationEmitter(instance);
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
        setRemotePaginationEmitter(instance);
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
        setRemotePaginationEmitter(instance, true);
        jest.spyOn(instance, 'forceUpdate');
        instance.handleChangeSizePerPage(newSizePerPage, newPage);
      });

      it('should still update component correctly', () => {
        expect(instance.currPage).toEqual(newPage);
        expect(instance.currSizePerPage).toEqual(newSizePerPage);
        expect(instance.forceUpdate).toHaveBeenCalledTimes(0);
      });

      it('should emit paginationChange event correctly', () => {
        expect(remoteEmitter.emit).toHaveBeenLastCalledWith('paginationChange', instance.currPage, instance.currSizePerPage);
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
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

    it('should render correctly', () => {
      const instance = wrapper.instance();

      expect(renderMockComponent).toHaveBeenCalledWith({
        paginationProps: instance.getPaginationProps(),
        paginationTableProps: {
          pagination: {
            createContext: expect.any(Function),
            options: instance.getPaginationProps()
          },
          setPaginationRemoteEmitter: instance.setPaginationRemoteEmitter,
          dataChangeListener: instance.filterListener
        }
      });
    });
  });
});
