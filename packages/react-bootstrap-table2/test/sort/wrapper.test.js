import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

import Const from '../../src/const';
import Store from '../../src/store/base';
import BootstrapTable from '../../src/bootstrap-table';
import SortWrapper from '../../src/sort/wrapper';

describe('SortWrapper', () => {
  let wrapper;
  let elem;

  const columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true
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

  const keyField = 'id';

  let store = new Store({ data, keyField });

  beforeEach(() => {
    elem = React.createElement(BootstrapTable, { data, columns, keyField, store });
    wrapper = shallow(
      <SortWrapper
        elem={ elem }
        store={ store }
      />
    );
  });

  it('should render SortWrapper correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(BootstrapTable)).toBeDefined();
  });

  it('should inject correct props to elem', () => {
    expect(wrapper.props().onSort).toBeDefined();
  });

  describe('call handleSort function', () => {
    const sortColumn = columns[0];

    beforeEach(() => {
      store = new Store({ data, keyField });
      wrapper = mount(
        <SortWrapper
          elem={ elem }
          store={ store }
        />
      );
      wrapper.instance().handleSort(sortColumn);
    });

    it('should sorting data correctly', () => {
      expect(wrapper.instance().table.state.data[0][keyField]).toEqual(data[1][keyField]);
    });

    it('should operating on store correctly', () => {
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
      expect(store.sortField).toEqual(sortColumn.dataField);

      wrapper.instance().handleSort(sortColumn); // sort same column again
      expect(store.sortOrder).toEqual(Const.SORT_ASC);
      expect(store.sortField).toEqual(sortColumn.dataField);
    });
  });
});
