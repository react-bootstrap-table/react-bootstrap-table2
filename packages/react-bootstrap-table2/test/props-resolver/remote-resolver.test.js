/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Container from '../../index';
// import remoteResolver from '../../src/props-resolver/remote-resolver';

describe('remoteResolver', () => {
  let wrapper;

  const keyField = 'id';

  const columns = [{
    dataField: keyField,
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const shallowContainer = (props) => {
    wrapper = shallow(
      <Container
        keyField={ keyField }
        data={ data }
        columns={ columns }
        { ...props }
      />
    );
  };

  describe('isRemotePagination', () => {
    describe('when remote is false', () => {
      beforeEach(() => {
        shallowContainer();
      });

      it('should return false', () => {
        expect(wrapper.instance().isRemotePagination()).toBeFalsy();
      });
    });

    describe('when remote is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemotePagination()).toBeTruthy();
      });
    });

    describe('when remote.pagination is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemotePagination()).toBeTruthy();
      });
    });
  });

  describe('isRemoteFiltering', () => {
    describe('when remote is false', () => {
      beforeEach(() => {
        shallowContainer();
      });

      it('should return false', () => {
        expect(wrapper.instance().isRemoteFiltering()).toBeFalsy();
      });
    });

    describe('when remote is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });

    describe('when remote.filter is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { filter: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });

    describe('when this.isRemotePagination return true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });
  });

  describe('isRemoteSort', () => {
    describe('when remote is false', () => {
      beforeEach(() => {
        shallowContainer();
      });

      it('should return false', () => {
        expect(wrapper.instance().isRemoteSort()).toBeFalsy();
      });
    });

    describe('when remote is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });

    describe('when remote.sort is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { sort: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });

    describe('when this.isRemotePagination return true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });
  });

  describe('isRemoteCellEdit', () => {
    describe('when remote is false', () => {
      beforeEach(() => {
        shallowContainer();
      });

      it('should return false', () => {
        expect(wrapper.instance().isRemoteCellEdit()).toBeFalsy();
      });
    });

    describe('when remote is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteCellEdit()).toBeTruthy();
      });
    });

    describe('when remote.cellEdit is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { cellEdit: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteCellEdit()).toBeTruthy();
      });
    });
  });

  describe('isRemoteSearch', () => {
    describe('when remote is false', () => {
      beforeEach(() => {
        shallowContainer();
      });

      it('should return false', () => {
        expect(wrapper.instance().isRemoteSearch()).toBeFalsy();
      });
    });

    describe('when remote is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });

    describe('when remote.search is true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { search: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });

    describe('when this.isRemotePagination return true', () => {
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      it('should return true', () => {
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });
  });

  describe('handleRemoteCellChange', () => {
    const onTableChangeCB = sinon.stub();
    const rowId = 1;
    const dataField = 'name';
    const newValue = 'test';

    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemoteCellChange(rowId, dataField, newValue);
    });

    it('should calling props.onTableChange correctly', () => {
      const cellEdit = { rowId, dataField, newValue };
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith(
        'cellEdit', wrapper.instance().getNewestState({ cellEdit }))).toBeTruthy();
    });
  });

  describe('handleSortChange', () => {
    const onTableChangeCB = sinon.stub();
    const newSortFiled = 'name';
    const newSortOrder = 'asc';
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemoteSortChange(newSortFiled, newSortOrder);
    });

    it('should calling props.onTableChange correctly', () => {
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith('sort', wrapper.instance().getNewestState({
        sortField: newSortFiled,
        sortOrder: newSortOrder
      }))).toBeTruthy();
    });
  });

  describe('handleRemotePageChange', () => {
    const onTableChangeCB = sinon.stub();
    const newPage = 2;
    const newSizePerPage = 10;
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemotePageChange(newPage, newSizePerPage);
    });

    it('should calling props.onTableChange correctly', () => {
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith('pagination', wrapper.instance().getNewestState({
        page: newPage,
        sizePerPage: newSizePerPage
      }))).toBeTruthy();
    });
  });

  describe('handleRemoteSearchChange', () => {
    const onTableChangeCB = sinon.stub();
    const searchText = 'abc';

    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({
        onTableChange: onTableChangeCB
      });
      wrapper.instance().handleRemoteSearchChange(searchText);
    });

    it('should calling props.onTableChange correctly', () => {
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith('search', wrapper.instance().getNewestState({
        searchText
      }))).toBeTruthy();
    });
  });

  describe('handleRemoteFilterChange', () => {
    const onTableChangeCB = sinon.stub();
    const filters = { price: { filterVal: 20, filterType: 'TEXT' } };
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
    });

    describe('when remote pagination is disabled', () => {
      it('should calling props.onTableChange correctly', () => {
        wrapper.instance().handleRemoteFilterChange(filters);
        expect(onTableChangeCB.calledOnce).toBeTruthy();
        expect(onTableChangeCB.calledWith('filter', wrapper.instance().getNewestState({
          filters
        }))).toBeTruthy();
      });
    });

    describe('when remote pagination is enabled', () => {
      const createContext = () => {};

      describe('and pagination.options.pageStartIndex is defined', () => {
        const options = { pageStartIndex: 0 };
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { options, createContext }
          });
          wrapper.instance().handleRemoteFilterChange(filters);
        });

        it('should calling onTableChange with page property by pageStartIndex', () => {
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState({
            filters
          });
          newState.page = options.pageStartIndex;
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });

      describe('and pagination.options.pageStartIndex is not defined', () => {
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { createContext }
          });
          wrapper.instance().handleRemoteFilterChange(filters);
        });

        it('should calling onTableChange with page property by default 1', () => {
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState({ filters });
          newState.page = 1;
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });
    });
  });
});
