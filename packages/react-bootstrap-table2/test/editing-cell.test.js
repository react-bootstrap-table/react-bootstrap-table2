import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { TableRowWrapper } from './test-helpers/table-wrapper';
import EditingCell from '../src/editing-cell';
import TextEditor from '../src/text-editor';


describe('EditingCell', () => {
  let wrapper;
  let onEscape;
  let onComplete;
  const row = {
    id: 1,
    name: 'A'
  };

  const column = {
    dataField: 'id',
    text: 'ID'
  };

  beforeEach(() => {
    onComplete = sinon.stub();
    onEscape = sinon.stub();
    wrapper = shallow(
      <EditingCell
        row={ row }
        column={ column }
        onEscape={ onEscape }
        onComplete={ onComplete }
      />
    );
  });

  it('should render default editor successfully', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('td').length).toBe(1);
    expect(wrapper.find(TextEditor).length).toBe(1);
  });

  it('should render TextEditor with correct props', () => {
    const textEditor = wrapper.find(TextEditor);
    expect(textEditor.props().defaultValue).toEqual(row[column.dataField]);
    expect(textEditor.props().onKeyDown).toBeDefined();
    expect(textEditor.props().onBlur).toBeDefined();
  });

  it('when press ENTER on TextEditor should call onComplete correctly', () => {
    const newValue = 'test';
    const textEditor = wrapper.find(TextEditor);
    textEditor.simulate('keyDown', { keyCode: 13, currentTarget: { value: newValue } });
    expect(onComplete.callCount).toBe(1);
    expect(onComplete.calledWith(row, column, newValue)).toBe(true);
  });

  it('when press ESC on TextEditor should call onEscape correctly', () => {
    const textEditor = wrapper.find(TextEditor);
    textEditor.simulate('keyDown', { keyCode: 27 });
    expect(onEscape.callCount).toBe(1);
  });

  it('when blur from TextEditor should call onEscape correctly', () => {
    const textEditor = wrapper.find(TextEditor);
    textEditor.simulate('blur');
    expect(onEscape.callCount).toBe(1);
  });

  describe('if blurToSave prop is true', () => {
    beforeEach(() => {
      wrapper = mount(
        <TableRowWrapper>
          <EditingCell
            row={ row }
            column={ column }
            onEscape={ onEscape }
            onComplete={ onComplete }
            blurToSave
          />
        </TableRowWrapper>
      );
    });

    it('when blur from TextEditor should call onComplete correctly', () => {
      const textEditor = wrapper.find(TextEditor);
      textEditor.simulate('blur');
      expect(onComplete.callCount).toBe(1);
      expect(onComplete.calledWith(row, column, `${row[column.dataField]}`)).toBe(true);
    });
  });
});
