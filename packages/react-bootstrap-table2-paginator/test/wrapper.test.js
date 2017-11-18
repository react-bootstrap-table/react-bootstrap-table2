import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';


import BootstrapTable from 'react-bootstrap-table2/src/bootstrap-table';
import Store from 'react-bootstrap-table2/src/store/base';
import paginator from '../src';
import wrapperFactory from '../src/wrapper';
import Pagination from '../src/pagination';

const getConst = () => ({
  PAGINATION_SIZE: 5,
  PAGE_START_INDEX: 1,
  With_FIRST_AND_LAST: true,
  SHOW_ALL_PAGE_BTNS: false,
  FIRST_PAGE_TEXT: '<<',
  PRE_PAGE_TEXT: '<',
  NEXT_PAGE_TEXT: '>',
  LAST_PAGE_TEXT: '>>',
  SIZE_PER_PAGE_LIST: [10, 25, 30, 50],
  NEXT_PAGE_TITLE: 'next page',
  LAST_PAGE_TITLE: 'last page',
  PRE_PAGE_TITLE: 'previous page',
  FIRST_PAGE_TITLE: 'first page'
});

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`
  });
}

describe('Wrapper', () => {
  let PaginationWrapper;
  let wrapper;
  let instance;

  const constants = getConst();
  const createTableProps = props => ({
    keyField: 'id',
    columns: [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }],
    data,
    pagination: paginator,
    store: new Store({ data }),
    ...props
  });

  const pureTable = props => (<BootstrapTable { ...props } />);

  describe('default pagination', () => {
    const props = createTableProps();

    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering correctly', () => {
      expect(wrapper.length).toBe(1);
    });

    it('should initializing state correctly', () => {
      expect(instance.state.currPage).toBeDefined();
      expect(instance.state.currPage).toEqual(constants.PAGE_START_INDEX);
      expect(instance.state.currSizePerPage).toBeDefined();
      expect(instance.state.currSizePerPage).toEqual(constants.SIZE_PER_PAGE_LIST[0]);
    });

    it('should rendering BootstraTable correctly', () => {
      const table = wrapper.find(BootstrapTable);
      expect(table.length).toBe(1);
      expect(table.prop('data').length).toEqual(instance.state.currSizePerPage);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('dataSize')).toEqual(props.store.getDataSize());
      expect(pagination.prop('currPage')).toEqual(instance.state.currPage);
      expect(pagination.prop('currSizePerPage')).toEqual(instance.state.currSizePerPage);
      expect(pagination.prop('onPageChange')).toEqual(instance.handleChangePage);
      expect(pagination.prop('onSizePerPageChange')).toEqual(instance.handleChangeSizePerPage);
      expect(pagination.prop('sizePerPageList')).toEqual(constants.SIZE_PER_PAGE_LIST);
      expect(pagination.prop('paginationSize')).toEqual(constants.PAGINATION_SIZE);
      expect(pagination.prop('pageStartIndex')).toEqual(constants.PAGE_START_INDEX);
      expect(pagination.prop('withFirstAndLast')).toEqual(constants.With_FIRST_AND_LAST);
      expect(pagination.prop('alwaysShowAllBtns')).toEqual(constants.SHOW_ALL_PAGE_BTNS);
      expect(pagination.prop('firstPageText')).toEqual(constants.FIRST_PAGE_TEXT);
      expect(pagination.prop('prePageText')).toEqual(constants.PRE_PAGE_TEXT);
      expect(pagination.prop('nextPageText')).toEqual(constants.NEXT_PAGE_TEXT);
      expect(pagination.prop('lastPageText')).toEqual(constants.LAST_PAGE_TEXT);
      expect(pagination.prop('firstPageTitle')).toEqual(constants.FIRST_PAGE_TITLE);
      expect(pagination.prop('prePageTitle')).toEqual(constants.PRE_PAGE_TITLE);
      expect(pagination.prop('nextPageTitle')).toEqual(constants.NEXT_PAGE_TITLE);
      expect(pagination.prop('lastPageTitle')).toEqual(constants.LAST_PAGE_TITLE);
    });
  });

  describe('when options.pageStartIndex is defined', () => {
    const props = createTableProps({ options: { pageStartIndex: -1 } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should setting correct state.currPage', () => {
      expect(instance.state.currPage).toEqual(props.options.pageStartIndex);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('pageStartIndex')).toEqual(props.options.pageStartIndex);
    });
  });

  describe('when options.sizePerPageList is defined', () => {
    const props = createTableProps({ options: { sizePerPageList: [10, 40] } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('sizePerPageList')).toEqual(props.options.sizePerPageList);
    });
  });

  describe('when options.paginationSize is defined', () => {
    const props = createTableProps({ options: { paginationSize: 10 } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('paginationSize')).toEqual(props.options.paginationSize);
    });
  });

  describe('when options.withFirstAndLast is defined', () => {
    const props = createTableProps({ options: { withFirstAndLast: false } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('withFirstAndLast')).toEqual(props.options.withFirstAndLast);
    });
  });

  describe('when options.alwaysShowAllBtns is defined', () => {
    const props = createTableProps({ options: { alwaysShowAllBtns: true } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('alwaysShowAllBtns')).toEqual(props.options.alwaysShowAllBtns);
    });
  });

  describe('when options.firstPageText is defined', () => {
    const props = createTableProps({ options: { firstPageText: '1st' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageText')).toEqual(props.options.firstPageText);
    });
  });

  describe('when options.prePageText is defined', () => {
    const props = createTableProps({ options: { prePageText: 'PRE' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageText')).toEqual(props.options.prePageText);
    });
  });

  describe('when options.nextPageText is defined', () => {
    const props = createTableProps({ options: { nextPageText: 'NEXT' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageText')).toEqual(props.options.nextPageText);
    });
  });

  describe('when options.lastPageText is defined', () => {
    const props = createTableProps({ options: { lastPageText: 'nth' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageText')).toEqual(props.options.lastPageText);
    });
  });

  describe('when options.firstPageTitle is defined', () => {
    const props = createTableProps({ options: { firstPageTitle: '1st' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('firstPageTitle')).toEqual(props.options.firstPageTitle);
    });
  });

  describe('when options.prePageTitle is defined', () => {
    const props = createTableProps({ options: { prePageTitle: 'PRE' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('prePageTitle')).toEqual(props.options.prePageTitle);
    });
  });

  describe('when options.nextPageTitle is defined', () => {
    const props = createTableProps({ options: { nextPageTitle: 'NEXT' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('nextPageTitle')).toEqual(props.options.nextPageTitle);
    });
  });

  describe('when options.lastPageTitle is defined', () => {
    const props = createTableProps({ options: { lastPageTitle: 'nth' } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    });

    it('should rendering Pagination correctly', () => {
      const pagination = wrapper.find(Pagination);
      expect(wrapper.length).toBe(1);
      expect(pagination.length).toBe(1);
      expect(pagination.prop('lastPageTitle')).toEqual(props.options.lastPageTitle);
    });
  });

  describe('handleChangePage', () => {
    const newPage = 3;
    const props = createTableProps({ options: { onPageChange: sinon.stub() } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      instance.handleChangePage(newPage);
    });

    afterEach(() => {
      props.options.onPageChange.reset();
    });

    it('should setting state.currPage correctly', () => {
      expect(instance.state.currPage).toEqual(newPage);
    });

    it('should calling options.onPageChange correctly when it is defined', () => {
      const { onPageChange } = props.options;
      expect(onPageChange.calledOnce).toBeTruthy();
      expect(onPageChange.calledWith(newPage, instance.state.currSizePerPage)).toBeTruthy();
    });
  });

  describe('handleChangeSizePerPage', () => {
    const newPage = 2;
    const newSizePerPage = 30;
    const props = createTableProps({ options: { onSizePerPageChange: sinon.stub() } });
    beforeEach(() => {
      PaginationWrapper = wrapperFactory(pureTable, constants);
      wrapper = shallow(<PaginationWrapper { ...props } />);
      instance = wrapper.instance();
      instance.handleChangeSizePerPage(newSizePerPage, newPage);
    });

    afterEach(() => {
      props.options.onSizePerPageChange.reset();
    });

    it('should setting state.currPage and state.currSizePerPage correctly', () => {
      expect(instance.state.currPage).toEqual(newPage);
      expect(instance.state.currSizePerPage).toEqual(newSizePerPage);
    });

    it('should calling options.onSizePerPageChange correctly when it is defined', () => {
      const { onSizePerPageChange } = props.options;
      expect(onSizePerPageChange.calledOnce).toBeTruthy();
      expect(onSizePerPageChange.calledWith(newSizePerPage, newPage)).toBeTruthy();
    });
  });
});
