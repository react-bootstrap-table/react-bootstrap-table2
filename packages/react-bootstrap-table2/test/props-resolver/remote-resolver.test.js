/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Container from '../../';
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

  describe('handleCellChange', () => {
    const onTableChangeCB = sinon.stub();
    const rowId = 1;
    const dataField = 'name';
    const newValue = 'test';

    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleCellChange(rowId, dataField, newValue);
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
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleSortChange();
    });

    it('should calling props.onTableChange correctly', () => {
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith('sort', wrapper.instance().getNewestState())).toBeTruthy();
    });
  });

  describe('handleRemotePageChange', () => {
    const onTableChangeCB = sinon.stub();
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemotePageChange();
    });

    it('should calling props.onTableChange correctly', () => {
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      expect(onTableChangeCB.calledWith('pagination', wrapper.instance().getNewestState())).toBeTruthy();
    });
  });

  describe('handleRemoteFilterChange', () => {
    const onTableChangeCB = sinon.stub();

    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
    });

    describe('when remote pagination is disabled', () => {
      it('should calling props.onTableChange correctly', () => {
        wrapper.instance().handleRemoteFilterChange();
        expect(onTableChangeCB.calledOnce).toBeTruthy();
        expect(onTableChangeCB.calledWith('filter', wrapper.instance().getNewestState())).toBeTruthy();
      });
    });

    describe('when remote pagination is enabled', () => {
      const wrapperFactory = Base => class FilterWrapper extends React.Component {
        render() { return <Base { ...this.props } />; }
      };

      describe('and pagination.options.pageStartIndex is defined', () => {
        const options = { pageStartIndex: 0 };
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { options, wrapperFactory }
          });
          wrapper.instance().store.page = 1;
          wrapper.instance().store.sizePerPage = 10;
          wrapper.instance().handleRemoteFilterChange();
        });

        it('should calling onTableChange correctly', () => {
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState();
          newState.page = options.pageStartIndex;
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });

      describe('and pagination.options.pageStartIndex is not defined', () => {
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { wrapperFactory }
          });
          wrapper.instance().handleRemoteFilterChange();
        });

        it('should calling onTableChange correctly', () => {
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState();
          newState.page = 1;
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });
    });
  });
});
