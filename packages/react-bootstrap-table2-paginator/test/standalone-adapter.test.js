import React from 'react';
import { shallow } from 'enzyme';
import standaloneAdapter from '../src/standalone-adapter';


const MockStandalone = () => null;

const MockStandaloneWithAdapter = standaloneAdapter(MockStandalone);
describe('standaloneAdapter', () => {
  let wrapper;

  const props = {
    page: 2,
    sizePerPage: 10,
    name1: 'A',
    name2: 'B'
  };
  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<MockStandaloneWithAdapter { ...props } />);
    });

    it('should render successfully', () => {
      expect(wrapper.find(MockStandalone)).toHaveLength(1);
    });

    it('should convert props.page as currPage to child component', () => {
      const mockStandalone = wrapper.find(MockStandalone);
      expect(mockStandalone.props().currPage).toEqual(props.page);
    });

    it('should convert props.sizePerPage as currSizePerPage to child component', () => {
      const mockStandalone = wrapper.find(MockStandalone);
      expect(mockStandalone.props().currSizePerPage).toEqual(props.sizePerPage);
    });

    it('should just pass remain props to child component', () => {
      const mockStandalone = wrapper.find(MockStandalone);
      const { page, sizePerPage, ...origin } = props;
      const { currPage, currSizePerPage, ...rest } = mockStandalone.props();
      expect(rest).toEqual(origin);
    });
  });
});
