import React from 'react';
import { shallow } from 'enzyme';
import paginationTotalAdapter from '../src/pagination-total-adapter';


const MockComponent = () => null;

const PaginationTotalAdapter = paginationTotalAdapter(MockComponent);

describe('paginationTotalAdapter', () => {
  let wrapper;

  const props = {
    dataSize: 20,
    currPage: 1,
    currSizePerPage: 10,
    paginationTotalRenderer: jest.fn()
  };

  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<PaginationTotalAdapter { ...props } />);
    });

    it('should render successfully', () => {
      const mockComponent = wrapper.find(MockComponent);
      expect(mockComponent).toHaveLength(1);
      expect(mockComponent.props().from).toBeDefined();
      expect(mockComponent.props().to).toBeDefined();
      expect(mockComponent.props().dataSize).toEqual(props.dataSize);
      expect(mockComponent.props().paginationTotalRenderer).toEqual(props.paginationTotalRenderer);
    });
  });
});
