import { getRowByRowId, matchRow } from '../../src/store/rows';

describe('Rows Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';

  describe('getRowByRowId', () => {
    it('should returning correct row', () => {
      expect(getRowByRowId(data, keyField, 2)).toEqual(data[1]);
    });

    it('should returning undefined if not existing', () => {
      expect(getRowByRowId(data, keyField, 20)).not.toBeDefined();
    });
  });

  describe('matchRow', () => {
    it('should return true if keyField and id is match', () => {
      const row = data[0];
      const fn = matchRow(keyField, row[keyField]);
      expect(fn(row)).toBeTruthy();
    });

    it('should return false if keyField and id is not match', () => {
      const row = data[0];
      const fn = matchRow(keyField, 0);
      expect(fn(row)).toBeFalsy();
    });
  });
});
