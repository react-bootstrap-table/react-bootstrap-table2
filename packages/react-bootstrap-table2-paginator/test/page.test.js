import Store from 'react-bootstrap-table2/src/store';
import { getByCurrPage } from '../src/page';

describe('Page Functions', () => {
  let data;
  let store;

  describe('getByCurrPage', () => {
    beforeEach(() => {
      data = [];
      for (let i = 0; i < 100; i += 1) {
        data.push({ id: i, name: `test_name${i}` });
      }
      store = new Store('id');
      store.data = data;
    });

    it('should always return correct data', () => {
      [
        // [page, sizePerPage, pageStartIndex]
        [1, 10, 1],
        [1, 25, 1],
        [1, 30, 1],
        [3, 30, 1],
        [4, 30, 1],
        [10, 10, 1],
        [0, 10, 0],
        [1, 10, 0],
        [9, 10, 0]
      ].forEach(([page, sizePerPage, pageStartIndex]) => {
        const rows = getByCurrPage(store)(page, sizePerPage, pageStartIndex);
        expect(rows).toBeDefined();
        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.every(row => !!row)).toBeTruthy();
      });
    });
  });
});
