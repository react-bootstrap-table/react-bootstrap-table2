import React from 'react';
import { shallow, render } from 'enzyme';
import LoadingOverlay from 'react-loading-overlay';

import overlayFactory from '../src';

describe('overlayFactory', () => {
  let wrapper;
  // let instance;

  const createTable = () => (
    <table>
      <thead>
        <tr>
          <th>column1</th>
          <th>column2</th>
        </tr>
      </thead>
      <tbody>
        { [1, 2].map(row => (
          <tr key={ row }><td>{ row }</td><td>test</td></tr>
        ))}
      </tbody>
    </table>
  );

  describe('when loading is false', () => {
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory()(tableElm, false);
      wrapper = shallow(<Overlay />);
    });

    it('should rendering Overlay component correctly', () => {
      const overlay = wrapper.find(LoadingOverlay);
      expect(wrapper.length).toBe(1);
      expect(overlay.length).toBe(1);
      expect(overlay.prop('active')).toBeFalsy();
    });
  });

  describe('when loading is true', () => {
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory()(tableElm, true);
      wrapper = render(<Overlay />);
    });

    it('should rendering Overlay component correctly', () => {
      const overlay = wrapper.find(LoadingOverlay);
      expect(wrapper.length).toBe(1);
      expect(overlay.length).toBe(0);
    });
  });

  describe('when options is given', () => {
    const options = {
      spinner: true,
      background: 'red'
    };
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory(options)(tableElm, false);
      wrapper = shallow(<Overlay />);
    });

    it('should rendering Overlay component with options correctly', () => {
      const overlay = wrapper.find(LoadingOverlay);
      expect(wrapper.length).toBe(1);
      expect(overlay.length).toBe(1);
      expect(overlay.prop('active')).toBeFalsy();
      Object.keys(options).forEach((key) => {
        expect(overlay.prop(key)).toEqual(options[key]);
      });
    });
  });
});
