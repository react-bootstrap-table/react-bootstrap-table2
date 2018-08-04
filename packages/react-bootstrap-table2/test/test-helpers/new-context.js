import { shallow } from 'enzyme';

export const shallowWithContext = (elem, context = {}) => {
  const wrapper = shallow(elem);
  const Children = wrapper.props().children(context);
  return shallow(Children);
};
