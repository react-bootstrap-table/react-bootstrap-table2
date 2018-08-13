
import { getByCurrPage, alignPage } from '../src/page';

describe('Page Functions', () => {
  let data;
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
    });

    it('should always return correct data', () => {
      params.forEach(([page, sizePerPage, pageStartIndex]) => {
        const rows = getByCurrPage(data, page, sizePerPage, pageStartIndex);
        expect(rows).toBeDefined();
        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.every(row => !!row)).toBeTruthy();
      });
    });

    it('should return empty array when data is empty', () => {
      data = [];
      params.forEach(([page, sizePerPage, pageStartIndex]) => {
        const rows = getByCurrPage(data, page, sizePerPage, pageStartIndex);
        expect(rows).toHaveLength(0);
      });
    });
  });

  describe('alignPage', () => {
    const pageStartIndex = 1;
    const sizePerPage = 10;
    const page = 2;
    describe('if the length of store.data is less than the end page index', () => {
      beforeEach(() => {
        data = [];
        for (let i = 0; i < 15; i += 1) {
          data.push({ id: i, name: `test_name${i}` });
        }
      });

      it('should return pageStartIndex argument', () => {
        expect(alignPage(data, page, sizePerPage, pageStartIndex)).toEqual(pageStartIndex);
      });
    });

    describe('if the length of store.data is large than the end page index', () => {
      beforeEach(() => {
        data = [];
        for (let i = 0; i < 30; i += 1) {
          data.push({ id: i, name: `test_name${i}` });
        }
      });

      it('should return current page', () => {
        expect(alignPage(data, page, sizePerPage, pageStartIndex)).toEqual(page);
      });
    });
  });
});
