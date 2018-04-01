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

  describe('setSort', () => {
    let dataField;

    beforeEach(() => {
      dataField = 'name';
    });

    it('should change sortField by dataField param', () => {
      store.setSort({ dataField });
      expect(store.sortField).toEqual(dataField);
    });

    it('should change sortOrder correctly when sortBy same dataField', () => {
      store.setSort({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
      store.setSort({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_ASC);
    });

    it('should change sortOrder correctly when sortBy different dataField', () => {
      store.setSort({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);

      dataField = 'id';
      store.setSort({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);

      dataField = 'name';
      store.setSort({ dataField });
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
    });

    it('should force assign sortOrder correctly if second argument is given', () => {
      store.setSort({ dataField }, Const.SORT_DESC);
      expect(store.sortOrder).toEqual(Const.SORT_DESC);
    });

    it('should force assign sortOrder correctly if third argument is given', () => {
      store.setSort({ dataField }, undefined, Const.SORT_ASC);
      expect(store.sortOrder).toEqual(Const.SORT_ASC);
    });
  });

  describe('sortBy', () => {
    let dataField;

    beforeEach(() => {
      dataField = 'name';
    });

    it('should have correct result after sortBy', () => {
      store.sortBy({ dataField });
      const result = store.data.map(e => e[dataField]).sort((a, b) => b - a);
      store.data.forEach((e, i) => {
        expect(e[dataField]).toEqual(result[i]);
      });
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
