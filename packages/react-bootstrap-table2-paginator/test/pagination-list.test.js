import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import PageButton from '../src/page-button';
import PaginationList from '../src/pagination-list';

describe('PaginationList', () => {
  let wrapper;
  const onPageChange = sinon.stub();
  const pages = [{
    page: 1,
    active: false,
    disabled: false,
    title: '1'
  }, {
    page: 2,
    active: true,
    disabled: false,
    title: '2'
  }, {
    page: 3,
    active: false,
    disabled: false,
    title: '3'
  }];

  beforeEach(() => {
    wrapper = shallow(
      <PaginationList
        pages={ pages }
        onPageChange={ onPageChange }
      />
    );
  });

  it('should rendering PaginatonList correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('ul.react-bootstrap-table-page-btns-ul').length).toBe(1);
    expect(wrapper.find(PageButton).length).toBe(pages.length);
  });
});
