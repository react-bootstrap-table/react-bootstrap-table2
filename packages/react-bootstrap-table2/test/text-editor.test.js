import React from 'react';
import { shallow } from 'enzyme';

import TextEditor from '../src/text-editor';

describe('TextEditor', () => {
  let wrapper;
  const value = 'test';

  beforeEach(() => {
    wrapper = shallow(
      <TextEditor
        defaultValue={ value }
      />
    );
  });

  it('should render TextEditor correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toEqual('text');
    expect(wrapper.find('.form-control.editor.edit-text').length).toBe(1);
  });
});
