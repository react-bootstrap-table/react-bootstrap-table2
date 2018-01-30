import TextFilter from './src/components/text';
import SelectFilter from './src/components/select';
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

export const selectFilter = (props = {}) => ({
  Filter: SelectFilter,
  props
});
