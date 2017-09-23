import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { TableRowWrapper } from './test-helpers/table-wrapper';
import EditingCell from '../src/editing-cell';
import TextEditor from '../src/text-editor';
import EditorIndicator from '../src/editor-indicator';


describe('EditingCell', () => {
  let wrapper;
  let onEscape;
  let onComplete;
  const row = {
    id: 1,
    name: 'A'
  };

  let column = {
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
    expect(wrapper.state().invalidMessage).toBeNull();
  });

  it('should render TextEditor with correct props', () => {
    const textEditor = wrapper.find(TextEditor);
    expect(textEditor.props().defaultValue).toEqual(row[column.dataField]);
    expect(textEditor.props().onKeyDown).toBeDefined();
    expect(textEditor.props().onBlur).toBeDefined();
    expect(textEditor.props().classNames).toBeNull();
  });

  it('should not render EditorIndicator due to state.invalidMessage is null', () => {
    const indicator = wrapper.find(EditorIndicator);
    expect(indicator.length).toEqual(0);
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

  describe('when column.validator is defined', () => {
    let newValue;
    let validForm;
    let validatorCallBack;

    describe('and column.validator return an object', () => {
      beforeEach(() => {
        newValue = 'newValue';
        validForm = { valid: false, message: 'Something is invalid' };
        validatorCallBack = sinon.stub().returns(validForm);
        column = {
          dataField: 'id',
          text: 'ID',
          validator: validatorCallBack
        };
        wrapper.instance().beforeComplete(row, column, newValue);
      });

      it('should call column.validator successfully', () => {
        expect(validatorCallBack.callCount).toBe(1);
        expect(validatorCallBack.calledWith(newValue, row, column)).toBe(true);
      });

      it('should not call onComplete', () => {
        expect(onComplete.callCount).toBe(0);
      });

      it('should set indicatorTimer successfully', () => {
        expect(wrapper.instance().indicatorTimer).toBeDefined();
      });

      it('should set invalidMessage state correctly', () => {
        expect(wrapper.state().invalidMessage).toEqual(validForm.message);
      });

      it('should render TextEditor with correct shake and animated class', () => {
        const editor = wrapper.find(TextEditor);
        expect(editor.length).toEqual(1);
        expect(editor.props().classNames).toEqual('animated shake');
      });

      it('should render EditorIndicator correctly', () => {
        const indicator = wrapper.find(EditorIndicator);
        expect(indicator.length).toEqual(1);
        expect(indicator.props().invalidMessage).toEqual(validForm.message);
      });
    });

    describe('and column.validator return true or something', () => {
      beforeEach(() => {
        newValue = 'newValue';
        validForm = true;
        validatorCallBack = sinon.stub().returns(validForm);
        column = {
          dataField: 'id',
          text: 'ID',
          validator: validatorCallBack
        };
        wrapper.instance().beforeComplete(row, column, newValue);
      });

      it('should call column.validator successfully', () => {
        expect(validatorCallBack.callCount).toBe(1);
        expect(validatorCallBack.calledWith(newValue, row, column)).toBe(true);
      });

      it('should call onComplete', () => {
        expect(onComplete.callCount).toBe(1);
      });
    });
  });
});
