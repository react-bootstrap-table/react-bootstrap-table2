import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SizePerPageOption from '../src/size-per-page-option';

describe('SizePerPageOption', () => {
  let wrapper;
  const text = 'page1';
  const page = 1;
  const onSizePerPageChange = sinon.stub();

  beforeEach(() => {
    const props = { text, page, onSizePerPageChange };
    wrapper = shallow(
      <SizePerPageOption { ...props } />
    );
  });

  it('should render SizePerPageOption correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.dropdown-item').length).toBe(1);
    expect(wrapper.find(`[data-page=${page}]`).length).toBe(1);
    expect(wrapper.text()).toEqual(text);
  });

  describe('when MouseDown event happen', () => {
    const preventDefault = sinon.stub();
    beforeEach(() => {
      wrapper.find('a').simulate('mousedown', { preventDefault });
    });

    it('should calling props.onSizePerPageChange correctly', () => {
      expect(preventDefault.calledOnce).toBeTruthy();
      expect(onSizePerPageChange.calledOnce).toBeTruthy();
      expect(onSizePerPageChange.calledWith(page)).toBeTruthy();
    });
  });
});
