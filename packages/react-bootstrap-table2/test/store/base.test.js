import Base from '../../src/store/base';
import Const from '../../src/const';
import _ from '../../src/utils';

describe('Store Base', () => {
  let store;
  let data;

  beforeEach(() => {
    data = [
      { id: 3, name: 'name2' },
      { id: 2, name: 'ABC' },
      { id: 4, name: '123tester' },
      { id: 1, name: '!@#' }
    ];
    store = new Base({ data, keyField: 'id' });
  });

  describe('initialize', () => {
    it('should have correct initialize data', () => {
      expect(store.sortOrder).toBeUndefined();
      expect(store.sortField).toBeUndefined();
      expect(store.data.length).toEqual(data.length);
    });
  });

  describe('isEmpty', () => {
    beforeEach(() => {
      store = new Base({ data: [] });
    });

    it('should have correct initialize data', () => {
      expect(store.isEmpty()).toBeTruthy();
    });
  });

  describe('sortBy', () => {
    let dataField;

    beforeEach(() => {
      dataField = 'name';
    });

    it('should change sortField by dataField param', () => {
      store.sortBy({ dataField });
      expect(store.sortField).toEqual(dataField);
    });

    it('should change sortOrder correctly when sortBy same dataField', () => {
      store.sortBy({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
      store.sortBy({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_ASC);
    });

    it('should change sortOrder correctly when sortBy different dataField', () => {
      store.sortBy({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);

      dataField = 'id';
      store.sortBy({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);

      dataField = 'name';
      store.sortBy({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
    });

    it('should have correct result after sortBy', () => {
      store.sortBy({ dataField });
      const result = store.data.map(e => e[dataField]).sort((a, b) => b - a);
      store.get().forEach((e, i) => {
        expect(e[dataField]).toEqual(result[i]);
      });
    });
  });

  describe('getRowByRowId', () => {
    it('should return data if specified id existing', () => {
      const result = store.getRowByRowId(3);
      expect(result).toBeDefined();
    });

    it('should return undefined if specified id existing', () => {
      const result = store.getRowByRowId(88);
      expect(result).toBeUndefined();
    });
  });

  describe('getSelectedRows', () => {
    const selected = [1, 4];
    beforeEach(() => {
      store.setSelectedRowKeys(selected);
    });

    it('should return all selected rows by store.selected', () => {
      const result = store.getSelectedRows();
      expect(result).toBeDefined();
      expect(result.length).toEqual(2);
      result.forEach((r) => {
        expect(r).toBeDefined();
        expect(selected.includes(r[store.keyField])).toBeTruthy();
      });
    });
  });

  describe('setSelectedRowKeys', () => {
    const selected = [1, 4];
    it('should set store.selected correctly', () => {
      store.setSelectedRowKeys(selected);
      expect(store.getSelectedRowKeys()).toEqual(selected);
    });
  });

  describe('edit', () => {
    it('should update a specified field correctly', () => {
      const newValue = 'newValue';
      const dataField = 'name';
      const rowId = 2;
      store.edit(rowId, dataField, newValue);

      const row = store.data.find(d => d[store.keyField] === rowId);
      expect(row[dataField]).toEqual(newValue);
    });

    it('should not throw any error even if rowId is not existing', () => {
      expect(() => {
        store.edit('123', 'name', 'value');
      }).not.toThrow();
    });

    it('should throwing error if dataField is not existing', () => {
      expect(() => {
        store.edit(2, 'non_exist_field', 'value');
      }).toThrow();
    });
  });

  describe('selectAllRows', () => {
    it('should return all row keys', () => {
      const rowKeys = store.selectAllRows();

      expect(Array.isArray(rowKeys)).toBeTruthy();
      expect(rowKeys).toEqual(data.map(x => x[store.keyField]));
    });

    it('should return correct row keys when nonSelectableRows args is not empty', () => {
      const nonSelectableRows = [1, 3];
      const rowKeys = store.selectAllRows(nonSelectableRows);

      expect(Array.isArray(rowKeys)).toBeTruthy();
      expect(rowKeys).toEqual(
        data
          .filter(x => !nonSelectableRows.includes(_.get(x, store.keyField)))
          .map(x => x[store.keyField])
      );
    });
  });

  describe('isAllRowsSelected', () => {
    it('should return true when all rows is selected', () => {
      store.selected = data.map(row => _.get(row, store.keyField));

      expect(store.isAllRowsSelected()).toBeTruthy();
    });

    it('should return false when not all of rows is selected', () => {
      store.selected = [1];

      expect(store.isAllRowsSelected()).toBeFalsy();
    });
  });

  describe('isAnySelectedRow', () => {
    describe('if store.selected not empty', () => {
      it('should return true', () => {
        store.selected = data.map(row => _.get(row, store.keyField));
        expect(store.isAnySelectedRow()).toBeTruthy();
      });

      describe('when nonSelectableRows given and not all of nonselectable rows are match current store.selected', () => {
        const nonSelectableRows = [1, 3];
        beforeEach(() => {
          store.selected = [1, 4];
        });

        it('should return true', () => {
          expect(store.isAnySelectedRow(nonSelectableRows)).toBeTruthy();
        });
      });

      describe('when nonSelectableRows given and all of nonselectable rows are match current store.selected', () => {
        const nonSelectableRows = [1, 3];
        beforeEach(() => {
          store.selected = nonSelectableRows;
        });

        it('should return false', () => {
          expect(store.isAnySelectedRow(nonSelectableRows)).toBeFalsy();
        });
      });
    });

    it('should return false if store.selected is empty', () => {
      store.selected = [];

      expect(store.isAnySelectedRow()).not.toBeTruthy();
    });
  });
});
