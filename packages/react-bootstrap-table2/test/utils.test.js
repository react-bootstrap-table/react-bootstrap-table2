import _ from '../src/utils';

describe('Utils', () => {
  describe('get', () => {
    const data = {
      name: 'A',
      address: {
        road: 'BCD',
        postal: '1234-12345',
        city: {
          name: 'B'
        }
      }
    };

    it('should return correct data', () => {
      expect(_.get(data, 'name')).toEqual(data.name);
      expect(_.get(data, 'address.road')).toEqual(data.address.road);
      expect(_.get(data, 'address.city.name')).toEqual(data.address.city.name);
      expect(_.get(data, 'address.notExist')).toEqual(undefined);
      expect(_.get(data, 'address.not.exist')).toEqual(undefined);
    });
  });
});
