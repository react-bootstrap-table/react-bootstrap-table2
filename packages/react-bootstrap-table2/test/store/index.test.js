import Store from '../../src/store';
import Const from '../../src/const';

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
    store = new Store('id');
    store.data = data;
  });

  describe('initialize', () => {
    it('should have correct initialize data', () => {
      expect(store.sortOrder).toBeUndefined();
      expect(store.sortField).toBeUndefined();
      expect(store.data.length).toEqual(data.length);
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
      store.data.forEach((e, i) => {
        expect(e[dataField]).toEqual(result[i]);
      });
    });

    it('should force assign sortOrder correctly if second argument is passed', () => {
      store.sortBy({ dataField }, Const.SORT_DESC);
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
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
});
