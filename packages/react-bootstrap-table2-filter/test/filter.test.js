import _ from 'react-bootstrap-table-next/src/utils';

import { filters } from '../src/filter';
import { FILTER_TYPE } from '../src/const';
import { LIKE, EQ, GT, GE, LT, LE, NE } from '../src/comparison';

const data = [];
for (let i = 0; i < 20; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`,
    price: 200 + i,
    date: new Date(2017, i, 1)
  });
}

describe('filter', () => {
  let currFilters;
  let columns;

  beforeEach(() => {
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
    }, {
      dataField: 'date',
      text: 'Date'
    }];
  });

  describe('filterByText', () => {
    describe('when filter value is not a String', () => {
      it('should transform to string and do the filter', () => {
        currFilters.name = {
          filterVal: 3,
          filterType: FILTER_TYPE.TEXT
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
      });
    });

    describe(`when default comparator is ${LIKE}`, () => {
      it('should returning correct result', () => {
        currFilters.name = {
          filterVal: '3',
          filterType: FILTER_TYPE.TEXT
        };

        const result = filters(data, columns, _)(currFilters);
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

        const result = filters(data, columns, _)(currFilters);
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

        const result = filters(data, columns, _)(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(1);
      });
    });

    describe('column.filterValue is defined', () => {
      beforeEach(() => {
        columns[1].filterValue = jest.fn();
      });

      it('should calling custom filterValue callback correctly', () => {
        currFilters.name = {
          filterVal: '3',
          filterType: FILTER_TYPE.TEXT
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toBeDefined();
        expect(columns[1].filterValue).toHaveBeenCalledTimes(data.length);
        // const calls = columns[1].filterValue.mock.calls;
        // calls.forEach((call, i) => {
        //   expect(call).toEqual([data[i].name, data[i]]);
        //   expect(call.calledWith(data[i].name, data[i])).toBeTruthy();
        // });
      });
    });
  });

  describe('filterByArray', () => {
    describe('when filter value is empty array', () => {
      it('should return original data', () => {
        currFilters.name = {
          filterVal: [],
          filterType: FILTER_TYPE.MULTISELECT
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toBeDefined();
        expect(result).toHaveLength(data.length);
      });
    });

    describe('when filter value is not an empty array', () => {
      describe(`and comparator is ${EQ}`, () => {
        it('should return data correctly', () => {
          currFilters.price = {
            filterVal: [201, 203],
            filterType: FILTER_TYPE.MULTISELECT,
            comparator: EQ
          };

          const result = filters(data, columns, _)(currFilters);
          expect(result).toBeDefined();
          expect(result).toHaveLength(2);
        });
      });

      describe(`and comparator is ${LIKE}`, () => {
        it('should return data correctly', () => {
          currFilters.name = {
            filterVal: ['name 3', '5'],
            filterType: FILTER_TYPE.MULTISELECT,
            comparator: LIKE
          };

          const result = filters(data, columns, _)(currFilters);
          expect(result).toBeDefined();
          expect(result).toHaveLength(3);
        });
      });
    });
  });

  describe('filterByNumber', () => {
    describe('when currFilters.filterVal.comparator is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: '', number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        let result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(data.length);

        currFilters.price.filterVal.comparator = undefined;
        result = filters(result, columns, _)(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    describe('when currFilters.filterVal.number is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: EQ, number: '' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${EQ}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: EQ, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        let result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(1);

        currFilters.price.filterVal.number = '0';
        result = filters(result, columns, _)(currFilters);
        expect(result).toHaveLength(0);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${GT}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: GT, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(16);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${GE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: GE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(17);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${LT}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: LT, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(3);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${LE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: LE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(4);
      });
    });

    describe(`when currFilters.filterVal.comparator is ${NE}`, () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: NE, number: '203' },
          filterType: FILTER_TYPE.NUMBER
        };

        const result = filters(data, columns, _)(currFilters);
        expect(result).toHaveLength(19);
      });
    });
  });

  describe('filterByDate', () => {
    let filterFn;
    beforeEach(() => {
      filterFn = filters(data, columns, _);
    });

    describe('when currFilters.filterVal.comparator is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: '', date: new Date() },
          filterType: FILTER_TYPE.DATE
        };

        let result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);

        currFilters.price.filterVal.comparator = undefined;
        result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    describe('when currFilters.filterVal.date is empty', () => {
      it('should returning correct result', () => {
        currFilters.price = {
          filterVal: { comparator: EQ, date: '' },
          filterType: FILTER_TYPE.DATE
        };

        const result = filterFn(currFilters);
        expect(result).toHaveLength(data.length);
      });
    });

    // TODO....
  });
});
