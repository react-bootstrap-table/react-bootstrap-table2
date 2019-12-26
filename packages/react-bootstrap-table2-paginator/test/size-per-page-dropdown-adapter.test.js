import React from 'react';
import { shallow } from 'enzyme';
import sizePerPageDropdownAdapter from '../src/size-per-page-dropdown-adapter';


const MockComponent = () => null;

const SizePerPageDropdownAdapter = sizePerPageDropdownAdapter(MockComponent);
describe('sizePerPageDropdownAdapter', () => {
  let wrapper;
  let instance;

  const createMockProps = props => ({
    dataSize: 100,
    sizePerPageList: [10, 20, 30, 50],
    currPage: 1,
    currSizePerPage: 10,
    alwaysShowAllBtns: false,
    onSizePerPageChange: jest.fn(),
    hidePageListOnlyOnePage: false,
    hideSizePerPage: false,
    optionRenderer: jest.fn(),
    sizePerPageOptionRenderer: jest.fn(),
    ...props
  });

  describe('render', () => {
    const props = createMockProps();
    beforeEach(() => {
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should render successfully', () => {
      const mockComponent = wrapper.find(MockComponent);
      expect(mockComponent).toHaveLength(1);

      expect(mockComponent.props().currSizePerPage).toEqual(`${props.currSizePerPage}`);
      expect(mockComponent.props().options).toBeDefined();
      expect(mockComponent.props().optionRenderer).toBeDefined();
      expect(mockComponent.props().onSizePerPageChange).toEqual(instance.handleChangeSizePerPage);
      expect(mockComponent.props().onClick).toEqual(instance.toggleDropDown);
      expect(mockComponent.props().onBlur).toEqual(instance.closeDropDown);
      expect(mockComponent.props().open).toEqual(instance.state.dropdownOpen);
    });
  });

  describe('when props.sizePerPageList is empty array', () => {
    beforeEach(() => {
      const props = createMockProps({ sizePerPageList: [] });
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should not render component', () => {
      const sizePerPageDropDown = wrapper.find(MockComponent);
      expect(sizePerPageDropDown.length).toBe(0);
    });
  });

  describe('when props.hideSizePerPage is true', () => {
    beforeEach(() => {
      const props = createMockProps({ hideSizePerPage: true });
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should not rendering SizePerPageDropDown component', () => {
      const sizePerPageDropDown = wrapper.find(MockComponent);
      expect(sizePerPageDropDown.length).toBe(0);
    });
  });

  describe('toggleDropDown', () => {
    beforeEach(() => {
      const props = createMockProps();
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should set state.dropdownOpen as true when it is false', () => {
      instance.toggleDropDown();
      expect(instance.state.dropdownOpen).toBeTruthy();
    });

    it('should set state.dropdownOpen as false when it is true', () => {
      instance.toggleDropDown();
      instance.toggleDropDown();
      expect(instance.state.dropdownOpen).toBeFalsy();
    });
  });

  describe('closeDropDown', () => {
    beforeEach(() => {
      const props = createMockProps();
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should always set state.dropdownOpen as false', () => {
      instance.closeDropDown();
      expect(instance.state.dropdownOpen).toBeFalsy();
      instance.closeDropDown();
      expect(instance.state.dropdownOpen).toBeFalsy();
    });
  });

  describe('handleChangeSizePerPage', () => {
    let props;
    const sizePerPage = 25;
    beforeEach(() => {
      props = createMockProps();
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
      instance.handleChangeSizePerPage(sizePerPage);
    });

    it('should call props.onSizePerPageChange correctly', () => {
      expect(props.onSizePerPageChange).toHaveBeenCalledTimes(1);
      expect(props.onSizePerPageChange).toHaveBeenCalledWith(sizePerPage);
    });

    it('should always set state.dropdownOpen as false', () => {
      expect(instance.state.dropdownOpen).toBeFalsy();
    });
  });

  describe('when props.sizePerPageRenderer is defined', () => {
    const sizePerPageRenderer = jest.fn().mockReturnValue(null);

    beforeEach(() => {
      sizePerPageRenderer.mockClear();
      const props = createMockProps({ sizePerPageRenderer });
      wrapper = shallow(<SizePerPageDropdownAdapter { ...props } />);
      instance = wrapper.instance();
    });

    it('should not render default component', () => {
      expect(wrapper.find(MockComponent)).toHaveLength(0);
    });

    it('should call props.sizePerPageRenderer correctly', () => {
      expect(sizePerPageRenderer).toHaveBeenCalledTimes(1);
    });
  });
});
