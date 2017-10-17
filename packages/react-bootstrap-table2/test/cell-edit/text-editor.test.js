import React from 'react';
import { shallow } from 'enzyme';

import TextEditor from '../../src/cell-edit/text-editor';

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

  describe('whenclassNames prop defined', () => {
    const className = 'test-class';
    beforeEach(() => {
      wrapper = shallow(
        <TextEditor
          defaultValue={ value }
          classNames={ className }
        />
      );
    });

    it('should render correct custom classname', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });
});
