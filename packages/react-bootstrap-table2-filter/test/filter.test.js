import _ from 'react-bootstrap-table2/src/utils';
import Store from 'react-bootstrap-table2/src/store';

import { filters } from '../src/filter';
import { FILTER_TYPE } from '../src/const';
import { LIKE, EQ } from '../src/comparison';

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

  beforeEach(() => {
    store = new Store('id');
    store.data = data;
    currFilters = {};
  });

  describe('text filter', () => {
    beforeEach(() => {
      filterFn = filters(store, _);
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
  });
});
