import { editCell } from '../../src/store/mutate';

describe('Mutate Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];

  const keyField = 'id';

  describe('editCell', () => {
    let rowId;
    const editField = 'name';
    const newValue = 'tester';

    it('should edit successfully if row is existing', () => {
      rowId = data[0][keyField];

      editCell(data, keyField, rowId, editField, newValue);
      expect(data[0][editField]).toEqual(newValue);
    });

    it('should not mutate cell if row is not existing', () => {
      rowId = 100;

      editCell(data, keyField, rowId, editField, newValue);
      expect(data).toEqual(data);
    });
  });
});
