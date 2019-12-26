import React from 'react';
import { shallow } from 'enzyme';
import paginationListAdapter from '../src/pagination-list-adapter';


const MockComponent = () => null;

const PaginationListAdapter = paginationListAdapter(MockComponent);
describe('paginationListAdapter', () => {
  let wrapper;

  const props = {
    totalPages: 10,
    lastPage: 10,
    pageButtonRenderer: jest.fn(),
    onPageChange: jest.fn()
  };

  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<PaginationListAdapter { ...props } />);
    });

    it('should render successfully', () => {
      const mockComponent = wrapper.find(MockComponent);
      expect(mockComponent).toHaveLength(1);
      expect(mockComponent.props().pages).toBeDefined();
      expect(mockComponent.props().pageButtonRenderer).toBeDefined();
      expect(mockComponent.props().onPageChange).toBeDefined();
    });
  });
});
