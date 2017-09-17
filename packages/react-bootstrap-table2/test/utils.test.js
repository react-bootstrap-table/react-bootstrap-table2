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

  describe('set', () => {
    const newValue = 'test';
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

    it('should set data successfully', () => {
      _.set(data, 'name', newValue);
      _.set(data, 'address.road', newValue);
      _.set(data, 'address.city.name', newValue);
      expect(data.name).toEqual(newValue);
      expect(data.address.road).toEqual(newValue);
      expect(data.address.city.name).toEqual(newValue);
    });

    it('should throw error if target not existing', () => {
      expect(() => {
        _.set(data, 'address.not.existing', newValue);
      }).toThrow();
    });

    it('should not throw error if target not existing but with safe=true', () => {
      expect(() => {
        _.set(data, 'address.not.existing', newValue, true);
      }).not.toThrow();
      expect(data.address.not.existing).toEqual({});
    });
  });

  describe('isObject', () => {
    describe('when given Object', () => {
      it('should return true', () => {
        expect(_.isObject({})).toBe(true);
      });
    });

    describe('when given Function', () => {
      it('should return false', () => {
        expect(_.isObject(() => 'test')).toBe(false);
      });
    });

    describe('when given Array', () => {
      it('should return false', () => {
        expect(_.isObject([])).toBe(false);
      });
    });

    describe('when given null', () => {
      it('should return false', () => {
        expect(_.isObject(null)).toBe(false);
      });
    });
  });

  describe('isEmptyObject', () => {
    describe('when given empty Object', () => {
      it('should return true', () => {
        expect(_.isEmptyObject({})).toBe(true);
      });
    });

    describe('when given non-empty Object', () => {
      it('should return false', () => {
        expect(_.isEmptyObject({ foo: 'test' })).toBe(false);
      });
    });

    describe('when given Function', () => {
      it('should return false', () => {
        expect(_.isEmptyObject(() => 'test')).toBe(false);
      });
    });

    describe('when given Array', () => {
      it('should return false', () => {
        expect(_.isEmptyObject([])).toBe(false);
      });
    });

    describe('when given null', () => {
      it('should return false', () => {
        expect(_.isEmptyObject(null)).toBe(false);
      });
    });
  });
});
