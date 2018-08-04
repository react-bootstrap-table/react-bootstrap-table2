import {
  selectableKeys,
  unSelectableKeys,
  getSelectedRows,
  getSelectionSummary
} from '../../src/store/selection';

describe('Selection Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';
  let skip;

  describe('selectableKeys', () => {
    it('should returning all row keys if skip is empty', () => {
      expect(selectableKeys(data, keyField)).toEqual(data.map(d => d[keyField]));
    });

    it('should returngin row keys expect the skip', () => {
      skip = [data[1][keyField]];
      expect(selectableKeys(data, keyField, skip)).toHaveLength(data.length - skip.length);
    });
  });

  describe('unSelectableKeys', () => {
    it('should returning empty array if skip is empty', () => {
      expect(unSelectableKeys()).toHaveLength(0);
    });

    it('should returning array which must contain skip', () => {
      skip = [data[1][keyField]];
      const selected = data.map(d => d[keyField]);
      expect(unSelectableKeys(selected, skip)).toHaveLength(skip.length);
    });
  });

  describe('getSelectedRows', () => {
    it('should returning rows object correctly', () => {
      const selected = data.map(d => d[keyField]);
      const result = getSelectedRows(data, keyField, selected);
      expect(result).toHaveLength(selected.length);
      expect(result).toEqual(data);
    });
  });

  describe('getSelectionSummary', () => {
    let result;

    describe('if selected argument is able to cover all the data argument', () => {
      it('should return an obj which allRowsSelected is true and allRowsNotSelected is false', () => {
        const selected = data.map(d => d[keyField]);
        result = getSelectionSummary(data, keyField, selected);
        expect(result).toEqual({
          allRowsSelected: true,
          allRowsNotSelected: false
        });
      });
    });

    describe('if selected argument empty', () => {
      it('should return an obj which allRowsSelected is false but allRowsNotSelected is true', () => {
        result = getSelectionSummary(data, keyField);
        expect(result).toEqual({
          allRowsSelected: false,
          allRowsNotSelected: true
        });
      });
    });

    describe('if selected argument is only cover partial data', () => {
      it('should return an obj which allRowsSelected and allRowsNotSelected both are false', () => {
        const selected = [1, 2];
        result = getSelectionSummary(data, keyField, selected);
        expect(result).toEqual({
          allRowsSelected: false,
          allRowsNotSelected: false
        });
      });
    });
  });
});
