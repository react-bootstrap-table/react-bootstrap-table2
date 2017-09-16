import sinon from 'sinon';

import { sort } from '../../src/store/sort';
import Const from '../../src/const';

describe('Sort Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];

  it('should sort array with ASC order correctly', () => {
    const result = sort('id', data, Const.SORT_ASC);
    expect(result.length).toEqual(data.length);

    const sortedArray = data.map(e => e.id).sort((a, b) => a - b);
    sortedArray.forEach((e, i) => {
      expect(e).toEqual(result[i].id);
    });
  });

  it('should sort array with DESC order correctly', () => {
    const result = sort('id', data, Const.SORT_DESC);
    expect(result.length).toEqual(data.length);

    const sortedArray = data.map(e => e.id).sort((a, b) => b - a);
    sortedArray.forEach((e, i) => {
      expect(e).toEqual(result[i].id);
    });
  });

  it('should call custom sort function when sortFunc given', () => {
    const sortFunc = sinon.stub().returns(1);
    sort('id', data, Const.SORT_DESC, sortFunc);
    expect(sortFunc.callCount).toBe(6);
  });
});
