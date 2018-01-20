import Store from 'react-bootstrap-table-next/src/store';
import { getByCurrPage } from '../src/page';

describe('Page Functions', () => {
  let data;
  let store;
  const params = [
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
  ];

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
      params.forEach(([page, sizePerPage, pageStartIndex]) => {
        store.page = page;
        store.sizePerPage = sizePerPage;
        const rows = getByCurrPage(store, pageStartIndex);
        expect(rows).toBeDefined();
        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.every(row => !!row)).toBeTruthy();
      });
    });

    it('should return empty array when store.data is empty', () => {
      store.data = [];
      params.forEach(([page, sizePerPage, pageStartIndex]) => {
        store.page = page;
        store.sizePerPage = sizePerPage;
        const rows = getByCurrPage(store, pageStartIndex);
        expect(rows).toHaveLength(0);
      });
    });
  });
});
