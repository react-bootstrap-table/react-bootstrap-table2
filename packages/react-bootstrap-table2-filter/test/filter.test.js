import sinon from 'sinon';
import _ from 'react-bootstrap-table-next/src/utils';
import Store from 'react-bootstrap-table-next/src/store';

import { filters } from '../src/filter';
import { FILTER_TYPE } from '../src/const';
import { LIKE, EQ, GT, GE, LT, LE, NE } from '../src/comparison';

const data = [];
for (let i = 0; i < 20; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`,
    price: 200 + i
  });
}

describe('filter', () => {
  let store;
  let filterFn;
  let currFilters;
  let columns;

  beforeEach(() => {
    store = new Store('id');
    store.data = data;
    currFilters = {};
    columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'price',
      text: 'Price'
    }];
  });

  describe('filterByText', () => {
    beforeEach(() => {
      filterFn = filters(store, columns, _);
    });

    describe(`when default comparator is ${LIKE}`, () => {
      it('should returning correct result', () => {
        currFilters.name = {
          filterVal: '3',
          filterType: FILTER_TYPE.TEXT
        };

        const result = filterFn(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
      });
    });

    describe('when caseSensitive is true', () => {
      it('should returning correct result', () => {
        currFilters.name = {
          filterVal: 'NAME',
          caseSensitive: true,
          filterType: FILTER_TYPE.TEXT
        };

        const result = filterFn(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(0);
      });
    });

    describe(`when default comparator is ${EQ}`, () => {
      it('should returning correct result', () => {
        currFilters.name = {
          filterVal: 'itme name 3',
          filterType: FILTER_TYPE.TEXT,
          comparator: EQ
        };

        const result = filterFn(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(1);
      });
    });

    describe('column.filterValue is defined', () => {
      beforeEach(() => {
        columns[1].filterValue = sinon.stub();
        filterFn = filters(store, columns, _);
      });

      it('should calling custom filterValue callback correctly', () => {
        currFilters.name = {
          filterVal: '3',
          filterType: FILTER_TYPE.TEXT
        };

        const result = filterFn(currFilters);
        expect(result).toBeDefined();
        expect(columns[1].filterValue.callCount).toBe(data.length);
        const calls = columns[1].filterValue.getCalls();
        calls.forEach((call, i) => {
          expect(call.calledWith(data[i].name, data[i])).toBeTruthy();
        });
      });
    });
  });

  describe('filterByNumber', () => {
    beforeEach(() => {
      filterFn = filters(store, columns, _);
    });

    describe('when currFilters.filterVal.comparator is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: '', number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        let result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);

        currFilters.price.filterVal.comparator = undefined;
        result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    describe('when currFilters.filterVal.number is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: EQ, number: '' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${EQ}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: EQ, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        let result = filterFn(currFilters);
        expect(result).toHaveLength(1);

        currFilters.price.filterVal.number = '0';
        result = filterFn(currFilters);
        expect(result).toHaveLength(0);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${GT}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: GT, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(16);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${GE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: GE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(17);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${LT}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: LT, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(3);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${LE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: LE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(4);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${NE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: NE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(19);
      });
    });
  });
});
