import TextFilter from './components/text';
import wrapperFactory from './wrapper';
import * as Comparison from './comparison';

export default (options = {}) => ({
  wrapperFactory,
  options
});

export const Comparator = Comparison;

export const textFilter = (props = {}) => ({
  Filter: TextFilter,
  props
});
