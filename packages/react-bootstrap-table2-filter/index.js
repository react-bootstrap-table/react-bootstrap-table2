import TextFilter from './src/components/text';
import wrapperFactory from './src/wrapper';
import * as Comparison from './src/comparison';

export default (options = {}) => ({
  wrapperFactory,
  options
});

export const Comparator = Comparison;

export const textFilter = (props = {}) => ({
  Filter: TextFilter,
  props
});
