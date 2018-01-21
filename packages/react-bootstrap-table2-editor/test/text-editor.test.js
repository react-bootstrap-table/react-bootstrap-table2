import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import TextEditor from '../src/text-editor';

describe('TextEditor', () => {
  let wrapper;
  const value = 'test';

  beforeEach(() => {
    wrapper = mount(
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

  describe('when className prop defined', () => {
    const className = 'test-class';
    beforeEach(() => {
      wrapper = mount(
        <TextEditor
          defaultValue={ value }
          className={ className }
        />
      );
    });

    it('should render correct custom classname', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });
});
