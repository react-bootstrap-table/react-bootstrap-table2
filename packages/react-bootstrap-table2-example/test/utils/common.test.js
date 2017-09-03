import { productsGenerator } from '../../src/utils/common';

describe('Utils', () => {
  describe('productsGenerator', () => {
    const quantity = 2;

    it('should return an array', () => {
      expect(Array.isArray(productsGenerator())).toBe(true);
    });

    it('should return 5 products without params', () => {
      expect(productsGenerator().length).toEqual(5);
    });

    it('should return an array with given quntity', () => {
      expect(productsGenerator(quantity).length).toEqual(quantity);
    });

    describe('when callback is defined', () => {
      const callback = (value, index) => ({
        id: index,
        name: 'react-bootstrap-table-2'
      });

      it('should return customized products format', () => {
        const products = productsGenerator(quantity, callback);
        const product = products[0];

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBe(quantity);
        expect(product).toHaveProperty('id', 0);
        expect(product).toHaveProperty('name', 'react-bootstrap-table-2');
      });
    });
  });
});
