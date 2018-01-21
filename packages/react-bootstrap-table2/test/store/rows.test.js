import Store from '../../src/store';
import { getRowByRowId } from '../../src/store/rows';

describe('Rows Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';
  let store;
  let fn;

  beforeEach(() => {
    store = new Store(keyField);
    store.data = data;
    fn = getRowByRowId(store);
  });

  describe('getRowByRowId', () => {
    it('should returning correct row', () => {
      expect(fn(2)).toEqual(data[1]);
    });

    it('should returning undefined if not existing', () => {
      expect(fn(20)).not.toBeDefined();
    });
  });
});
