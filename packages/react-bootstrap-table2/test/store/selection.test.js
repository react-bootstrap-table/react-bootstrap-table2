import Store from '../../src/store';
import {
  isSelectedAll,
  isAnySelectedRow,
  selectableKeys,
  unSelectableKeys,
  getSelectedRows
} from '../../src/store/selection';

describe('Selection Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';
  let store;
  let skip;
  let fn;

  beforeEach(() => {
    store = new Store(keyField);
    store.data = data;
  });

  describe('isSelectedAll', () => {
    it('should returning false when store.selected is not cover all rows', () => {
      expect(isSelectedAll(store)).toBeFalsy();
      store.selected = [data[0][keyField]];
      expect(isSelectedAll(store)).toBeFalsy();
    });

    it('should returning true when store.selected is cover all rows', () => {
      store.selected = data.map(d => d[keyField]);
      expect(isSelectedAll(store)).toBeTruthy();
    });
  });

  describe('isAnySelectedRow', () => {
    it('should returning false if any store.selected is empty', () => {
      fn = isAnySelectedRow(store);
      expect(fn()).toBeFalsy();
    });

    it('should returning false if store.selected is have same key as skips', () => {
      fn = isAnySelectedRow(store);
      skip = [data[0][keyField]];
      store.selected = [data[0][keyField]];
      expect(fn(skip)).toBeFalsy();
    });

    it('should returning true if store.selected is not empty', () => {
      store.selected = [data[0][keyField]];
      fn = isAnySelectedRow(store);
      expect(fn()).toBeTruthy();
    });

    it('should returning true if length of store.selected is bigger than skips', () => {
      store.selected = [data[0][keyField], data[2][keyField]];
      skip = [data[0][keyField]];
      fn = isAnySelectedRow(store);
      expect(fn(skip)).toBeTruthy();
    });
  });

  describe('selectableKeys', () => {
    beforeEach(() => {
      fn = selectableKeys(store);
    });

    it('should returning all row keys if skip is empty', () => {
      expect(fn()).toEqual(data.map(d => d[keyField]));
    });

    it('should returngin row keys expect the skip', () => {
      skip = [data[1][keyField]];
      expect(fn(skip)).toHaveLength(data.length - skip.length);
    });
  });

  describe('unSelectableKeys', () => {
    it('should returning empty array if skip is empty', () => {
      fn = unSelectableKeys(store);
      expect(fn()).toHaveLength(0);
    });

    it('should returning array which must contain skip', () => {
      skip = [data[1][keyField]];
      store.selected = data.map(d => d[keyField]);
      fn = unSelectableKeys(store);
      expect(fn(skip)).toHaveLength(skip.length);
    });
  });

  describe('getSelectedRows', () => {
    it('should returning rows object correctly', () => {
      store.selected = data.map(d => d[keyField]);
      const result = getSelectedRows(store);
      expect(result).toHaveLength(store.selected.length);
      expect(result).toEqual(store.data);
    });
  });
});
