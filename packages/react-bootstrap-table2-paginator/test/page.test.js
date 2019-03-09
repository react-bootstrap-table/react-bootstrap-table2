
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
    let newDataSize;
    let prevDataSize;
    let currPage;
    let pageStartIndex;
    let sizePerPage;

    describe('if prevDataSize < newDataSize', () => {
      beforeEach(() => {
        newDataSize = 10;
        prevDataSize = 6;
        currPage = 2;
        pageStartIndex = 1;
        sizePerPage = 5;
      });
      it('should return same page', () => {
        expect(alignPage(
          newDataSize,
          prevDataSize,
          currPage,
          sizePerPage,
          pageStartIndex
        )).toEqual(currPage);
      });
    });

    describe('if currPage < newDataSize', () => {
      beforeEach(() => {
        newDataSize = 10;
        prevDataSize = 12;
        currPage = 0;
        pageStartIndex = 1;
        sizePerPage = 5;
      });

      it('should return correct page', () => {
        expect(alignPage(
          newDataSize,
          prevDataSize,
          currPage,
          sizePerPage,
          pageStartIndex
        )).toEqual(pageStartIndex);
      });
    });

    describe('if partStartIndex is default 1', () => {
      describe('and currPage is bigger than newest last page', () => {
        beforeEach(() => {
          newDataSize = 9;
          prevDataSize = 12;
          currPage = 3;
          pageStartIndex = 1;
          sizePerPage = 5;
        });

        it('should return correct page', () => {
          expect(alignPage(
            newDataSize,
            prevDataSize,
            currPage,
            sizePerPage,
            pageStartIndex
          )).toEqual(2);
        });
      });

      describe('and currPage is short than newest last page', () => {
        beforeEach(() => {
          newDataSize = 11;
          prevDataSize = 12;
          currPage = 3;
          pageStartIndex = 1;
          sizePerPage = 5;
        });

        it('should return correct page', () => {
          expect(alignPage(
            newDataSize,
            prevDataSize,
            currPage,
            sizePerPage,
            pageStartIndex
          )).toEqual(currPage);
        });
      });
    });

    describe('if partStartIndex is default 0', () => {
      describe('and currPage is bigger than newest last page', () => {
        beforeEach(() => {
          newDataSize = 8;
          prevDataSize = 11;
          currPage = 2;
          pageStartIndex = 0;
          sizePerPage = 5;
        });

        it('should return correct page', () => {
          expect(alignPage(
            newDataSize,
            prevDataSize,
            currPage,
            sizePerPage,
            pageStartIndex
          )).toEqual(1);
        });
      });

      describe('and currPage is short than newest last page', () => {
        beforeEach(() => {
          newDataSize = 11;
          prevDataSize = 12;
          currPage = 2;
          pageStartIndex = 0;
          sizePerPage = 5;
        });

        it('should return correct page', () => {
          expect(alignPage(
            newDataSize,
            prevDataSize,
            currPage,
            sizePerPage,
            pageStartIndex
          )).toEqual(currPage);
        });
      });
    });
  });
});
