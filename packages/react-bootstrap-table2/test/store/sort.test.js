import sinon from 'sinon';

import Store from '../../src/store';
import { sort, nextOrder } from '../../src/store/sort';
import Const from '../../src/const';

describe('Sort Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];

  let store;

  describe('sort', () => {
    beforeEach(() => {
      store = new Store('id');
      store.data = data;
    });

    it('should sort array with ASC order correctly', () => {
      store.sortField = 'id';
      store.sortOrder = Const.SORT_ASC;
      const result = sort(store)();
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map(e => e.id).sort((a, b) => a - b);
      sortedArray.forEach((e, i) => {
        expect(e).toEqual(result[i].id);
      });
    });

    it('should sort array with DESC order correctly', () => {
      store.sortField = 'id';
      store.sortOrder = Const.SORT_DESC;
      const result = sort(store)();
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map(e => e.id).sort((a, b) => b - a);
      sortedArray.forEach((e, i) => {
        expect(e).toEqual(result[i].id);
      });
    });

    it('should call custom sort function when sortFunc given', () => {
      const sortFunc = sinon.stub().returns(1);
      store.sortField = 'id';
      store.sortOrder = Const.SORT_DESC;
      sort(store)(sortFunc);
      expect(sortFunc.callCount).toBe(6);
    });
  });

  describe('nextOrder', () => {
    beforeEach(() => {
      store = new Store('id');
      store.data = data;
    });

    it('should return correcly order when store.sortField is not eq next sort field', () => {
      expect(nextOrder(store)('name')).toBe(Const.SORT_DESC);
    });

    it('should return correcly order when store.sortField is not eq next sort field and default sort direction is given', () => {
      expect(nextOrder(store)('name', undefined, Const.SORT_ASC)).toBe(Const.SORT_ASC);
    });

    it('should return correcly order when store.sortField is eq next sort field', () => {
      store.sortField = 'name';
      store.sortOrder = Const.SORT_DESC;
      expect(nextOrder(store)('name')).toBe(Const.SORT_ASC);
    });

    it('should return correcly order when order is specified', () => {
      expect(nextOrder(store)('name', Const.SORT_ASC)).toBe(Const.SORT_ASC);
    });
  });
});
